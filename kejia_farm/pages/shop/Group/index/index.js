var a = new getApp;
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        goodsData: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function (t) {
        var o = this,
            r = (wx.getStorageSync("kejia_farm_uid"), a.siteInfo.uniacid),
            e = !1;
        t.is_tarbar && (e = t.is_tarbar), o.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: e
        }), a.api.ajax(
            "farm/api/getGroupGoods",
            {
                // op: "getGroupGoods",
                uniacid: r,
                page:1
            },
            function (a) {
                o.setData({
                    goodsData: a.data.goodsData,
                    page:2
                })
            }
        ), a.util.setNavColor(r)
    },
    onReachBottom: function (t) {
        var o = this,
            r = (o.data.type_id, wx.getStorageSync("kejia_farm_uid"), a.siteInfo.uniacid),
            e = o.data.page,
            n = o.data.goodsData;
        a.api.ajax(
            "farm/api/getGroupGoods",
            {
                // op: "getGroupGoods",
                uniacid: r,
                page: e
            },
            function (a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, r = 0; r < t.length; r++) n.push(t[r]);
                    o.setData({
                        goodsData: n,
                        page: parseInt(e) + 1
                    })
                }
            }
        )
    },
    intoGroupDetail: function (a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../proDetails/index?goods_id=" + t
        })
    }
});