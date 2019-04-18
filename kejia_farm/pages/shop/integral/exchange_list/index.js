var t = require("../../../../utils/util.js"),
    a = new getApp;
var api=require("../../../../../utils/api.js");
Page({
    data: {
        currentType: "综合",
        sort: !0,
        goodsData: [],
        page: 1,
        type_id: "",
        arr: [],
        scrollTop: 0,
        tarrHight: []
    },
    onLoad: function (e) {
        var o = this,
            s = e.type_id,
            i = a.siteInfo.uniacid;
        api.ajax(
            "farm/api/getGoodsList",
            {
                op: "getGoodsList",
                type_id: s,
                uniacid: i
            },
            function (a) {
                a.data.goodsData ? o.setData({
                    type_id: s,
                    goodsData: a.data.goodsData
                }) : o.setData({
                    type_id: s
                }), t.computeHeight(o, a.data.goodsData, 2)
            }
        ), a.util.setNavColor(i)
    },
    onPageScroll: function (t) {
        for (var a = this, e = t.scrollTop, o = a.data.arr, s = a.data.tarrHight, i = 0; i < a.data.goodsData.length; i++) s[i] < e && 0 == o[i] && (o[i] = !0);
        a.setData({
            arr: o,
            scrollTop: e
        })
    },
    sortPro: function (e) {
        var o = this,
            s = e.currentTarget.dataset.name,
            i = e.currentTarget.dataset.rank,
            r = void 0,
            d = "";
        s == this.data.currentType ? (r = !this.data.sort, d = "desc") : (r = !0, d = "asc");
        var n = a.siteInfo.uniacid,
            u = o.data.type_id;
        api.ajax(
            "farm/api/getGoodsList",
            {
                op: "getGoodsList",
                type_id: u,
                uniacid: n,
                rank: i,
                rank_type: d
            },
            function (t) {
                t.data.goodsData && o.setData({
                    goodsData: t.data.goodsData
                })
            }
        ), this.setData({
            currentType: s,
            sort: r
        }), t.computeHeight(o, o.data.goodsData, 4), t.returnTop()
    },
    onReachBottom: function (t) {
        var e = this,
            o = e.data.type_id,
            s = a.siteInfo.uniacid,
            i = e.data.page,
            r = e.data.goodsData;
        api.ajax(
            "farm/api/getGoodsList",
            {
                type_id: o,
                uniacid: s,
                page: i
            },
            function (t) {
                if (t.data.goodsData) {
                    for (var a = t.data.goodsData, s = 0; s < a.length; s++) r.push(a[s]);
                    e.setData({
                        type_id: o,
                        goodsData: r,
                        page: parseInt(i) + 1
                    })
                }
            }
        )
    },
    intoGoodsDetail: function (t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../exchangedetails/index?goods_id=" + a
        })
    },
    onShareAppMessage: function () {}
});