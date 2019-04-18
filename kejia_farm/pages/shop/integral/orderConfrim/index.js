var a = new getApp;
Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        specItem: [],
        specVal: [],
        default: !1,
        count: "",
        totalPrice: [],
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        farmSetData: []
    },
    onLoad: function (e) {
        var t = e.goodsid;
        if (e.spec_id) d = e.spec_id;
        else var d = 0;
        e.cart_id;
        var i = e.count,
            s = (wx.getStorageSync("kejia_farm_uid"), this),
            r = a.siteInfo.uniacid;
        a.api.ajax(
            "farm/api/getSureGoods",
            {
                // op: "getSureGoods",
                uniacid: r,
                goods_id: t,
                spec_id: d,
                count: i
            },
            function (a) {
                if (a.data.specVal) e = a.data.specVal;
                else var e = [];
                s.setData({
                    specItem: a.data.specItem,
                    goodsData: a.data.goodsData,
                    count: i,
                    specVal: e,
                    totalPrice: a.data.totalPrice,
                    goods_id: t,
                    spec_id: d,
                    send_price: a.data.send_price
                })
            }
        ), a.util.setNavColor(r), s.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    chooseAddress: function (a) {
        var e = this;
        wx.chooseAddress({
            success: function (a) {
                e.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    phone: a.telNumber
                })
            }
        })
    },
    formSubmit: function (e) {
        var t = this,
            d = t.data.userName,
            i = t.data.address,
            s = t.data.phone,
            r = wx.getStorageSync("kejia_farm_uid"),
            o = a.siteInfo.uniacid,
            n = (t.data.is_buy_type, e.detail.value.remark),
            c = t.data.goods_id,
            u = t.data.count,
            p = t.data.spec_id,
            l = t.data.send_price;
        if ("" != i && "" != s && "" != d) {
            var g = {
                // op: "addOrder",
                address: i,
                name: d,
                phone: s,
                uniacid: o,
                goods_id: c,
                count: u,
                uid: r,
                remark: n,
                is_buy_type: 1,
                spec_id: p
            };
            a.api.ajax(
                "farm/api/addOrder",
                g,
                function (e) {
                    if (1 == e.data.code) {
                        var t = e.data.order_id;
                        "" == l || 0 == l ? a.api.ajax(
                            "farm/api/notify",
                            {
                                // op: "notify",
                                order_id: t,
                                uniacid: o,
                                uid: r
                            },
                            function (a) {
                                wx.showToast({
                                    title: "兑换成功",
                                    success: function (a) {
                                        wx.redirectTo({
                                            url: "../orderList/index"
                                        })
                                    }
                                })
                            }
                        ) : a.api.ajax(
                            "farm/api/getIntegralPayOrder",
                            {
                                // op: "getIntegralPayOrder",
                                orderid: t,
                                uniacid: o,
                                file: "integral"
                            },
                            // cachetime: "0",
                            function (e) {
                                if (e.data && e.data.data && !e.data.errno) {
                                    var d = e.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: e.data.data.timeStamp,
                                        nonceStr: e.data.data.nonceStr,
                                        package: e.data.data.package,
                                        signType: "MD5",
                                        paySign: e.data.data.paySign,
                                        success: function (e) {
                                            wx.showLoading({
                                                title: "加载中"
                                            }), a.api.ajax(
                                               "farm/api/sendMsg",
                                                {
                                                    // op: "sendMsg",
                                                    order_id: t,
                                                    uniacid: o,
                                                    prepay_id: d,
                                                    uid: r
                                                },
                                                function (a) {
                                                    wx.showToast({
                                                        title: "支付成功",
                                                        success: function (a) {
                                                            wx.redirectTo({
                                                                url: "../orderList/index"
                                                            })
                                                        }
                                                    }), wx.hideLoading()
                                                }
                                            )
                                        },
                                        function (a) {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            })
                                        }
                                    })
                                } else wx.redirectTo({
                                    url: "../orderList/index"
                                })
                            },
                            function (a) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: a.data.message ? a.data.message : "错误",
                                    showCancel: !1,
                                    success: function (a) {
                                        a.confirm && wx.redirectTo({
                                            url: "../orderList/index"
                                        })
                                    }
                                })
                            }
                        )
                    } else 2 == e.data.code ? wx.showToast({
                        title: "兑换失败"
                    }) : 3 == e.data.code ? wx.showToast({
                        title: "积分不足"
                    }) : 4 == e.data.code && wx.showToast({
                        title: "积分支付失败"
                    })
                }
            )
        } else wx.showToast({
            title: "请选择收货地址!"
        })
    }
});