var a = new getApp(), e = a.siteInfo.uniacid;

Page({
    data: {
        types: 0,
        buyList: [],
        method: 1,
        enums: "",
        addressInfo: {},
        saleAddress: "",
        farmSetData: wx.getStorageSync("kejia_farm_setData"),
        animalSet: []
    },
    onLoad: function(t) {
        var n = this;
        a.util.setNavColor(e);
        var d = JSON.parse(t.list), s = t.types;
        if (this.setData({
            buyList: d,
            types: s
        }), 2 == s) {
            var i = a.util.getNewUrl("entry/wxapp/animal", "kejia_farm_plugin_play");
            a.util.request({
                url: i,
                data: {
                    op: "getPlaySet",
                    uniacid: e
                },
                success: function(a) {
                    n.setData({
                        animalSet: a.data.animalSet,
                        enums: a.data.animalSet.packing_method[0]
                    });
                }
            });
        }
    },
    radioChange: function(a) {
        var e = a.detail.value;
        this.setData({
            method: e
        });
    },
    selectType: function(a) {
        var e = a.detail.value;
        this.setData({
            enums: e
        });
    },
    selectAddress: function() {
        var a = this;
        wx.chooseAddress({
            success: function(e) {
                var t = {
                    userName: e.userName,
                    telNumber: e.telNumber,
                    address: e.cityName + e.countyName + e.detailInfo
                };
                a.setData({
                    addressInfo: t
                });
            }
        });
    },
    surePay: function() {
        var t = this, n = t.data.buyList, d = wx.getStorageSync("kejia_farm_uid"), s = t.data.farmSetData.seed_send_price, i = a.util.getNewUrl("entry/wxapp/land", "kejia_farm_plugin_play") + "&op=addSeedOrder";
        if (!t.data.addressInfo.userName) return wx.showModal({
            title: "提示",
            content: "请选择收货地址",
            showCancel: !1
        }), !1;
        a.util.request({
            url: i,
            data: {
                buyList: n,
                uid: d,
                send_price: s,
                uniacid: e,
                addressInfo: t.data.addressInfo
            },
            method: "POST",
            success: function(t) {
                if (0 == t.data.code) {
                    var n = t.data.order_id;
                    a.util.request({
                        url: "entry/wxapp/SeedSendPay",
                        data: {
                            orderid: n,
                            uniacid: e
                        },
                        cachetime: "0",
                        success: function(t) {
                            if (t.data && t.data.data && !t.data.errno) {
                                var d = t.data.data.package;
                                wx.requestPayment({
                                    timeStamp: t.data.data.timeStamp,
                                    nonceStr: t.data.data.nonceStr,
                                    package: t.data.data.package,
                                    signType: "MD5",
                                    paySign: t.data.data.paySign,
                                    success: function(t) {
                                        var s = a.util.getNewUrl("entry/wxapp/land", "kejia_farm_plugin_play");
                                        a.util.request({
                                            url: s,
                                            data: {
                                                op: "notify_send",
                                                order_id: n,
                                                uniacid: e,
                                                prepay_id: d
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "/kejia_farm/pages/shop/orderList/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.redirectTo({
                                            url: "/kejia_farm/pages/shop/orderList/index"
                                        });
                                    }
                                });
                            } else wx.redirectTo({
                                url: "/kejia_farm/pages/shop/orderList/index"
                            });
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm && wx.redirectTo({
                                        url: "/kejia_farm/pages/shop/orderList/index"
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    sureAnimalPay: function(t) {
        var n = this, d = n.data.buyList, s = wx.getStorageSync("kejia_farm_uid"), i = n.data.farmSetData.animal_send_price, r = a.util.getNewUrl("entry/wxapp/animal", "kejia_farm_plugin_play") + "&op=addAnimalOrder", u = n.data.method, o = n.data.enums, c = {};
        if (1 == u) {
            if (!n.data.addressInfo.userName) return wx.showModal({
                title: "提示",
                content: "请选择收货地址",
                showCancel: !1
            }), !1;
            c = {
                buyList: d,
                uid: s,
                send_price: i,
                uniacid: e,
                addressInfo: n.data.addressInfo,
                enums: o,
                send_method: 0
            };
        } else c = {
            buyList: d,
            uid: s,
            uniacid: e,
            addressInfo: n.data.animalSet.self_lifting_address,
            send_method: 1
        };
        a.util.request({
            url: r,
            data: c,
            method: "POST",
            success: function(t) {
                if (0 == t.data.code) {
                    var n = t.data.order_id;
                    1 != u ? wx.navigateTo({
                        url: "/kejia_farm/pages/shop/orderList/index"
                    }) : a.util.request({
                        url: "entry/wxapp/animalSendPay",
                        data: {
                            orderid: n,
                            uniacid: e
                        },
                        cachetime: "0",
                        success: function(t) {
                            if (t.data && t.data.data && !t.data.errno) {
                                var d = t.data.data.package;
                                wx.requestPayment({
                                    timeStamp: t.data.data.timeStamp,
                                    nonceStr: t.data.data.nonceStr,
                                    package: t.data.data.package,
                                    signType: "MD5",
                                    paySign: t.data.data.paySign,
                                    success: function(t) {
                                        var s = a.util.getNewUrl("entry/wxapp/land", "kejia_farm_plugin_play");
                                        a.util.request({
                                            url: s,
                                            data: {
                                                op: "notify_send",
                                                order_id: n,
                                                uniacid: e,
                                                prepay_id: d
                                            },
                                            success: function(a) {
                                                wx.showToast({
                                                    title: "支付成功",
                                                    success: function(a) {
                                                        wx.redirectTo({
                                                            url: "/kejia_farm/pages/shop/orderList/index"
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(a) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "您取消了支付",
                                            showCancel: !1
                                        });
                                    }
                                });
                            }
                        },
                        fail: function(a) {
                            wx.showModal({
                                title: "系统提示",
                                content: a.data.message ? a.data.message : "错误",
                                showCancel: !1,
                                success: function(a) {
                                    a.confirm;
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});