var e = new getApp,
    t = e.siteInfo.uniacid,
    a = e.util.getNewUrl("entry/wxapp/pt", "kejia_farm_plugin_pt");
Page({
    data: {
        selectNum: 1,
        address: {},
        buy_types: 2,
        totalPrice: 0,
        send_price: 0,
        selectSpec: [],
        total_price: 0,
        relation_id: 0,
        countDownNum: 0,
        farmSetData: []
    },
    onLoad: function (e) {
        var s = this,
            d = e.goods_id,
            i = e.selectNum,
            c = e.selectSpec,
            o = e.buy_types,
            r = e.selected,
            n = e.relation_id,
            l = wx.getStorageSync("kejia_farm_setData");
        e.util.request({
            url: a,
            data: {
                op: "getSurePtOrder",
                action: "index",
                goods_id: d,
                selectNum: i,
                selectSpec: c,
                buy_types: o,
                uniacid: t
            },
            success: function (e) {
                "undefined" != c ? c = JSON.parse(c) : r = [], s.setData({
                    goods_id: d,
                    goods: e.data.goods,
                    selectNum: i,
                    selectSpec: c,
                    buy_types: o,
                    selected: r,
                    totalPrice: e.data.totalPrice,
                    total_price: e.data.total_price,
                    send_price: e.data.send_price,
                    relation_id: n,
                    farmSetData: l
                })
            }
        })
    },
    chooseAddress: function (e) {
        var t = this,
            a = this.data.address;
        wx.chooseAddress({
            success: function (e) {
                console.log(e), a.address = e.provinceName + e.cityName + e.countyName + e.detailInfo, a.name = e.userName, a.phone = e.telNumber, t.setData({
                    address: a
                }), console.log(t.data.address.address)
            }
        })
    },
    add: function () {
        var e = this.data,
            t = e.selectNum,
            a = e.selectSpec,
            s = e.send_price,
            d = (e.totalPrice, e.buy_types),
            i = e.goods;
        t = parseInt(t) + 1;
        var c = 0;
        c = a ? 2 == d ? a.pt_price * t + parseFloat(s) : a.price * t + parseFloat(s) : i.price * t + parseFloat(s), this.setData({
            selectNum: t,
            total_price: c.toFixed(2)
        })
    },
    reduce: function () {
        var e = this.data,
            t = e.selectNum,
            a = e.selectSpec,
            s = e.send_price,
            d = (e.totalPrice, e.buy_types),
            i = e.goods;
        if (!(t <= 1)) {
            t = parseInt(t) - 1;
            var c = 0;
            c = a ? 2 == d ? a.pt_price * t + parseFloat(s) : a.price * t + parseFloat(s) : i.price * t + parseFloat(s), this.setData({
                selectNum: t,
                total_price: c.toFixed(2)
            })
        }
    },
    addPtOrder: function (s) {
        var d = this.data,
            i = d.goods_id,
            c = (d.goods, d.selectSpec),
            o = d.buy_types,
            r = d.selectNum,
            n = d.address,
            l = d.send_price,
            u = d.total_price,
            p = d.relation_id,
            _ = d.selected,
            m = wx.getStorageSync("kejia_farm_uid");
        if (!n.address) return wx.showToast({
            title: "请选择收货地址",
            icon: "none"
        }), !1;
        e.util.request({
            url: a,
            data: {
                action: "index",
                op: "addPtOrder",
                goods_id: i,
                selectSpec: c,
                buy_types: o,
                selectNum: r,
                address: n,
                uniacid: t,
                uid: m,
                total_price: u,
                send_price: l,
                form_id: s.detail.formId,
                relation_id: p,
                sku_name: _
            },
            success: function (s) {
                if (s.data.order_id) {
                    var d = s.data.order_id,
                        i = e.util.getNewUrl("entry/wxapp/pay", "kejia_farm_plugin_pt");
                    e.util.request({
                        url: i,
                        data: {
                            orderid: d,
                            uniacid: t
                        },
                        cachetime: "0",
                        success: function (e) {
                            if (e.data && e.data.data && !e.data.errno) {
                                var s = e.data.data.package;
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
                                                order_id: d,
                                                uniacid: t,
                                                prepay_id: s
                                            },
                                            success: function () {
                                                wx.showModal({
                                                    title: "提示",
                                                    content: "支付成功",
                                                    showCancel: !1,
                                                    success: function () {
                                                        wx.redirectTo({
                                                            url: "../orderDetail/index?order_id=" + d
                                                        })
                                                    }
                                                }), wx.hideLoading()
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
                                                    url: "../orderDetail/index?order_id=" + d
                                                })
                                            }
                                        })
                                    }
                                })
                            }
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
                } else wx.showToast({
                    title: s.data.msg
                })
            }
        })
    }
});