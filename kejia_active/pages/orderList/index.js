var a = new getApp,
    t = a.siteInfo.uniacid,
    e = "kejia_farm_plugin_active";
var api=require("../../../utils/api.js");
Page({
    data: {
        currentIndex: "1",
        orderList: [],
        page: 1,
        farmSetData: wx.getStorageSync("kejia_farm_setData")
    },
    onLoad: function (e) {
        this.getOrderData(1, 1, 0), a.util.setNavColor(t)
    },
    getOrderData: function (n, r, i) {
        var d = this,
            c = a.util.url("entry/wxapp/order") + "m=" + e,
            s = wx.getStorageSync("kejia_farm_uid");
            console.log(c);
        api.ajax(
            'farm/api/getActiveOrderList',
            {
                // op: "getOrderList",
                uniacid: t,
                uid: s,
                page: r,
                current: n
            },
            function (a) {
                if (a.data.orderList) {
                    var t = d.data.orderList,
                        e = a.data.orderList;
                    1 == i ? e.map(function (a) {
                        t.push(a)
                    }) : (t = e, r = 1), d.setData({
                        orderList: t,
                        page: r
                    })
                }
            }
        )
    },
    changeIndex: function (a) {
        var t = a.currentTarget.dataset.index;
        this.getOrderData(t, 1, 0), this.setData({
            currentIndex: a.currentTarget.dataset.index
        })
    },
    onReachBottom: function (a) {
        var t = this.data.changeIndex,
            e = parseInt(this.data.page) + 1;
        this.getOrderData(t, e, 1)
    },
    onPullDownRefresh: function (a) {
        var t = this.data.changeIndex;
        this.getOrderData(t, 1, 1)
    },
    cancelOrder: function (n) {
        var r = this,
            i = this.data.changeIndex,
            d = wx.getStorageSync("kejia_farm_uid"),
            c = n.currentTarget.dataset.orderid,
            s = a.util.url("entry/wxapp/order") + "m=" + e;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function (a) {
                a.confirm && a.api.ajax(
                    'farm/api/cancelActiveOrder',
                    {
                        // op: "cancelOrder",
                        uniacid: t,
                        order_id: c,
                        uid: d
                    },
                    function (a) {
                        1 == a.data.code ? wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1,
                            success: function (a) {
                                r.getOrderData(i, 1, 0)
                            }
                        }) : wx.showModal({
                            title: "提示",
                            content: a.data.msg,
                            showCancel: !1
                        })
                    }
                )
            }
        })
    },
    nowPay: function (n) {
        var r = n.currentTarget.dataset.orderid;
        api.ajax(
            "farm/api/notifyActive",
            {
                orderid: r,
                uniacid: t
            },
            function (n) {
                wx.showToast({
                    title: "支付成功",
                    success: function (a) {
                        wx.redirectTo({
                            url: "../payforResult/index?status=true&order_id=" + r
                        })
                    }
                })
                return ;
                if (n.data && n.data.data && !n.data.errno) {
                    var i = n.data.data.package;
                    wx.requestPayment({
                        timeStamp: n.data.data.timeStamp,
                        nonceStr: n.data.data.nonceStr,
                        package: n.data.data.package,
                        signType: "MD5",
                        paySign: n.data.data.paySign,
                        success: function (n) {
                            var d = a.util.url("entry/wxapp/active") + "m=" + e;
                            a.util.request({
                                url: d,
                                data: {
                                    op: "notify",
                                    uniacid: t,
                                    uid: uid,
                                    orderid: r,
                                    prepay_id: i
                                },
                                success: function (a) {
                                    wx.hideLoading(), wx.showToast({
                                        title: "支付成功",
                                        success: function (a) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + r
                                            })
                                        }
                                    })
                                }
                            })
                        },
                        fail: function (a) {
                            wx.showModal({
                                title: "提示",
                                content: "您取消了支付",
                                showCancel: !1
                            })
                        }
                    })
                }
                "JSAPI支付必须传openid" == n.data.message && wx.navigateTo({
                    url: "/kejia_farm/pages/login/index"
                })
            },
            function (a) {
                wx.showModal({
                    title: "系统提示",
                    content: a.data.message ? a.data.message : "错误",
                    showCancel: !1,
                    success: function (a) {
                        a.confirm
                    }
                })
            }
        )
    },
    seeTicket: function (a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + t
        })
    }
});