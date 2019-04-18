var a = new getApp,
    t = a.siteInfo.uniacid;
Page({
    data: {
        orderData: []
    },
    onLoad: function (e) {
        var r = this,
            n = a.util.url("entry/wxapp/order") + "m=kejia_farm_plugin_funding",
            d = e.orderid;
        a.util.request({
            url: n,
            data: {
                op: "orderDetail",
                uniacid: t,
                orderid: d
            },
            success: function (a) {
                var t = a.data.orderData,
                    e = "";
                e = 1 == t.return_type ? "平台将以" + t.project.return_percent + "%的价格回收" : a.data.orderData.spec.spec_desc, r.setData({
                    orderData: a.data.orderData,
                    return_desc: e
                })
            }
        })
    },
    payOrder: function (e) {
        var r = e.currentTarget.dataset.orderid,
            n = wx.getStorageSync("kejia_farm_uid");
        a.util.request({
            url: "entry/wxapp/fundingPay",
            data: {
                orderid: r,
                uniacid: t
            },
            cachetime: "0",
            success: function (e) {
                if (e.data && e.data.data && !e.data.errno) {
                    var d = e.data.data.package;
                    wx.requestPayment({
                        timeStamp: e.data.data.timeStamp,
                        nonceStr: e.data.data.nonceStr,
                        package: e.data.data.package,
                        signType: "MD5",
                        paySign: e.data.data.paySign,
                        success: function (e) {
                            var i = a.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
                            a.util.request({
                                url: i,
                                data: {
                                    op: "notify",
                                    uniacid: t,
                                    uid: n,
                                    orderid: r,
                                    prepay_id: d
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
                        fail: function (a) {}
                    })
                }
                "JSAPI支付必须传openid" == e.data.message && wx.navigateTo({
                    url: "../../login/index"
                })
            },
            fail: function (a) {
                wx.showModal({
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
});