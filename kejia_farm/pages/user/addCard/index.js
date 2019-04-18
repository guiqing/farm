var a = new getApp,
    t = a.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        records: [],
        card_num: "",
        card_pwd: "",
        farmSetData: [],
        icon: []
    },
    onLoad: function (e) {
        return ;
        var d = this,
            n = wx.getStorageSync("kejia_farm_uid");
        0 != n ? (api.ajax(
            "farm/api/getCardRecord",
            {
                // op: "getCardRecord",
                uid: n,
                uniacid: t
            },
            function (a) {
                d.setData({
                    records: a.data.cardData,
                    icon: a.data.icon
                })
            }
        ), a.util.setNavColor(t)) : wx.redirectTo({
            url: "../../login/index"
        }), d.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    submitInfo: function (e) {
        return ;
        var d = wx.getStorageSync("kejia_farm_uid");
        console.log(d);
        var n = e.detail.value.card_num,
            o = e.detail.value.card_pwd;
        if ("" == n) return wx.showToast({
            title: "请填写卡号"
        }), !1;
        if ("" == o) return wx.showToast({
            title: "请填写密码"
        }), !1;
        var r = this;
        api.ajax(
            "farm/api/addCard",
            {
                // op: "addCard",
                uniacid: t,
                uid: d,
                card_num: n,
                card_pwd: o
            },
            function (a) {
                0 == a.data.code ? (wx.showToast({
                    title: "绑定成功"
                }), r.setData({
                    card_num: "",
                    card_pwd: ""
                })) : 1 == a.data.code ? wx.showToast({
                    title: "绑定失败"
                }) : 2 == a.data.code ? wx.showModal({
                    title: "提示",
                    content: "卡号或密码输入错误"
                }) : 3 == a.data.code && wx.showModal({
                    title: "提示",
                    content: "卡号已被绑定"
                })
            }
        )
    },
    onShareAppMessage: function (a) {}
});