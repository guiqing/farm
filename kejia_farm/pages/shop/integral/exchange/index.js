var a = new getApp,
    t = require("../../../../utils/util.js");
var api=require("../../../../../utils/api.js");
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        types: [],
        exchanges: [],
        userData: [],
        slideData: [],
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        farmSetData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function (e) {
        var i = this,
            r = wx.getStorageSync("kejia_farm_uid"),
            n = a.siteInfo.uniacid,
            o = !1;
        e.is_tarbar && (o = e.is_tarbar), i.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: o
        }), api.ajax(
            "farm/api/getIntrgralData",
            {
                op: "getIntrgralData",
                uid: r,
                uniacid: n
            },
            function (a) {
                i.setData({
                    types: a.data.typeData,
                    userData: a.data.userData,
                    exchanges: a.data.recommendData,
                    slideData: a.data.slideData
                }), t.computeHeight(i, a.data.recommendData, 2)
            }
        ), a.util.setNavColor(n)
    },
    exchanges: function () {},
    onPageScroll: function (a) {
        for (var t = this, e = a.scrollTop, i = t.data.arr, r = t.data.tarrHight, n = 0; n < t.data.exchanges.length; n++) r[n] < e && 0 == i[n] && (i[n] = !0);
        t.setData({
            arr: i,
            scrollTop: e
        })
    },
    intoDetail: function (a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../exchangedetails/index?goods_id=" + t
        })
    },
    intoExchangeList: function (a) {
        var t = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "../exchange_list/index?type_id=" + t
        })
    },
    intoIntegralRecord: function (a) {
        wx.navigateTo({
            url: "../orderList/index"
        })
    },
    intoDetailSlide: function (a) {
        var t = a.currentTarget.dataset.linktype,
            e = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../../land/landList/index"
        }) : 2 == t ? 0 != e ? wx.navigateTo({
            url: "../../AdoptRules/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../../../live/index"
        }) : 5 == t ? 0 != e ? wx.navigateTo({
            url: "../../prodeteils/index?goodsid=" + e
        }) : wx.navigateTo({
            url: "../../index/index"
        }) : 6 == t ? 0 != e ? wx.navigateTo({
            url: "../../Group/proDetails/index?goods_id=" + e
        }) : wx.navigateTo({
            url: "../../Group/index"
        }) : 8 == t && (0 != e ? wx.navigateTo({
            url: "../../../article/detail/index?aid=" + e
        }) : wx.navigateTo({
            url: "../../../article/index/index"
        }))
    },
    intoIntegral: function (a) {
        wx.navigateTo({
            url: "../record/index"
        })
    }
});