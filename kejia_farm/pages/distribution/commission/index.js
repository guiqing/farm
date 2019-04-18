var a = new getApp,
    e = a.siteInfo.uniacid;
let api=require("../../../../utils/api.js");
Page({
    data: {
        canPresented: "0.00",
        hadPresented: 0,
        dakuan: 0,
        farmSetData: wx.getStorageSync("kejia_farm_setData")
    },
    onLoad: function (t) {
        var n = this,
            i = wx.getStorageSync("kejia_farm_uid");
        api.ajax(
            "farm/api/getUserSalePrice",
            {
                // op: "getUserSalePrice",
                uid: i,
                uniacid: e
            },
            function (a) {
                n.setData({
                    user: a.data.user
                })
            }
        )
    },
    intoWithdrawRecord: function (a) {
        wx.navigateTo({
            url: "../recode/index"
        })
    }
});