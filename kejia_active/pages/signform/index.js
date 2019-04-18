var t = new getApp,
    a = t.siteInfo.uniacid,
    e = "kejia_farm_plugin_active";
Page({
    data: {
        signList: [{
            id: 1,
            name: "",
            tel: "",
            IDCard: ""
        }],
        activeid: "",
        active: [],
        total: 0,
        selectNum: 0,
        spec: [],
        activeSet: wx.getStorageSync("kejia_farm_active_set"),
        farmSetData: []
    },
    onLoad: function (i) {
        
        var s = this,
            n = i.activeid,
            d = JSON.parse(i.spec),
            r = i.total,
            c = i.selectNum,
            o = t.util.url("entry/wxapp/active") + "m=" + e,
            u = wx.getStorageSync("kejia_farm_setData");
        t.api.ajax(
            'farm/api/getActiveConfirm',
            {
                // op: "getActiveConfirm",
                uniacid: a,
                active_id: n
            },
            function (t) {
                s.setData({
                    active: t.data.active,
                    activeid: n
                })
            }
        ,null,null,'POST'), s.setData({
            spec: d,
            total: r,
            selectNum: c,
            farmSetData: u
        }), t.util.setNavColor(a)
    },
    addSign: function () {
        var t = this.data.signList,
            a = {
                id: t[t.length - 1].id + 1,
                name: "",
                tel: "",
                IDCard: ""
            };
        t.push(a), this.setData({
            signList: t
        })
    },
    delete: function (t) {
        var a = [t.currentTarget.dataset.index, this.data.signList],
            e = a[0],
            i = a[1];
        i.splice(e, 1), this.setData({
            signList: i
        })
    },
    modifyName: function (t) {
        var a = [t.currentTarget.dataset.index, t.detail.value, this.data.signList],
            e = a[0],
            i = a[1],
            s = a[2];
        s[e].name = i, this.setData({
            signList: s
        })
    },
    modifytel: function (t) {
        var a = [t.currentTarget.dataset.index, t.detail.value, this.data.signList],
            e = a[0],
            i = a[1],
            s = a[2];
        s[e].tel = i, this.setData({
            signList: s
        })
    },
    modifyidcard: function (t) {
        var a = [t.currentTarget.dataset.index, t.detail.value, this.data.signList],
            e = a[0],
            i = a[1],
            s = a[2];
        s[e].IDCard = i, this.setData({
            signList: s
        })
    },
    confirm: function () {
        var i = this,
            s = wx.getStorageSync("kejia_farm_uid");
        if (s) {
            for (var n = i.data.signList, d = i.data.activeid, r = i.data.spec, c = i.data.selectNum, o = i.data.total, u = 0; u < n.length; u++)
                if ("" == n[u].name || "" == n[u].tel || "" == n[u].IDCard) return wx.showToast({
                    title: "请填写完整信息！"
                }), flag = !0, !1;
            var l = t.util.url("entry/wxapp/active") + "m=" + e + "&op=addOrder";
            wx.showLoading({
                title: "加载中"
            }), t.util.request({
                url: "farm/api/addActiveOrder",
                method: "POST",
                data: {
                    op:"addActiveOrder",
                    sign: JSON.stringify(n),
                    activeid: d,
                    spec: JSON.stringify(r),
                    selectNum: c,
                    total: o,
                    uid: s,
                    uniacid: a
                },
                success: function (i) {
                    var n = i.data.order_id;
                    if(n){
                        wx.showToast({
                            title: "下单成功",
                            success: function (t) {
                                wx.redirectTo({
                                    url: "../payforResult/index?status=true&order_id=" + n
                                })
                            }
                        })
                    }else{
                        t.api.toast("下单失败");
                    }
                    return ;
                    if (console.log(i), 1 == i.data.code) {
                        var n = i.data.order_id;
                        if (o > 0) t.util.request({
                            url: "entry/wxapp/activePay",
                            data: {
                                orderid: n,
                                uniacid: a
                            },
                            cachetime: "0",
                            success: function (i) {
                                if (i.data && i.data.data && !i.data.errno) {
                                    var d = i.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: i.data.data.timeStamp,
                                        nonceStr: i.data.data.nonceStr,
                                        package: i.data.data.package,
                                        signType: "MD5",
                                        paySign: i.data.data.paySign,
                                        success: function (i) {
                                            var r = t.util.url("entry/wxapp/active") + "m=" + e;
                                            t.util.request({
                                                url: r,
                                                data: {
                                                    op: "notify",
                                                    uniacid: a,
                                                    uid: s,
                                                    orderid: n,
                                                    prepay_id: d
                                                },
                                                success: function (t) {
                                                    wx.hideLoading(), wx.showToast({
                                                        title: "支付成功",
                                                        success: function (t) {
                                                            wx.redirectTo({
                                                                url: "../payforResult/index?status=true&order_id=" + n
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        },
                                        fail: function (t) {
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
                                "JSAPI支付必须传openid" == i.data.message && wx.navigateTo({
                                    url: "/kejia_farm/pages/login/index"
                                }), "当前余票不足" == i.data.message && wx.showModal({
                                    title: "提示",
                                    content: i.data.message,
                                    showCancel: !1
                                })
                            },
                            fail: function (t) {
                                wx.showModal({
                                    title: "系统提示",
                                    content: t.data.message ? t.data.message : "错误",
                                    showCancel: !1,
                                    success: function (t) {
                                        t.confirm
                                    }
                                })
                            }
                        });
                        else {
                            var d = t.util.url("entry/wxapp/active") + "m=" + e;
                            t.util.request({
                                url: d,
                                data: {
                                    op: "notify",
                                    uniacid: a,
                                    uid: s,
                                    orderid: n
                                },
                                success: function (t) {
                                    wx.showToast({
                                        title: "支付成功",
                                        success: function (t) {
                                            wx.redirectTo({
                                                url: "../payforResult/index?status=true&order_id=" + n
                                            }), wx.hideLoading()
                                        }
                                    })
                                }
                            })
                        }
                    } else wx.hideLoading(), wx.showModal({
                        title: "提示",
                        content: i.data.msg,
                        showCancel: !1
                    })
                }
            })
        } else wx.navigateTo({
            url: "/kejia_farm/pages/login/index"
        })
    }
});