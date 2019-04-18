var t = getApp(),
    e = t.siteInfo.uniacid;
Page({
    data: {
        price: 0,
        selected: 0,
        user: [],
        farmSetData: []
    },
    onLoad: function (a) {
        var i = this,
            o = wx.getStorageSync("kejia_farm_uid");
        t.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "getWallet",
                uniacid: e,
                uid: o
            },
            success: function (t) {
                i.setData({
                    user: t.data.userInfo
                })
            }
        }), i.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    formSubmit: function (a) {
        var i = this,
            o = wx.getStorageSync("kejia_farm_uid"),
            r = parseFloat(parseFloat(a.detail.value.price).toFixed(2)),
            s = i.data.user,
            n = i.data.selected;
        if (r <= 0) return wx.showModal({
            title: "提示",
            content: "提现金额不能小于0",
            showCancel: !1
        }), !1;
        if (!r) return wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
        }), !1;
        if (s.money < r) return wx.showModal({
            title: "提示",
            content: "提现金额不足",
            showCancel: !1
        }), !1;
        if (r < parseFloat(this.data.farmSetData.user_withdraw_low_price)) wx.showModal({
            title: "提示",
            content: "提现金额不能低于" + this.data.farmSetData.user_withdraw_low_price + "元",
            showCancel: !1
        });
        else {
            var d = a.detail.value.name,
                l = a.detail.value.mobile;
            if (0 == n) {
                if (!d || void 0 == d) return void wx.showToast({
                    title: "姓名不能为空"
                });
                if (!l || void 0 == l) return void wx.showToast({
                    title: "账号不能为空"
                })
            }
            0 == n || 1 == n ? (wx.showLoading({
                title: "正在提交",
                mask: !0
            }), console.log(a), t.util.request({
                url: "entry/wxapp/user",
                data: {
                    op: "user_withdraw",
                    uid: o,
                    name: d,
                    phone: l,
                    price: r,
                    uniacid: e,
                    method: n,
                    form_id: a.detail.formId
                },
                success: function (t) {
                    wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1,
                        success: function () {
                            wx.redirectTo({
                                url: "../recode/index"
                            })
                        }
                    })
                }
            })) : wx.showToast({
                title: "请选择提现方式"
            })
        }
    },
    select: function (t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            selected: e
        })
    }
});