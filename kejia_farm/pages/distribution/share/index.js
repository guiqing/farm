var a = new getApp,
    e = a.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        userInfo: [],
        farmSetData: []
    },
    onLoad: function (t) {
        var n = this,
            r = wx.getStorageSync("kejia_farm_uid");
        api.ajax(
            "farm/api/getQrcode",
            {
                // op: "getQrcode",
                uniacid: e,
                uid: r
            },
            function (a) {
                console.log(a), n.setData({
                    userInfo: a.data.user,
                    farmSetData: wx.getStorageSync("kejia_farm_setData")
                })
            }
        )
    },
    onShareAppMessage: function (a) {
        var e = wx.getStorageSync("kejia_farm_setData"),
            t = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            r = t.data.userInfo;
        return {
            path: "/kejia_farm/pages/HomePage/index/index?&user_uid=" + n,
            success: function (a) {},
            title: e.share_home_title,
            imageUrl: r.qrcode
        }
    }
});