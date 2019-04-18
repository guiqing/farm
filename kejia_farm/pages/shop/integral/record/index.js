var a = new getApp;
var api=require("../../../../../utils/api.js");
Page({
    data: {
        recordData: [],
        page: 2,
        sign_title: ""
    },
    onLoad: function (t) {
        var n = this,
            e = a.siteInfo.uniacid,
            o = wx.getStorageSync("kejia_farm_uid");
        api.ajax(
             "farm/api/getRecord",
            {
                // op: "getRecord",
                uniacid: e,
                page:1,
                uid: o
            },
            function (a) {
                n.setData({
                    recordData: a.data.recordData
                })
            }
        ), a.util.setNavColor(e)
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {
        var t = this,
            n = a.siteInfo.uniacid,
            e = wx.getStorageSync("kejia_farm_uid"),
            o = t.data.page,
            i = t.data.recordData;
        api.ajax({
            url: "farm/api/getRecord",
            data: {
                // op: "getRecord",
                uniacid: n,
                uid: e,
                page: o
            },
            success: function (a) {
                if (a.data.recordData) {
                    for (var n = a.data.recordData, e = 0; e < n.length; e++) i.push(n[e]);
                    t.setData({
                        recordData: i,
                        page: parseInt(o) + 1
                    })
                }
            }
        })
    },
    onShareAppMessage: function () {}
});