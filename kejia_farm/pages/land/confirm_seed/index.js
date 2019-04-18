var a = new getApp,
    t = a.siteInfo.uniacid;
wx.getStorageSync("kejia_farm_uid");
var api=require("../../../../utils/api.js");
Page({
    data: {
        seed: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        lid: "",
        farmSetData: [],
        order_id: 0
    },
    onLoad: function (a) {
        var t = a.lid,
            e = JSON.parse(a.seedList),
            o = a.totalPrice;
        this.setData({
            seed: e,
            lid: t,
            totalPrice: o,
            copyTotalPrice: o
        }), this.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    selectCoupon: function (a) {
        var t = this.data.copyTotalPrice;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=5&totalPrice=" + t
        })
    },
    onShow: function () {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var t = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: t,
                totalPrice: parseFloat(a - t.coupon.coupon_price).toFixed(2)
            })
        } else this.setData({
            userCoupon: [],
            totalPrice: a
        })
    },
    surePay: function (e) {
        var o = this,
            i = e.detail.formId,
            n = o.data.seed,
            c = o.data.totalPrice,
            d = o.data.lid,
            r = o.data.userCoupon,
            s = 0,
            u = 0;
        "" != r && (console.log(r), s = r.coupon.id, u = r.coupon.coupon_price);
        var l = wx.getStorageSync("kejia_farm_uid");
        if (0 != l) {
            var p = o.data.order_id;
            api.ajax('farm/api/addSeedOrder',{
                uid: l,
                total_price: c,
                coupon_id: s,
                coupon_price: u,
                lid: d,
                seedList: JSON.stringify(n),
                formid: i,
                order_id: p
            },function(e){
                p = e.data.order_id;
                wx.showToast({
                    title: "支付成功",
                    success: function (a) {
                        wx.redirectTo({
                            url: "../mineLandDetail/index?lid=" + d
                        })
                    }
                });
                return ;
                a.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        op: "getSeedPayOrder",
                        action: "land",
                        orderid: p,
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
                                    a.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "notifySeed",
                                            action: "land",
                                            order_id: p,
                                            uniacid: t,
                                            prepay_id: o,
                                            lid: d
                                        },
                                        success: function (a) {
                                            wx.showToast({
                                                title: "支付成功",
                                                success: function (a) {
                                                    wx.redirectTo({
                                                        url: "../mineLandDetail/index?lid=" + d
                                                    })
                                                }
                                            })
                                        }
                                    })
                                },
                                fail: function (a) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function (a) {}
                                    })
                                }
                            })
                        }
                    },
                    fail: function (a) {
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function (a) {}
                        })
                    }
                })
            },null,null,'POST');
            // a.util.request({
            //     url: "entry/wxapp/class",
            //     data: {
            //         op: "addSeedOrder",
            //         action: "land",
            //         uniacid: t,
            //         uid: l,
            //         total_price: c,
            //         coupon_id: s,
            //         coupon_price: u,
            //         lid: d,
            //         seedList: JSON.stringify(n),
            //         formid: i,
            //         order_id: p
            //     },
            //     method: "POST",
            //     success: function (e) {
            //         p = e.data.order_id, a.util.request({
            //             url: "entry/wxapp/pay",
            //             data: {
            //                 op: "getSeedPayOrder",
            //                 action: "land",
            //                 orderid: p,
            //                 uniacid: t
            //             },
            //             cachetime: "0",
            //             success: function (e) {
            //                 if (e.data && e.data.data && !e.data.errno) {
            //                     var o = e.data.data.package;
            //                     wx.requestPayment({
            //                         timeStamp: e.data.data.timeStamp,
            //                         nonceStr: e.data.data.nonceStr,
            //                         package: e.data.data.package,
            //                         signType: "MD5",
            //                         paySign: e.data.data.paySign,
            //                         success: function (e) {
            //                             a.util.request({
            //                                 url: "entry/wxapp/class",
            //                                 data: {
            //                                     op: "notifySeed",
            //                                     action: "land",
            //                                     order_id: p,
            //                                     uniacid: t,
            //                                     prepay_id: o,
            //                                     lid: d
            //                                 },
            //                                 success: function (a) {
            //                                     wx.showToast({
            //                                         title: "支付成功",
            //                                         success: function (a) {
            //                                             wx.redirectTo({
            //                                                 url: "../mineLandDetail/index?lid=" + d
            //                                             })
            //                                         }
            //                                     })
            //                                 }
            //                             })
            //                         },
            //                         fail: function (a) {
            //                             wx.showModal({
            //                                 title: "系统提示",
            //                                 content: "您取消了支付",
            //                                 showCancel: !1,
            //                                 success: function (a) {}
            //                             })
            //                         }
            //                     })
            //                 }
            //             },
            //             fail: function (a) {
            //                 wx.showModal({
            //                     title: "系统提示",
            //                     content: a.data.message ? a.data.message : "错误",
            //                     showCancel: !1,
            //                     success: function (a) {}
            //                 })
            //             }
            //         })
            //     }
            // })
        } else wx.navigateTo({
            url: "../../../login/index"
        })
    }
});