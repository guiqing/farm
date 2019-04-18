var a = new getApp,
    t = a.siteInfo.uniacid;
Page({
    data: {
        farmSetData: wx.getStorageSync("kejia_farm_setData"),
        userInfo: []
    },
    onLoad: function (n) {
        var e = this,
            o = wx.getStorageSync("kejia_farm_uid");
        o ? a.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "getWallet",
                uniacid: t,
                uid: o
            },
            success: function (a) {
                console.log(a), e.setData({
                    userInfo: a.data.userInfo,
                    farmSetData: wx.getStorageSync("kejia_farm_setData")
                })
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        }), a.util.setNavColor(t)
    },
    intoCash: function (a) {
        wx.navigateTo({
            url: "../cash/cash"
        })
    },
    intoRecord: function (a) {
        wx.navigateTo({
            url: "../recode/index"
        })
    },
    intoDetail: function (a) {
        wx.navigateTo({
            url: "../wallet_detail/index"
        })
    },
    onReady: function () {},
    onShow: function () {}
});