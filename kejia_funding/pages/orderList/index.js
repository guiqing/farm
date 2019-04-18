var a = new getApp,
    t = a.siteInfo.uniacid,
    e = "kejia_farm_plugin_funding";
Page({
    data: {
        currentIndex: 1,
        confirm: !1,
        orderData: [],
        farmSetData: wx.getStorageSync("kejia_farm_setData"),
        current_cover: "",
        current_orderid: ""
    },
    onLoad: function (a) {
        this.getOrderData(1, 1, 0)
    },
    getOrderData: function (r, n, d) {
        var i = this,
            c = wx.getStorageSync("kejia_farm_uid"),
            o = a.util.url("entry/wxapp/order") + "m=" + e;
        a.util.request({
            url: o,
            data: {
                op: "getOrderData",
                uid: c,
                uniacid: t,
                currentIndex: r,
                page: n
            },
            success: function (a) {
                if (a.data.orderData) {
                    var t = new Array;
                    1 == d ? (t = i.data.orderData, a.data.orderData.map(function (a) {
                        t.push(a)
                    })) : (t = a.data.orderData, n = 1), i.setData({
                        orderData: t,
                        page: n
                    })
                }
            }
        })
    },
    onReachBottom: function (a) {
        var t = parseInt(this.data.page) + 1,
            e = this.data.currentIndex;
        this.getOrderData(e, t, 1)
    },
    changeIndex: function (a) {
        var t = a.currentTarget.dataset.index;
        this.getOrderData(t, 1, 0), this.setData({
            currentIndex: t
        })
    },
    payOrder: function (r) {
        var n = r.currentTarget.dataset.orderid,
            d = wx.getStorageSync("kejia_farm_uid");
        a.util.request({
            url: "entry/wxapp/fundingPay",
            data: {
                orderid: n,
                uniacid: t
            },
            cachetime: "0",
            success: function (r) {
                if (r.data && r.data.data && !r.data.errno) {
                    var i = r.data.data.package;
                    wx.requestPayment({
                        timeStamp: r.data.data.timeStamp,
                        nonceStr: r.data.data.nonceStr,
                        package: r.data.data.package,
                        signType: "MD5",
                        paySign: r.data.data.paySign,
                        success: function (r) {
                            var c = a.util.url("entry/wxapp/project") + "m=" + e;
                            a.util.request({
                                url: c,
                                data: {
                                    op: "notify",
                                    uniacid: t,
                                    uid: d,
                                    orderid: n,
                                    prepay_id: i
                                },
                                success: function (a) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function (a) {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            })
                                        }
                                    })
                                }
                            })
                        },
                        fail: function (a) {
                            backApp()
                        }
                    })
                }
                "JSAPI支付必须传openid" == r.data.message && wx.navigateTo({
                    url: "../../login/index"
                })
            },
            fail: function (a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function (a) {
                        a.confirm && backApp()
                    }
                })
            }
        })
    },
    cancelOrder: function (r) {
        var n = this,
            d = n.data.currentIndex,
            i = r.currentTarget.dataset.orderid,
            c = a.util.url("entry/wxapp/order") + "m=" + e;
        wx.showModal({
            title: "提示",
            content: "是否确认取消该订单？",
            success: function (a) {
                a.confirm && a.util.request({
                    url: c,
                    data: {
                        op: "cancelOrder",
                        orderid: i,
                        uniacid: t
                    },
                    success: function (a) {
                        wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1,
                            success: function () {
                                n.getOrderData(d, 1, 0)
                            }
                        })
                    }
                })
            }
        })
    },
    preventTouchMove: function () {},
    comfirmOrder: function (a) {
        var t = this,
            e = a.currentTarget.dataset.orderid,
            r = "";
        t.data.orderData.map(function (a) {
            a.id == e && (r = a.project.cover)
        }), this.setData({
            confirm: !0,
            current_cover: r,
            current_orderid: e
        })
    },
    cancel: function () {
        this.setData({
            confirm: !1
        })
    },
    confirmGoods: function (r) {
        var n = this,
            d = r.currentTarget.dataset.orderid,
            i = a.util.url("entry/wxapp/order") + "m=" + e,
            c = n.data.currentIndex;
        a.util.request({
            url: i,
            data: {
                op: "confirmOrder",
                uniacid: t,
                orderid: d
            },
            success: function (a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function (a) {
                        n.setData({
                            confirm: !1
                        }), n.getOrderData(c, 1, 0)
                    }
                })
            }
        })
    },
    orderDetail: function (a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderdetail/index?orderid=" + t
        })
    }
});