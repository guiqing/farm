var e = new getApp;
Page({
    data: {
        borderImg: "../../../images/icon/address-line.png",
        buyList: [],
        adoptData: [],
        specItem: [],
        address: "",
        phone: "",
        name: "",
        adopt_id: "",
        farmSetData: [],
        order_id: 0,
        recovery_method: 1,
        remark: ""
    },
    onLoad: function (a) {
        var t = this,
            r = a.adopt_id,
            i = e.siteInfo.uniacid,
            d = wx.getStorageSync("kejia_farm_setData"),
            o = 1;
        2 == d.recovery_method && (o = 2), t.setData({
            farmSetData: d,
            recovery_method: o
        }), e.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "getSureOrder",
                uniacid: i,
                adopt_id: r
            },
            success: function (e) {
                t.setData({
                    adoptData: e.data.adoptData,
                    adopt_id: r
                })
            }
        }), e.util.setNavColor(i)
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
    changeRecoveryMethod: function (e) {
        var a = e.currentTarget.dataset.state,
            t = this.data,
            r = t.totalPrice,
            i = t.send_price,
            d = t.copyTotalPrice;
        r = 2 == a ? parseFloat(r - i).toFixed(2) : d, this.setData({
            recovery_method: a,
            totalPrice: r
        })
    },
    getRemark: function (e) {
        this.setData({
            remark: e.detail.value
        })
    },
    nowPay: function (a) {
        var t = this,
            r = wx.getStorageSync("kejia_farm_uid"),
            i = e.siteInfo.uniacid,
            d = t.data,
            o = d.name,
            n = d.address,
            s = d.phone,
            c = d.adopt_id,
            l = d.recovery_method,
            p = d.remark,
            u = d.farmSetData;
        if (1 == l && ("" == n || "" == o || "" == s)) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        if (2 != l || (o = a.detail.value.name, s = a.detail.value.phone, "" != o && "" != s)) {
            var m = {
                    op: "addOrder",
                    address: n,
                    name: o,
                    phone: s,
                    uniacid: i,
                    adopt_id: c,
                    uid: r,
                    recovery_method: l,
                    remark: p,
                    total_price: t.data.farmSetData.animal_send_price,
                    self_address: u.self_lifting_address
                },
                _ = "entry/wxapp/animalSendPay",
                f = t.data.order_id;
            f ? 2 == l ? wx.redirectTo({
                url: "../../shop/orderList/index"
            }) : e.util.pay(f, _, "entry/wxapp/animal", "../shop/orderList/index", i, "notify_send") : e.util.request({
                url: "entry/wxapp/animal",
                data: m,
                success: function (a) {
                    var r = a.data.order_id;
                    t.setData({
                        order_id: r
                    }), 2 == l ? wx.redirectTo({
                        url: "../../shop/orderList/index"
                    }) : e.util.pay(r, _, "entry/wxapp/animal", "../shop/orderList/index", i, "notify_send")
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