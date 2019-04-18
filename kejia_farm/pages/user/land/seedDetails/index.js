var a = new getApp;
var api=require("../../../../../utils/api.js");
Page({
    data: {
        plant: [],
        farmSetData: []
    },
    onLoad: function (t) {
        var e = this,
            i = a.siteInfo.uniacid,
            n = t.sid;
        wx.showLoading({
            title: "玩命加载中..."
        }), api.ajax('farm/api/senddetail',{
            id: n
        },function(a){
            e.setData({
                plant: a.data[0]
            }), wx.hideLoading()
        }), a.util.setNavColor(i), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        });
        // a.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         op: "getSendDetail",
        //         action: "land",
        //         uniacid: i,
        //         sid: n
        //     },
        //     success: function (a) {
        //         e.setData({
        //             plant: a.data.sendDetail
        //         }), wx.hideLoading()
        //     }
        // }), a.util.setNavColor(i), e.setData({
        //     farmSetData: wx.getStorageSync("kejia_farm_setData")
        // })
    }
});