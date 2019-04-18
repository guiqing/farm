var a = require("../../../../../wxParse/wxParse.js"),
    t = new getApp;
var api=require("../../../../../utils/api.js");
Page({
    data: {
        goodsid: "",
        goodsData: [],
        specItem: [],
        is_show: 1,
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        farmSetData: []
    },
    onLoad: function (e) {
        var s = e.goods_id,
            o = this,
            d = t.siteInfo.uniacid;
        api.ajax(
            "farm/api/getIntegralGoodsDetail",
            {
                op: "getIntegralGoodsDetail",
                uniacid: d,
                goods_id: s
            },
            function (t) {
                o.setData({
                    goodsData: t.data.goodsData,
                    specItem: t.data.specItem,
                    goodsid: s
                }), "" != t.data.goodsData.goods_desc && a.wxParse("article", "html", t.data.goodsData.goods_desc, o, 5)
            }
        ), t.util.setNavColor(d);
        var i = 0;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (i = 68), o.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            bottom: i
        })
    },
    hideModal: function () {
        this.setData({
            is_show: 1
        })
    },
    reduceNum: function () {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        })
    },
    addNum: function () {
        this.setData({
            count: this.data.count + 1
        })
    },
    chooseNum: function (a) {
        this.setData({
            count: a.detail.value
        })
    },
    doExchange: function (a) {
        var t = this,
            e = wx.getStorageSync("kejia_farm_uid");
        if (void 0 != e && 0 != e) {
            var s = t.data.goodsData,
                o = t.data.goodsid,
                d = t.data.count;
            1 == s.is_open_sku ? t.setData({
                is_show: 2
            }) : wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + o + "&count=" + d
            })
        } else wx.navigateTo({
            url: "../../../login/index"
        })
    },
    selectSpec: function (a) {
        for (var e = this, s = t.siteInfo.uniacid, o = e.data.goodsid, d = a.currentTarget.dataset.specid, i = a.currentTarget.dataset.valid, c = e.data.specItem, n = new Array, r = 0; r < c.length; r++) {
            c[r].id == d && (c[r].select_spec = 1);
            for (var u = 0; u < c[r].specVal.length; u++) c[r].id == d && (c[r].specVal[u].select_val = 0), c[r].specVal[u].id == i && (c[r].specVal[u].select_val = 1), 1 == c[r].specVal[u].select_val && n.push(c[r].specVal[u].id)
        }
        var l = n.join(",");
        api.ajax(
            "farm/api/getSpec",
            {
                // op: "getSpec",
                uniacid: s,
                spec_id: l,
                goodsid: o
            },
            function (a) {
                a.data.specVal ? e.setData({
                    price: a.data.specVal.price,
                    spec_src: a.data.specVal.spec_src,
                    spec_id: a.data.specVal.id,
                    specItem: c
                }) : e.setData({
                    specItem: c
                })
            }
        )
    },
    sureGoods: function (a) {
        var t = this,
            e = t.data.goodsid,
            s = t.data.spec_id,
            o = t.data.count;
        if (1 == t.data.goodsData.is_open_sku) {
            if ("" == s && 0 == s.length) return wx.showToast({
                title: "请选择规格"
            }), !1;
            wx.navigateTo({
                url: "../orderConfrim/index?goodsid=" + e + "&spec_id=" + s + "&count=" + o
            })
        } else wx.navigateTo({
            url: "../orderConfrim/index?goodsid=" + e + "&count=" + o
        })
    }
});