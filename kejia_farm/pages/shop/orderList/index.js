var t = new getApp;
var api=require("../../../../utils/api.js");
Page({
    data: {
        currentIndex: "4",
        orderData: [],
        status: "",
        page: 1,
        farmSetData: [],
        isContent: !0,
        show_verify: !0,
        verify_qrcode: ""
    },
    onLoad: function (a) {
        var e = this;
        if (a.status) r = a.status;
        else var r = 4;
        var n = t.siteInfo.uniacid;
        wx.getStorageSync("kejia_farm_uid");
        e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            currentIndex: r
        }), this.getOrderData(), t.util.setNavColor(n)
    },
    getOrderData: function () {
        var a = this,
            e = a.data.currentIndex,
            r = t.siteInfo.uniacid,
            n = wx.getStorageSync("kejia_farm_uid");
        api.ajax('farm/api/orderList',{
            uid: n,
            status: e,
            page:0
        },function(t){
            t.data.orderData ? a.setData({
                orderData: t.data.orderData,
                page: 1
            }) : a.setData({
                isContent: !1
            })
        });
        // t.util.request({
        //     url: "entry/wxapp/order",
        //     data: {
        //         op: "orderList",
        //         uniacid: r,
        //         uid: n,
        //         status: e
        //     },
        //     success: function (t) {
        //         t.data.orderData ? a.setData({
        //             orderData: t.data.orderData,
        //             page: 1
        //         }) : a.setData({
        //             isContent: !1
        //         })
        //     }
        // })
    },
    changeIndex: function (t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index
        }), this.getOrderData()
    },
    cancelOrder: function (a) {
        var e = this,
            r = t.siteInfo.uniacid,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = a.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确认取消订单吗？",
            success: function (a) {
                a.confirm && api.ajax('farm/api/cancelOrder',{
                    uid: n,
                    order_id: i 
                },function(t){
                    1 == t.data.code ? wx.showModal({
                        title: "提示",
                        content: "订单取消成功",
                        showCancel: !1,
                        success: function () {
                            e.getOrderData()
                        }
                    }) : wx.showToast({
                        title: "取消失败"
                    })
                });
                // t.util.request({
                //     url: "entry/wxapp/order",
                //     data: {
                //         op: "cancelOrder",
                //         uid: n,
                //         uniacid: r,
                //         order_id: i
                //     },
                //     success: function (t) {
                //         1 == t.data.code ? wx.showModal({
                //             title: "提示",
                //             content: "订单取消成功",
                //             showCancel: !1,
                //             success: function () {
                //                 e.getOrderData()
                //             }
                //         }) : wx.showToast({
                //             title: "取消失败"
                //         })
                //     }
                // })
            }
        })
    },
    payOrder: function (a) {
        var e = t.siteInfo.uniacid,
            r = (wx.getStorageSync("kejia_farm_uid"), a.currentTarget.dataset.orderid);
        api.ajax('farm/api/getShopPayOrder',{
            orderid: r,
            file: "shop"
        },function (a) {
            if (a.data && a.data.data && !a.data.errno) {
                var n = a.data.data.package;
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
                return ;
                wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function (a) {
                        wx.showLoading({
                            title: "加载中"
                        }), t.util.request({
                            url: "entry/wxapp/shop",
                            data: {
                                order_id: r,
                                op: "sendMsg",
                                uniacid: e,
                                prepay_id: n
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
                                }), wx.hideLoading()
                            }
                        })
                    },
                    fail: function (t) {
                        wx.showModal({
                            title: "系统提示",
                            content: "您取消了支付!",
                            showCancel: !1,
                            success: function (t) {}
                        }), wx.hideLoading()
                    }
                })
            } else console.log("fail1")
        });
        // t.util.request({
        //     url: "entry/wxapp/pay",
        //     data: {
        //         op: "getShopPayOrder",
        //         orderid: r,
        //         uniacid: e,
        //         file: "shop"
        //     },
        //     cachetime: "0",
        //     success: function (a) {
        //         if (a.data && a.data.data && !a.data.errno) {
        //             var n = a.data.data.package;
        //             wx.requestPayment({
        //                 timeStamp: a.data.data.timeStamp,
        //                 nonceStr: a.data.data.nonceStr,
        //                 package: a.data.data.package,
        //                 signType: "MD5",
        //                 paySign: a.data.data.paySign,
        //                 success: function (a) {
        //                     wx.showLoading({
        //                         title: "加载中"
        //                     }), t.util.request({
        //                         url: "entry/wxapp/shop",
        //                         data: {
        //                             order_id: r,
        //                             op: "sendMsg",
        //                             uniacid: e,
        //                             prepay_id: n
        //                         },
        //                         success: function () {
        //                             wx.showModal({
        //                                 title: "提示",
        //                                 content: "支付成功",
        //                                 showCancel: !1,
        //                                 success: function () {
        //                                     wx.redirectTo({
        //                                         url: "../orderList/index"
        //                                     })
        //                                 }
        //                             }), wx.hideLoading()
        //                         }
        //                     })
        //                 },
        //                 fail: function (t) {
        //                     wx.showModal({
        //                         title: "系统提示",
        //                         content: "您取消了支付!",
        //                         showCancel: !1,
        //                         success: function (t) {}
        //                     }), wx.hideLoading()
        //                 }
        //             })
        //         } else console.log("fail1")
        //     },
        //     fail: function (t) {
        //         "JSAPI支付必须传openid" == t.data.message ? wx.navigateTo({
        //             url: "/kejia_farm/pages/login/index"
        //         }) : wx.showModal({
        //             title: "系统提示",
        //             content: t.data.message ? t.data.message : "错误",
        //             showCancel: !1,
        //             success: function (t) {
        //                 t.confirm
        //             }
        //         })
        //     }
        // })
    },
    applyRefund: function (a) {
        var e = this,
            r = t.siteInfo.uniacid,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = a.currentTarget.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确认申请退款吗？",
            success: function (a) {
                a.confirm && api.ajax('farm/api/applyRefund',{
                    uid: n,
                    order_id: i
                },function (t) {
                    1 == t.data.code ? wx.showModal({
                        title: "提示",
                        content: "申请已提交",
                        showCancel: !1,
                        success: function () {
                            e.getOrderData()
                        }
                    }) : wx.showToast({
                        title: "申请失败"
                    })
                })
                // t.util.request({
                //     url: "entry/wxapp/order",
                //     data: {
                //         op: "applyRefund",
                //         uid: n,
                //         uniacid: r,
                //         order_id: i
                //     },
                //     success: function (t) {
                //         1 == t.data.code ? wx.showModal({
                //             title: "提示",
                //             content: "申请已提交",
                //             showCancel: !1,
                //             success: function () {
                //                 e.getOrderData()
                //             }
                //         }) : wx.showToast({
                //             title: "申请失败"
                //         })
                //     }
                // })
            }
        })
    },
    sureGoods: function (a) {
        var e = this,
            r = t.siteInfo.uniacid,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = a.currentTarget.dataset.orderid;
        api.ajax('farm/api/sureGoods',{
            uid: n,
            order_id: i
        },function (t) {
            1 == t.data.code ? wx.showModal({
                title: "提示",
                content: "收货成功",
                showCancel: !1,
                success: function () {
                    e.getOrderData()
                }
            }) : wx.showToast({
                title: "收货失败"
            })
        });
        // t.util.request({
        //     url: "entry/wxapp/order",
        //     data: {
        //         op: "sureGoods",
        //         uid: n,
        //         uniacid: r,
        //         order_id: i
        //     },
        //     success: function (t) {
        //         1 == t.data.code ? wx.showModal({
        //             title: "提示",
        //             content: "收货成功",
        //             showCancel: !1,
        //             success: function () {
        //                 e.getOrderData()
        //             }
        //         }) : wx.showToast({
        //             title: "收货失败"
        //         })
        //     }
        // })
    },
    intoOrderDetail: function (t) {
        var a = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../Group/orderDetails/index?order_id=" + a
        })
    },
    onReachBottom: function (a) {
        var e = this,
            r = t.siteInfo.uniacid,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = e.data.currentIndex,
            d = e.data.page,
            o = e.data.orderData;
        api.ajax('farm/api/orderList',{
            uid: n,
            status: i,
            page: d
        },function (t) {
            if (t.data.orderData) {
                for (var a = t.data.orderData, r = 0; r < a.length; r++) o.push(a[r]);
                e.setData({
                    orderData: o,
                    page: parseInt(d) + 1
                })
            }
        })
        // t.util.request({
        //     url: "entry/wxapp/order",
        //     data: {
        //         op: "orderList",
        //         uniacid: r,
        //         uid: n,
        //         status: i,
        //         page: d
        //     },
        //     success: function (t) {
        //         if (t.data.orderData) {
        //             for (var a = t.data.orderData, r = 0; r < a.length; r++) o.push(a[r]);
        //             e.setData({
        //                 orderData: o,
        //                 page: parseInt(d) + 1
        //             })
        //         }
        //     }
        // })
    },
    deleteOrder: function (a) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确认删除该订单吗？删除后不可找回！",
            success: function (r) {
                if (r.confirm) {
                    var n = t.siteInfo.uniacid,
                        i = wx.getStorageSync("kejia_farm_uid"),
                        d = a.currentTarget.dataset.orderid;
                    api.ajax('farm/api/deleteOrder',{
                        orderid: d,
                        uid: i
                    },function (t) {
                        console.log(t), 1 == t.data.code ? (wx.showToast({
                            title: t.data.msg
                        }), e.getOrderData()) : wx.showToast({
                            title: t.data.msg
                        })
                    });
                    // t.util.request({
                    //     url: "entry/wxapp/order",
                    //     data: {
                    //         op: "deleteOrder",
                    //         uniacid: n,
                    //         orderid: d,
                    //         uid: i
                    //     },
                    //     success: function (t) {
                    //         console.log(t), 1 == t.data.code ? (wx.showToast({
                    //             title: t.data.msg
                    //         }), e.getOrderData()) : wx.showToast({
                    //             title: t.data.msg
                    //         })
                    //     }
                    // })
                } else r.cancel
            }
        })
    },
    commentOrder: function (t) {
        console.log(t.currentTarget.dataset.orderid), wx.navigateTo({
            url: "/kejia_farm/pages/shop/comment/index?order_id=" + t.currentTarget.dataset.orderid
        })
    },
    showVerifyQrocde: function (t) {
        var a = t.currentTarget.dataset.orderid,
            e = "";
        this.data.orderData.map(function (t) {
            t.id == a && (e = t.offline_qrocde)
        }), this.setData({
            verify_qrcode: e,
            show_verify: !1
        })
    },
    hideVerify: function (t) {
        this.setData({
            show_verify: !0
        })
    }
});