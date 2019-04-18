var e = new getApp,
    a = e.siteInfo.uniacid;
Page({
    data: {
        address: "",
        name: "",
        phone: "",
        seedData: [],
        farmSetData: [],
        selectBag: [],
        types: 0,
        recovery_method: 1
    },
    onLoad: function (t) {
        var n = this;
        e.util.setNavColor(a);
        var s = 0;
        t.types && (s = t.types);
        var o = wx.getStorageSync("kejia_farm_setData"),
            i = 1;
        2 == o.recovery_method && (i = 2), n.setData({
            farmSetData: o,
            selectBag: JSON.parse(t.selectBag),
            types: s,
            recovery_method: i
        })
    },
    selAddress: function (e) {
        var a = this;
        wx.chooseAddress({
            success: function (e) {
                a.setData({
                    address: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    name: e.userName,
                    phone: e.telNumber
                })
            }
        })
    },
    radioChange: function (e) {
        this.setData({
            recovery_method: e.detail.value
        })
    },
    changeRecoveryMethod: function (e) {
        var a = e.currentTarget.dataset.state,
            t = this.data,
            n = t.totalPrice,
            s = t.send_price,
            o = t.copyTotalPrice;
        n = 2 == a ? parseFloat(n - s).toFixed(2) : o, this.setData({
            recovery_method: a,
            totalPrice: n
        })
    },
    nowPay: function (a) {
        var t = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            s = e.siteInfo.uniacid,
            o = t.data,
            i = o.name,
            r = o.address,
            d = o.phone,
            c = o.selectBag,
            l = o.recovery_method,
            u = a.detail.formId;
        if (1 == l && ("" == r || "" == i || "" == d)) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (2 != l || (i = a.detail.value.name, d = a.detail.value.phone, "" != i && "" != d)) {
            var f = {
                op: "addSeedSendOrder",
                address: r,
                name: i,
                phone: d,
                uniacid: s,
                uid: n,
                action: "land",
                selectBag: JSON.stringify(c),
                formid: u,
                recovery_method: l
            };
            e.util.request({
                url: "entry/wxapp/class",
                data: f,
                method: "POST",
                success: function (a) {
                    var n = a.data.order_id;
                    if (2 == l) return wx.redirectTo({
                        url: "/kejia_farm/pages/shop/orderList/index"
                    }), !1;
                    e.util.request({
                        url: "entry/wxapp/SeedSendPay",
                        data: {
                            orderid: n,
                            uniacid: s
                        },
                        cachetime: "0",
                        success: function (a) {
                            if (a.data && a.data.data && !a.data.errno) {
                                var o = a.data.data.package;
                                wx.requestPayment({
                                    timeStamp: a.data.data.timeStamp,
                                    nonceStr: a.data.data.nonceStr,
                                    package: a.data.data.package,
                                    signType: "MD5",
                                    paySign: a.data.data.paySign,
                                    success: function (a) {
                                        e.util.request({
                                            url: "entry/wxapp/class",
                                            data: {
                                                op: "notifySeedSend",
                                                action: "land",
                                                order_id: n,
                                                uniacid: s,
                                                prepay_id: o,
                                                selectBag: JSON.stringify(c)
                                            },
                                            method: "POST",
                                            success: function (e) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function (e) {
                                                        1 == t.data.types ? wx.redirectTo({
                                                            url: "/kejia_game/pages/farm/index"
                                                        }) : wx.redirectTo({
                                                            url: "../seedBag/index"
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    },
                                    fail: function (e) {
                                        console.log("支付失败1")
                                    }
                                })
                            } else console.log("支付失败2")
                        },
                        fail: function (e) {
                            wx.showModal({
                                title: "系统提示",
                                content: e.data.message ? e.data.message : "错误",
                                showCancel: !1,
                                success: function (e) {
                                    e.confirm
                                }
                            })
                        }
                    })
                }
            })
        } else wx.showToast({
            title: "请填写收获信息",
            icon: "none"
        })
    },
    gotoMerchant: function () {
        var e = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(e.self_lifting_place.lat),
            longitude: parseFloat(e.self_lifting_place.lng),
            name: e.self_lifting_address
        })
    }
});