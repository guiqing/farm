var t = new getApp,
    i = t.siteInfo.uniacid;
wx.getStorageSync("kejia_farm_uid");
var api=require("../../../../utils/api.js");
Page({
    data: {
        click: !0,
        isShow: !1,
        distributionSet: {
            distribution_agreement:"1.协议测试↵1.协议测试↵1.协议测试↵1.协议测试↵1.协议测试1.协议测试↵1.协议测试↵1.协议测试",
            distribution_cover:"https://kejia.cqkejia.com/images/17/2018/07/p6Vd4GdTVv5UTpbJU2KvXkauj9dUA5.png"
        },
        farmSetData: wx.getStorageSync("kejia_farm_setData")
    },
    onLoad: function (a) {
        var e = wx.getStorageSync("kejia_farm_uid");
        e || wx.navigateTo({
            url: "../../login/index"
        });
        return ;
        var n = this;
        t.util.request({
            url: "entry/wxapp/distribution",
            data: {
                op: "apply_become_distribution",
                uniacid: i,
                uid: e
            },
            success: function (t) {
                -1 == t.data.code && wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function (t) {
                        wx.navigateTo({
                            url: "../../login/index"
                        })
                    }
                }), n.setData({
                    farmSetData: wx.getStorageSync("kejia_farm_setData"),
                    distributionSet: t.data.farmSetData
                }), t.data.is_distributor && wx.redirectTo({
                    url: "../index/index"
                })
            }
        }), t.util.setNavColor(i)
    },
    click: function () {
        var t = this.data.click;
        this.setData({
            click: !t
        })
    },
    check: function () {
        this.setData({
            isShow: !0
        })
    },
    preventTouchMove: function () {},
    close: function () {
        this.setData({
            isShow: !1
        })
    },
    formSubmit: function (a) {
       api.toast("该功能即将开放，敬请期待");
       return ;
        var e = this,
            n = a.detail.value.name,
            o = a.detail.value.phone,
            r = wx.getStorageSync("kejia_farm_uid");
        if ("" == n) return wx.showToast({
            title: "请填写姓名"
        }), !1;
        if ("" == o) return wx.showToast({
            title: "请填写手机号"
        }), !1;
        if (0 == e.data.click) return wx.showModal({
            title: "提示",
            content: "请先同意申请协议",
            showCancel: !1
        }), !1;
        var u = a.detail.formId;
       api.ajax(
            "farm/api/apply_distribution",
            {
                op: "apply_distribution",
                uniacid: i,
                name: n,
                phone: o,
                uid: r,
                form_id: u
            },
            function (t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function () {
                        5 == t.data.code ? wx.redirectTo({
                            url: "../index/index"
                        }) : wx.reLaunch({
                            url: "../../user/center/index?is_tarbar=true"
                        })
                    }
                })
            }
        )
    }
});