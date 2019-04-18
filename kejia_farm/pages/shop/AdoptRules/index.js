var a = require("../../../../wxParse/wxParse.js"),
    api=require("../../../../utils/api.js"),
    t = new getApp;
Page({
    data: {
        state: !1,
        count: 1,
        animalData: [],
        aid: "",
        sku_name: "",
        aboutData: [],
        farmSetData: [],
        isShow: !1,
        is_loading: !0
    },
    preventTouchMove: function () {},
    onLoad: function (n) {
        var i = this,
            e = n.aid,
            o = t.siteInfo.uniacid;
        var data={
          id:e  
        };
        api.ajax('farm/api/animaldetail',data,function(t){
            i.setData({
                animalData: t.data.animalData,
                aid: e,
                aboutData: t.data.aboutData
            }), "" != t.data.animalData.detail_desc && a.wxParse("article", "html", t.data.animalData.detail_desc, i, 5)
        });
        // t.util.request({
        //     url: "entry/wxapp/animal",
        //     data: {
        //         op: "animalDetail",
        //         aid: e,
        //         uniacid: o
        //     },
        //     success: function (t) {
        //         i.setData({
        //             animalData: t.data.animalData,
        //             aid: e,
        //             aboutData: t.data.aboutData
        //         }), "" != t.data.animalData.detail_desc && a.wxParse("article", "html", t.data.animalData.detail_desc, i, 5)
        //     }
        // });
        var u = n.user_uid,
            s = wx.getStorageSync("kejia_farm_uid");
        t.loginBindParent(u, s), void 0 != u && 0 != u && i.setData({
            user_uid: u
        });
        var d = 0;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (d = 68), i.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            bottom: d
        }), t.util.setNavColor(o)
    },
    onShow: function (a) {
        var n = this.data.user_uid,
            i = wx.getStorageSync("kejia_farm_uid");
        t.loginBindParent(n, i), void 0 != n && 0 != n && that.setData({
            user_uid: n
        })
    },
    showMode: function () {
        var a = wx.getStorageSync("kejia_farm_uid");
        void 0 != a && 0 != a ? this.setData({
            state: !0
        }) : wx.navigateTo({
            url: "../../login/index"
        })
    },
    hideModal: function () {
        this.setData({
            state: !1
        })
    },
    reduceNum: function () {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        })
    },
    addNum: function () {
        var a = this,
            t = a.data.count,
            n = a.data.animalData;
        parseInt(t) + 1 > n.count ? wx.showToast({
            title: "库存不足"
        }) : a.setData({
            count: parseInt(t) + 1
        })
    },
    chooseNum: function (a) {
        this.setData({
            chooseNum: a.detail.value
        })
    },
    goHome: function (a) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index?is_tarbar=true"
        })
    },
    doCall: function (a) {
        var t = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        })
    },
    sureAnimal: function (a) {
        var n = this,
            i = n.data.aid,
            e = n.data.animalData,
            o = n.data.count;
        wx.getStorageSync("kejia_farm_uid"), t.siteInfo.uniacid;
        parseInt(o) + 1 > e.count ? wx.showToast({
            title: "库存不足"
        }) : (wx.setStorageSync("kejia_farm_buy_animal", e), wx.navigateTo({
            url: "../confirmAdopt/index?count=" + o + "&aid=" + i
        }))
    },
    onShareAppMessage: function () {
        var a = this,
            t = wx.getStorageSync("kejia_farm_uid");
        return {
            path: "/kejia_farm/pages/shop/AdoptRules/index?aid=" + a.data.animalData.id + "&user_uid=" + t,
            success: function (a) {},
            title: a.data.animalData.animal_name,
            imageUrl: a.data.animalData.animal_src
        }
    },
    showVideo: function () {
        this.setData({
            isShow: !0
        })
    },
    hideVideo: function () {
        this.setData({
            isShow: !1
        })
    },
    play: function (a) {
        this.setData({
            is_loading: !1
        })
    }
});