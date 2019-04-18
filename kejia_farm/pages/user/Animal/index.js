var t = new getApp;
var api=require("../../../../utils/api.js");
Page({
    data: {
        currentState: 1,
        adoptData: [],
        page: 1,
        farmSetData: [],
        isContent: !0
    },
    onLoad: function (a) {
        this.getAdoptData(a.current), this.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            currentState: a.current
        }), t.util.setNavColor(t.siteInfo.uniacid)
    },
    getAdoptData: function (a) {
        wx.showLoading({
            title: "玩命加载中"
        });
        var e = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = t.siteInfo.uniacid;
        0 != n ? api.ajax('farm/api/getMyAnimal',{
            // op: "getMyAnimal",
            uid: n,
            // uniacid: i,
            status: a
        },function(t){
            t.data.animalData.length > 0 ? e.data.adoptData = t.data.animalData : e.data.isContent = !1, e.setData({
                adoptData: e.data.adoptData,
                isContent: e.data.isContent
            }), wx.hideLoading()
        }) : wx.redirectTo({
            url: "../../login/index"
        });
        //  t.util.request({
        //     url: "entry/wxapp/animal",
        //     data: {
        //         op: "getMyAnimal",
        //         uid: n,
        //         uniacid: i,
        //         status: a
        //     },
        //     success: function (t) {
        //         t.data.animalData.length > 0 ? e.data.adoptData = t.data.animalData : e.data.isContent = !1, e.setData({
        //             adoptData: e.data.adoptData,
        //             isContent: e.data.isContent
        //         }), wx.hideLoading()
        //     }
        // })
    },
    changeState: function (t) {
        this.setData({
            currentState: t.currentTarget.dataset.state
        }), this.getAdoptData(t.currentTarget.dataset.state)
    },
    intoAdoptDetail: function (t) {
        var a = t.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../../shop/adoptiveState/index?adopt_id=" + a
        })
    },
    onShareAppMessage: function () {},
    gotoBuy: function (t) {
        wx.switchTab({
            url: "../../shop/Adopt/index"
        })
    }
});