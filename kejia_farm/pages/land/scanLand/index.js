var a = new getApp,
    e = a.siteInfo.uniacid;
Page({
    data: {
        mineLand: [],
        sendMine: [],
        lid: "",
        farmSetData: []
    },
    onLoad: function (n) {
        var t = this,
            d = n.lid;
        this.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        }), wx.showLoading({
            title: "玩命加载中..."
        }), a.api.ajax(
            "farm/api/getScanLand",
            {
                // op: "getScanLand",
                action: "land",
                uniacid: e,
                lid: d
            },
            function (a) {
                t.setData({
                    mineLand: a.data.mineLand,
                    sendMine: a.data.landSeed,
                    user: a.data.user,
                    orderData: a.data.orderData
                }), wx.hideLoading()
            }
        )
    },
    goHome: function (a) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index"
        })
    }
});