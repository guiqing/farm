var e = new getApp,
    t = e.siteInfo.uniacid,
    a = "kejia_farm_plugin_funding";
Page({
    data: {
        proDetail: [],
        spec: [],
        count: 1,
        name: "",
        phone: "",
        address: "",
        farmsetData: wx.getStorageSync("kejia_farm_setData"),
        funding_set: [],
        return_type: 2,
        return_desc: ""
    },
    onLoad: function (n) {
        var r = this,
            i = e.util.url("entry/wxapp/project") + "m=" + a,
            d = n.count,
            s = JSON.parse(n.spec),
            c = n.pid;
        e.util.request({
            url: i,
            data: {
                op: "getOrderProDetail",
                uniacid: t,
                pid: c,
                count: d,
                spec_id: s.id
            },
            success: function (e) {
                r.setData({
                    proDetail: e.data.proDetail,
                    total_price: e.data.total_price,
                    spec: s,
                    count: d,
                    funding_set: e.data.funding_set,
                    return_desc: s.spec_desc
                })
            }
        })
    },
    chooseAddr: function (e) {
        var t = this;
        wx.chooseAddress({
            success: function (e) {
                t.setData({
                    name: e.userName,
                    phone: e.telNumber,
                    address: e.provinceName + " " + e.cityName + " " + e.countyName + " " + e.detailInfo
                })
            },
            fail: function (e) {
                wx.showModal({
                    title: "提示",
                    content: "您上次拒绝了授权收获地址",
                    confirmText: "前去授权",
                    success: function (e) {
                        e.confirm ? wx.reLaunch({
                            url: "../../user/center/index"
                        }) : e.cancel
                    }
                })
            }
        })
    },
    radioChange: function (e) {
        var t = e.detail.value,
            a = this.data.proDetail,
            n = this.data.spec,
            r = "";
        r = 1 == t ? "平台将以" + a.return_percent + "%的价格回收" : n.spec_desc, this.setData({
            return_type: t,
            return_desc: r
        })
    },
    changeState: function (e) {
        var t = e.currentTarget.dataset.value,
            a = this.data,
            n = a.proDetail,
            r = a.spec,
            i = "";
        i = 1 == t ? "平台将以" + n.return_percent + "%的价格回收" : r.spec_desc, this.setData({
            return_type: t,
            return_desc: i
        })
    },
    subOrder: function (n) {
        var r = this,
            i = wx.getStorageSync("kejia_farm_uid"),
            d = r.data.count,
            s = r.data.proDetail,
            c = r.data.spec,
            o = r.data.name,
            u = r.data.phone,
            p = r.data.address,
            l = r.data.total_price,
            f = n.detail.value.remark,
            _ = r.data.return_type;
        if ("" == o || "" == p || "" == u) return wx.showToast({
            title: "请选择地址"
        }), !1;
        if (i) {
            var g = e.util.url("entry/wxapp/project") + "m=" + a;
            e.util.request({
                url: g,
                data: {
                    op: "addOrder",
                    pid: s.id,
                    spec_id: c.id,
                    count: d,
                    name: o,
                    phone: u,
                    address: p,
                    uid: i,
                    uniacid: t,
                    remark: f,
                    total_price: l,
                    return_type: _
                },
                success: function (n) {
                    var r = n.data.order_id;
                    e.util.request({
                        url: "entry/wxapp/fundingPay",
                        data: {
                            orderid: r,
                            uniacid: t
                        },
                        cachetime: "0",
                        success: function (n) {
                            if (n.data && n.data.data && !n.data.errno) {
                                var d = n.data.data.package;
                                wx.requestPayment({
                                    timeStamp: n.data.data.timeStamp,
                                    nonceStr: n.data.data.nonceStr,
                                    package: n.data.data.package,
                                    signType: "MD5",
                                    paySign: n.data.data.paySign,
                                    success: function (n) {
                                        var s = e.util.url("entry/wxapp/project") + "m=" + a;
                                        e.util.request({
                                            url: s,
                                            data: {
                                                op: "notify",
                                                uniacid: t,
                                                uid: i,
                                                orderid: r,
                                                prepay_id: d
                                            },
                                            success: function (e) {
                                                console.log(e), wx.showToast({
                                                    title: "支付成功",
                                                    success: function (e) {
                                                        wx.redirectTo({
                                                            url: "../orderList/index"
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    },
                                    fail: function (e) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "您取消了支付",
                                            showCancel: !1,
                                            success: function () {
                                                wx.redirectTo({
                                                    url: "../orderList/index"
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            "JSAPI支付必须传openid" == n.data.message && wx.navigateTo({
                                url: "../../login/index"
                            })
                        },
                        fail: function (e) {
                            wx.showModal({
                                title: "系统提示",
                                content: e.data.message ? e.data.message : "错误",
                                showCancel: !1,
                                success: function (e) {
                                    e.confirm
                                }
                            })
                        }
                    })
                }
            })
        } else wx.navigateTo({
            url: "../../login/index"
        })
    }
});