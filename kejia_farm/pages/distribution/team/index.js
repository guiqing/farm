var a = new getApp,
    t = a.siteInfo.uniacid;
Page({
    data: {
        currentId: 1,
        saleData: [],
        page: 1
    },
    onLoad: function (a) {
        var t = this,
            e = (wx.getStorageSync("kejia_farm_uid"), t.data.currentId),
            n = t.data.page;
        t.getSaleData(e, n)
    },
    getSaleData: function (e, n, i) {
        var s = this,
            r = wx.getStorageSync("kejia_farm_uid"),
            d = s.data.saleData;
        a.util.request(
            "farm/api/getSaleTeam",
            {
                op: "getSaleTeam",
                uniacid: t,
                uid: r,
                current: e,
                page: n
            },
            function (a) {
                console.log(a), 1 == i ? a.data.one_sale && (a.data.one_sale.map(function (a) {
                    d.push(a)
                }), s.setData({
                    saleData: d,
                    page: n
                })) : s.setData({
                    saleData: a.data.one_sale,
                    page: 1
                })
            }
        )
    },
    changeId: function (a) {
        var t = a.currentTarget.dataset.id;
        this.getSaleData(t, 1), this.setData({
            currentId: t
        })
    },
    onReachBottom: function (a) {
        var t = this.data.currentId,
            e = parseInt(this.data.page) + 1;
        this.getSaleData(t, e, 1)
    }
});