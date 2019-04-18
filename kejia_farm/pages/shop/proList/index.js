var a = new getApp,
    t = require("../../../utils/util.js");
var api=require("../../../../utils/api.js");
Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: []
    },
    onLoad: function (e) {
        var o = this;
        if (e.type_id) s = e.type_id;
        else var s = 0;
        if (e.goods_name) r = e.goods_name;
        else var r = "";
        var d = a.siteInfo.uniacid;
        api.ajax(
            "farm/api/getGoodsList",
            {
                // op: "getGoodsList",
                type_id: s,
                uniacid: d,
                page:1,
                goods_name: r
            },
            function (a) {
                a.data.goodsData ? o.setData({
                    type_id: s,
                    page:2,
                    goodsData: a.data.goodsData
                }) : o.setData({
                    type_id: s
                }), t.computeHeight(o, a.data.goodsData, 4)
            }
        ), a.util.setNavColor(d), o.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    onPageScroll: function (a) {
        for (var t = this, e = a.scrollTop, o = t.data.arr, s = t.data.tarrHight, r = 0; r < t.data.goodsData.length; r++) s[r] < e + 300 && 0 == o[r] && (o[r] = !0);
        t.setData({
            arr: o,
            scrollTop: e
        })
    },
    sortPro: function (e) {
        var o = this,
            s = e.currentTarget.dataset.name,
            r = e.currentTarget.dataset.rank,
            d = void 0,
            i = "";
        s == this.data.currentType ? (d = !this.data.sort, i = "desc") : (d = !0, i = "asc");
        var n = a.siteInfo.uniacid,
            p = o.data.type_id;
        api.ajax(
            "farm/api/getGoodsList",
            {
                // op: "getGoodsList",
                type_id: p,
                uniacid: n,
                rank: r,
                page: 1,
                rank_type: i
            },
            function (a) {
                a.data.goodsData && o.setData({
                    goodsData: a.data.goodsData
                })
            }
        ), this.setData({
            currentType: s,
            sort: d
        }), t.computeHeight(o, o.data.goodsData, 4), t.returnTop()
    },
    onReachBottom: function (t) {
        var e = this,
            o = e.data.type_id,
            s = a.siteInfo.uniacid,
            r = e.data.page,
            d = e.data.goodsData;
        api.ajax(
            "farm/api/getGoodsList",
            {
                // op: "getGoodsList",
                type_id: o,
                uniacid: s,
                page: r
            },
            function (a) {
                if (a.data.goodsData) {
                    for (var t = a.data.goodsData, s = 0; s < t.length; s++) d.push(t[s]);
                    e.setData({
                        type_id: o,
                        goodsData: d,
                        page: parseInt(r) + 1
                    })
                }
            }
        )
    },
    intoGoodsDetail: function (a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        })
    },
    onShareAppMessage: function () {}
});