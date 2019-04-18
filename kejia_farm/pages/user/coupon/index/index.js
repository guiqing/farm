var t = new getApp,
    a = t.siteInfo.uniacid;
wx.getStorageSync("kejia_farm_uid");

var api=require("../../../../../utils/api.js");
Page({
    data: {
        currenType: 1,
        couponData: [],
        farmSetData: wx.getStorageSync("kejia_farm_setData")
    },
    onLoad: function (e) {
        var n = this,
            o = 1;
        o = e.type ? e.type : n.data.currenType;
        var u = wx.getStorageSync("kejia_farm_uid");
        api.ajax(
            "farm/api/getCouponList",
            {
                // op: "getCouponList",
                uniacid: a,
                type: o,
                uid: u
            },
            function (t) {
                n.setData({
                    couponData: t.data.couponData,
                    currenType: o
                })
            }
        ), t.util.setNavColor(a)
    },
    changeType: function (e) {
        var n = this,
            o = e.currentTarget.dataset.index,
            u = wx.getStorageSync("kejia_farm_uid");
        api.ajax(
            "farm/api/getCouponList",
            {
                // op: "getCouponList",
                uniacid: a,
                type: o,
                uid: u
            },
            function (t) {
                console.log(t), n.setData({
                    couponData: t.data.couponData,
                    currenType: o
                })
            }
        )
    },
    getCoupon: function (e) {
        var n = this,
            o = e.currentTarget.dataset.cid,
            u = n.data.couponData,
            i = wx.getStorageSync("kejia_farm_uid");
        0 != i ? api.ajax(
            "farm/api/getCoupon",
            {
                // op: "getCoupon",
                cid: o,
                uid: i,
                uniacid: a
            },
            function (t) {
                1 == t.data.code ? (wx.showToast({
                    title: "领取成功"
                }), u.map(function (t) {
                    t.id == o && (t.isget = 0)
                }), n.setData({
                    couponData: u
                })) : 2 == t.data.code ? wx.showToast({
                    title: "领取失败"
                }) : 3 == t.data.code ? wx.showToast({
                    title: "已领取过了"
                }) : 4 == t.data.code ? wx.showModal({
                    title: "提示",
                    content: "优惠券已被领完"
                }) : wx.showToast({
                    title: "请稍后重试"
                })
            }
        ) : wx.navigateTo({
            url: "../../../login/index"
        })
    },
    onShow: function (a) {
        t.globalData.uid = wx.getStorageSync("kejia_farm_uid")
    }
});