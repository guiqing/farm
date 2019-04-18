Object.defineProperty(exports, "__esModule", {
    value: !0
});
require("../../utils/util");
var e = new getApp,
    t = e.siteInfo.uniacid,
    a = e.util.getNewUrl("entry/wxapp/pt", "kejia_farm_plugin_pt");
Page({
    data: {
        orderStatus: 0,
        orderDetail: [],
        maxLimit: 4,
        order_id: 0,
        relation: [],
        relationOrder: [],
        differ: [],
        about: [],
        farmSetData: []
    },
    onLoad: function (e) {
        var o = this,
            n = e.order_id,
            r = wx.getStorageSync("kejia_farm_setData");
        e.util.request({
            url: a,
            data: {
                op: "getPtOrderDetail",
                action: "index",
                uniacid: t,
                order_id: n
            },
            success: function (e) {
                console.log(e), o.setData({
                    order_id: n,
                    orderDetail: e.data.orderDetail,
                    relation: e.data.relation,
                    relationOrder: e.data.relationOrder,
                    differ: e.data.differ,
                    maxLimit: parseInt(e.data.relation.ptnumber),
                    about: e.data.about,
                    farmSetData: r
                })
            }
        })
    },
    onShow: function () {},
    onHide: function () {
        clearInterval(void 0)
    },
    preventTouchMove: function () {},
    onShareAppMessage: function (e) {
        var t = wx.getStorageSync("kejia_farm_wxInfo"),
            a = this.data.orderDetail;
        return "button" === e.from && console.log(e.target), {
            title: t.nickName + "邀请你拼" + a.goods_name,
            path: "/kejia_pt/pages/details/index?goodsid=" + a.goods_id + "&relation_id=" + a.relation_id,
            imageUrl: a.cover
        }
    },
    chooseAddress: function (e) {
        var o = this,
            n = o.data,
            r = n.order_id,
            d = n.orderDetail;
        wx.chooseAddress({
            success: function (e) {
                var n = e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    i = e.userName,
                    s = e.telNumber;
                e.util.request({
                    url: a,
                    data: {
                        op: "ptUpdateAddress",
                        action: "index",
                        uniacid: t,
                        order_id: r,
                        address: n,
                        phone: s,
                        name: i
                    },
                    success: function (e) {
                        d.name = i, d.address = n, d.phone = s, o.setData({
                            orderDetail: d
                        })
                    }
                })
            }
        })
    },
    callNumber: function (e) {
        var t = this.data.about;
        console.log(t.phone), wx.makePhoneCall({
            phoneNumber: t.phone
        })
    },
    cancelPtOrder: function (e) {
        var o = this,
            n = e.currentTarget.dataset.orderid,
            r = wx.getStorageSync("kejia_farm_uid"),
            d = o.data.orderDetail;
        wx.showModal({
            title: "提示",
            content: "确认取消该订单吗？",
            success: function (e) {
                e.confirm && e.util.request({
                    url: a,
                    data: {
                        op: "cancelPtOrder",
                        action: "index",
                        order_id: n,
                        uniacid: t,
                        uid: r
                    },
                    success: function (e) {
                        wx.showToast({
                            title: e.data.msg
                        }), 0 == e.data.code && (d.status_code = 5, o.setData({
                            orderDetail: d
                        }))
                    }
                })
            }
        })
    },
    nowPay: function (o) {
        var n = this,
            r = o.currentTarget.dataset.orderid,
            d = e.util.getNewUrl("entry/wxapp/pay", "kejia_farm_plugin_pt"),
            i = n.data.orderDetail;
        e.util.request({
            url: d,
            data: {
                orderid: r,
                uniacid: t
            },
            cachetime: "0",
            success: function (e) {
                if (e.data && e.data.data && !e.data.errno) {
                    var o = e.data.data.package;
                    wx.requestPayment({
                        timeStamp: e.data.data.timeStamp,
                        nonceStr: e.data.data.nonceStr,
                        package: e.data.data.package,
                        signType: "MD5",
                        paySign: e.data.data.paySign,
                        success: function (e) {
                            wx.showLoading({
                                title: "加载中"
                            }), e.util.request({
                                url: a,
                                data: {
                                    action: "index",
                                    op: "sendMsg",
                                    order_id: r,
                                    uniacid: t,
                                    prepay_id: o
                                },
                                success: function (e) {
                                    console.log(pa), wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function () {
                                            i.status_code = 1, n.setData({
                                                orderDetail: i
                                            })
                                        }
                                    }), wx.hideLoading()
                                }
                            })
                        },
                        fail: function (e) {
                            console.log(e), wx.showModal({
                                title: "提示",
                                content: e.data.message,
                                showCancel: !1
                            })
                        }
                    })
                } else wx.showModal({
                    title: "提示",
                    content: e.data.message,
                    showCancel: !1
                })
            },
            fail: function (e) {
                wx.showModal({
                    title: "系统提示",
                    content: e.data.message ? e.data.message : "错误",
                    showCancel: !1,
                    success: function (e) {}
                })
            }
        })
    },
    applyRefundOrder: function (e) {
        var o = this,
            n = e.currentTarget.dataset.orderid,
            r = wx.getStorageSync("kejia_farm_uid"),
            d = o.data.orderDetail;
        wx.showModal({
            title: "提示",
            content: "确认对该订单进行退款处理吗?",
            success: function (e) {
                e.confirm && e.util.request({
                    url: a,
                    data: {
                        op: "applyRefundOrder",
                        action: "index",
                        order_id: n,
                        uniacid: t,
                        uid: r
                    },
                    success: function (e) {
                        wx.showToast({
                            title: e.data.msg
                        }), 0 == e.data.code && (d.status_code = 4, o.setData({
                            orderDetail: d
                        }))
                    }
                })
            }
        })
    },
    confirmGoods: function (e) {
        var o = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            r = e.currentTarget.dataset.orderid,
            d = o.data.orderDetail;
        wx.showModal({
            title: "提示",
            content: "确认您已经收到货了吗？",
            success: function (e) {
                e.confirm && e.util.request({
                    url: a,
                    data: {
                        op: "confirmGoods",
                        action: "index",
                        order_id: r,
                        uniacid: t,
                        uid: n
                    },
                    success: function (e) {
                        wx.showToast({
                            title: e.data.msg
                        }), 0 == e.data.code && (d.status_code = 3, o.setData({
                            orderDetail: d
                        }))
                    }
                })
            }
        })
    },
    deletePtOrder: function (e) {
        var o = e.currentTarget.dataset.orderid,
            n = wx.getStorageSync("kejia_farm_uid");
        wx.showModal({
            title: "提示",
            content: "确认删除该订单吗？",
            success: function (e) {
                e.confirm && e.util.request({
                    url: a,
                    data: {
                        op: "deletePtOrder",
                        action: "index",
                        order_id: o,
                        uniacid: t,
                        uid: n
                    },
                    success: function (e) {
                        wx.showToast({
                            title: e.data.msg,
                            success: function () {
                                wx.redirectTo({
                                    url: "../orderLists/index"
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    buyAgain: function (e) {
        var t = e.currentTarget.dataset.goodsid;
        wx.redirectTo({
            url: "../details/index?goodsid=" + t
        })
    },
    toComment: function (e) {
        var t = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/kejia_farm/pages/shop/comment/index?order_id=" + t + "&module_name=kejia_farm_plugin_pt"
        })
    }
});