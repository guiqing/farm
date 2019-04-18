var a = new getApp;
Page({
    data: {
        state: !1,
        Bacon: !1,
        Sausage: !1,
        goodsData: [],
        specItem: [],
        aboutData: [],
        total_price: 0,
        copyTotalPrice: 0,
        count: 0,
        address: "",
        userName: "",
        phone: "",
        is_add: 0,
        add_total_price: 0,
        goods_id: "",
        spec_id: "",
        couponCount: 0,
        userCoupon: [],
        farmSetData: []
    },
    onLoad: function (t) {
        var e = this,
            o = t.goods_id;
        if (t.spec_id) var s = t.spec_id;
        else s = 0;
        var i = a.siteInfo.uniacid,
            d = t.count,
            n = wx.getStorageSync("kejia_farm_uid");
        a.api.ajax(
            "farm/api/getSureGoodsData",
            {
                // op: "getSureGoodsData",
                goods_id: o,
                spec_id: s,
                uniacid: i,
                count: d,
                uid: n
            },
            function (a) {
                e.setData({
                    goodsData: a.data.goodsData,
                    specItem: a.data.specItem,
                    aboutData: a.data.aboutData,
                    total_price: a.data.total_price,
                    copyTotalPrice: a.data.total_price,
                    count: d,
                    specVal: a.data.specVal,
                    goods_id: o,
                    spec_id: s,
                    couponCount: a.data.couponCount
                })
            }
        ), a.util.setNavColor(i), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    chooseAddress: function (a) {
        var t = this;
        wx.chooseAddress({
            success: function (a) {
                t.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    phone: a.telNumber
                })
            },
            fail: function (a) {
                wx.showModal({
                    title: "提示",
                    content: "您上次拒绝了授权收获地址",
                    confirmText: "前去授权",
                    success: function (a) {
                        a.confirm ? wx.reLaunch({
                            url: "../../../user/center/index?is_tarbar=true"
                        }) : a.cancel && console.log("用户点击取消")
                    }
                })
            }
        })
    },
    machining: function () {
        var a = this;
        if (a.data.state) this.setData({
            state: !this.data.state,
            add_total_price: 0,
            is_add: 0
        });
        else {
            var t = a.data.copyTotalPrice,
                e = a.data.goodsData,
                o = a.data.aboutData,
                s = t - e.send_price,
                i = s * (o.add_price / 100);
            if ("" != this.data.userCoupon) d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s) - this.data.userCoupon.coupon.coupon_price;
            else var d = parseFloat(i) + parseFloat(e.send_price) + parseFloat(s);
            this.setData({
                state: !this.data.state,
                add_total_price: d
            })
        }
    },
    Bacon: function () {
        this.setData({
            is_add: 1
        })
    },
    Sausage: function () {
        this.setData({
            is_add: 2
        })
    },
    formSubmit: function (t) {
        var e = this,
            o = wx.getStorageSync("kejia_farm_uid"),
            s = a.siteInfo.uniacid,
            i = t.detail.value.remark,
            d = e.data.address,
            n = e.data.userName,
            c = e.data.phone,
            r = e.data.state,
            u = e.data.is_add,
            p = e.data.goods_id,
            l = e.data.spec_id,
            _ = e.data.count,
            g = e.data.userCoupon,
            f = 0,
            h = 0;
        if ("" != g && (console.log(g), f = g.coupon.id, h = g.coupon.coupon_price), "" == d || "" == n || "" == c) wx.showToast({
            title: "请选择地址"
        });
        else {
            var m = {
                // op: "addGroupOrder",
                uid: o,
                uniacid: s,
                address: d,
                phone: c,
                name: n,
                is_add: u,
                statu: r,
                goods_id: p,
                spec_id: l,
                count: _,
                remark: i,
                coupon_id: f,
                coupon_price: h
            };
            a.api.ajax(
                "farm/api/addGroupOrder",
                m,
                function (t) {
                    var e = t.data.order_id;
                    if(e){
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1,
                            success: function () {
                                wx.redirectTo({
                                    url: "../orderList/index"
                                })
                            }
                        }) 
                    }
                    return ;
                    a.util.request({
                        url: "entry/wxapp/pay",
                        data: {
                            op: "getGroupPayOrder",
                            orderid: e,
                            uniacid: s,
                            file: "group"
                        },
                        cachetime: "0",
                        success: function (t) {
                            if (t.data && t.data.data && !t.data.errno) {
                                var o = t.data.data.package;
                                wx.requestPayment({
                                    timeStamp: t.data.data.timeStamp,
                                    nonceStr: t.data.data.nonceStr,
                                    package: t.data.data.package,
                                    signType: "MD5",
                                    paySign: t.data.data.paySign,
                                    success: function (t) {
                                        a.util.request({
                                            url: "entry/wxapp/group",
                                            data: {
                                                order_id: e,
                                                op: "sendMsg",
                                                uniacid: s,
                                                prepay_id: o
                                            },
                                            success: function () {
                                                wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function () {
                                                        wx.redirectTo({
                                                            url: "../orderList/index"
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    },
                                    fail: function (a) {
                                        wx.showModal({
                                            title: "系统提示",
                                            content: "您取消了支付!",
                                            showCancel: !1,
                                            success: function (a) {
                                                a.confirm && is_jump && wx.redirectTo({
                                                    url: "../orderList/index"
                                                })
                                            }
                                        })
                                    }
                                })
                            } else console.log("fail1")
                        },
                        fail: function (a) {
                            "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
                                url: "/kejia_farm/pages/login/index"
                            }) : wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function (a) {
                                    a.confirm
                                }
                            })
                        }
                    })
                }
            )
        }
    },
    selectCoupon: function (a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../../user/coupon/useCoupon/index?type=2&totalPrice=" + t
        })
    },
    onShow: function (a) {
        var t = this.data.copyTotalPrice,
            e = this.data.is_add;
        if (wx.getStorageSync("user_coupon")) {
            var o = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), 1 == e ? this.setData({
                userCoupon: o,
                add_total_price: parseFloat(this.data.add_total_price - o.coupon.coupon_price).toFixed(2)
            }) : this.setData({
                userCoupon: o,
                total_price: parseFloat(t - o.coupon.coupon_price).toFixed(2)
            })
        } else this.setData({
            userCoupon: [],
            total_price: t
        })
    }
});