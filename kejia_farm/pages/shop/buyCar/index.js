var t = new getApp;
var api=require("../../../../utils/api.js");
Page({
    data: {
        SystemInfo: t.globalData.sysData,
        buyList: [],
        checkAll: !1,
        sumPrice: 0,
        cart_id: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1,
        height: 0
    },
    onLoad: function (a) {
        var i = this,
            e = wx.getStorageSync("kejia_farm_uid"),
            c = t.siteInfo.uniacid,
            n = !1;
        a.is_tarbar && (n = a.is_tarbar);
        var u = 0,
            r = t.globalData.sysData;
        console.log(r), u = n ? r.model.indexOf("iPhone X") > -1 ? 162 : 100 : r.model.indexOf("iPhone X") > -1 ? 62 : 0, i.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: n,
            height: u
        }), 0 != e ? api.ajax(
            "farm/api/cartList",
            {
                // op: "cartList",
                uid: e,
                uniacid: c,
                page:0
            },
            function (t) {
                i.setData({
                    buyList: t.data.cartData,
                    page: 1
                })
            }
        ) : wx.redirectTo({
            url: "../../login/index"
        }), t.util.setNavColor(c)
    },
    reduceNum: function (a) {
        var i = this,
            e = a.currentTarget.dataset.id,
            c = wx.getStorageSync("kejia_farm_uid"),
            n = t.siteInfo.uniacid,
            u = i.data.buyList;
        api.ajax(
            "farm/api/reducuCount",
            {
                // op: "reducuCount",
                uid: c,
                uniacid: n,
                id: e
            },
            function (t) {
                if (1 == t.data.code)
                    for (var a = 0; a < u.length; a++) u[a].id == e && (t.data.count ? u[a].count = t.data.count : u.splice(a, 1));
                else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: u
                })
            }
        )
    },
    addNum: function (a) {
        var i = this,
            e = a.currentTarget.dataset.id,
            c = wx.getStorageSync("kejia_farm_uid"),
            n = t.siteInfo.uniacid,
            u = i.data.buyList;
        api.ajax(
            "farm/api/addCount",
            {
                // op: "addCount",
                uid: c,
                uniacid: n,
                id: e
            },
            function (t) {
                if (1 == t.data.code)
                    for (var a = 0; a < u.length; a++) u[a].id == e && (u[a].count = t.data.count);
                else wx.showToast({
                    title: "操作失败"
                });
                i.setData({
                    buyList: u
                })
            }
        )
    },
    checked: function (t) {
        var a = this,
            i = t.currentTarget.dataset.id,
            e = 0,
            c = a.data.cart_id;
        a.data.buyList.map(function (t) {
            if (t.id == i)
                if (t.check = !t.check, t.check) c.push(i);
                else
                    for (var a = 0; a < c.length; a++) c[a] == i && c.splice(a, 1);
            e += t.price * t.count
        }), a.setData({
            buyList: a.data.buyList
        }), a.sumPrice(), e == a.data.sumPrice ? a.setData({
            checkAll: !0
        }) : a.setData({
            checkAll: !1
        })
    },
    sumPrice: function () {
        var t = this,
            a = 0;
        t.data.buyList.map(function (t) {
            t.goodsStock >= t.count && t.check && (a += t.count * t.price)
        }), t.setData({
            sumPrice: a.toFixed(2)
        })
    },
    checkAll: function () {
        for (var t = this, a = t.data.buyList, i = new Array, e = 0; e < a.length; e++) a[e].goodsStock > 0 && i.push(a[e].id);
        t.data.buyList.map(function (a) {
            t.data.checkAll ? a.check = !1 : a.check = !0
        }), t.setData({
            checkAll: !t.data.checkAll,
            buyList: t.data.buyList,
            cart_id: i
        }), t.sumPrice()
    },
    deleteItem: function (a) {
        var i = this,
            e = a.currentTarget.dataset.id,
            c = wx.getStorageSync("kejia_farm_uid"),
            n = t.siteInfo.uniacid;
        i.data.buyList;
        i.data.buyList.map(function (t, a) {
            t.id == e && i.data.buyList.splice(a, 1)
        }), i.setData({
            buyList: i.data.buyList
        }), 0 == i.data.buyList.length && i.setData({
            checkAll: !1
        }), api.ajax(
            "farm/api/deleteCart",
            {
                // op: "deleteCart",
                uid: c,
                uniacid: n,
                id: e
            },
            function (t) {
                1 == t.data.code ? wx.showToast({
                    title: "已删除"
                }) : wx.showToast({
                    title: "操作失败"
                })
            }
        ), i.sumPrice()
    },
    intoJieSuan: function (t) {
        var a = this.data.cart_id,
            i = a.join("_");
        "" == a || 0 == a.length ? wx.showToast({
            title: "请选择商品"
        }) : wx.navigateTo({
            url: "../confrimOrder/index?cart_id=" + i
        })
    },
    onReachBottom: function (a) {
        var i = this,
            e = wx.getStorageSync("kejia_farm_uid"),
            c = t.siteInfo.uniacid,
            n = i.data.page,
            u = i.data.cartData;
        api.ajax(
            "farm/api/cartList",
            {
                // op: "cartList",
                uid: e,
                uniacid: c,
                page: n
            },
            function (t) {
                if ("" != t.data.cartData) {
                    for (var a = t.data.cartData, e = 0; e < a.length; e++) u.push(a[e]);
                    i.setData({
                        buyList: u,
                        page: parseInt(n) + 1
                    })
                }
            }
        )
    },
    goBuyGoods: function (t) {
        wx.navigateTo({
            url: "../index/index"
        })
    }
});