var a = new getApp;
let api=require("../../../../../utils/api.js");
Page({
    data: {
        currentState: "1",
        allLands: [],
        currentLand: [],
        page: 1,
        landData: [],
        farmSetData: [],
        currentIndex: "全部",
        is_load: !0
    },
    onLoad: function (t) {
        this.setData({
            currentLand: this.data.allLands
        });
        var n = this,
            e = wx.getStorageSync("kejia_farm_uid"),
            d = a.siteInfo.uniacid;
        n.data.currentState;
        0 != e ? n.getLandData() : wx.redirectTo({
            url: "../../../login/index"
        }), a.util.setNavColor(d), n.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
    },
    getLandData: function () {
        var t = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            // e = a.siteInfo.uniacid,
            d = t.data.currentState;
        api.ajax('farm/api/getMineLand',{
            // op: "getMineLand",
            // action: "land",
            uid: n,
            page:1,
            // uniacid: e,
            current: d
        },function(a){
            a.data.landData.length > 0 ? t.setData({
                landData: a.data.landData,
                is_load: !0
            }) : t.setData({
                is_load: !1
            })
        });
        // a.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         op: "getMineLand",
        //         action: "land",
        //         uid: n,
        //         uniacid: e,
        //         current: d

        //     },
        //     success: function (a) {
        //         a.data.landData.length > 0 ? t.setData({
        //             landData: a.data.landData,
        //             is_load: !0
        //         }) : t.setData({
        //             is_load: !1
        //         })
        //     }
        // })
    },
    changeState: function (a) {
        var t = this,
            n = [],
            e = a.currentTarget.dataset.state;
        t.data.allLands.map(function (a) {
            "1" === e ? n.push(a) : "2" === e ? a.plant.length > 0 && n.push(a) : "3" === e && 0 == a.plant.length && n.push(a)
        }), t.setData({
            currentState: e,
            currentLand: n
        }), t.getLandData()
    },
    intoMineLandDetail: function (a) {
        var t = a.currentTarget.dataset.lid;
        if (2 == a.currentTarget.dataset.landstatus) return wx.showModal({
            title: "提示",
            content: "您的土地已过期",
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "/kejia_farm/pages/land/mineLandDetail/index?lid=" + t
        })
    },
    gotoBuy: function (a) {
        wx.navigateTo({
            url: "../../../land/landList/index"
        })
    },
    onReachBottom: function (t) {
        var n = this,
            e = wx.getStorageSync("kejia_farm_uid"),
            d = a.siteInfo.uniacid,
            i = n.data.currentState,
            r = n.data.page+1,
            u = n.data.landData;
        api.ajax('farm/api/getMineLand',{
            op: "getMineLand",
            uid: e,
            uniacid: d,
            current: i,
            page: r
        },function(a){
            if (a.data.landData) {
                for (var t = a.data.landData, e = 0; e < t.length; e++) u.push(t[e]);
                n.setData({
                    landData: u,
                    page: parseInt(r) + 1
                })
            }
        });
        // a.util.request({
        //     url: "entry/wxapp/land",
        //     data: {
        //         op: "getMineLand",
        //         uid: e,
        //         uniacid: d,
        //         current: i,
        //         page: r
        //     },
        //     success: function (a) {
        //         if (a.data.landData) {
        //             for (var t = a.data.landData, e = 0; e < t.length; e++) u.push(t[e]);
        //             n.setData({
        //                 landData: u,
        //                 page: parseInt(r) + 1
        //             })
        //         }
        //     }
        // })
    },
    intoBag: function (a) {
        var t = a.detail.formId;
        wx.navigateTo({
            url: "/kejia_farm/pages/land/seedBag/index?formid=" + t
        })
    }
});