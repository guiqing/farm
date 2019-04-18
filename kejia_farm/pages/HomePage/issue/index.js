var t = new getApp,
    a = t.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        currentType: 1,
        currentId: 0,
        parentData: [],
        typeData: [],
        setData: [],
        farmSetData: []
    },
    onLoad: function (a) {
        var e = this,
            n = t.siteInfo.uniacid;
        api.ajax('farm/api/getData',{pid:1},function(t){
            e.setData({
                parentData: t.data.parentData,
                typeData: t.data.typeData,
                setData: t.data.setData
            })
        }), t.util.setNavColor(n), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        });
        // t.util.request({
        //     url: "entry/wxapp/problem",
        //     data: {
        //         op: "getData",
        //         uniacid: n
        //     },
        //     success: function (t) {
        //         e.setData({
        //             parentData: t.data.parentData,
        //             typeData: t.data.typeData,
        //             setData: t.data.setData
        //         })
        //     }
        // }), t.util.setNavColor(n), e.setData({
        //     farmSetData: wx.getStorageSync("kejia_farm_setData")
        // })
    },
    changeType: function (e) {
        var n = e.currentTarget.dataset.type,
            r = this;
        api.ajax('farm/api/getData',{
            pid:n  //菜单id
        },function(t){
            r.setData({
                typeData: t.data.typeData
            })
        }), this.setData({
            currentType: n
        });
        // t.util.request({
        //     url: "entry/wxapp/problem",
        //     data: {
        //         op: "changeType",
        //         uniacid: a,
        //         pid: n
        //     },
        //     success: function (t) {
        //         r.setData({
        //             typeData: t.data.typeData
        //         })
        //     }
        // }), this.setData({
        //     currentType: n
        // })
    },
    showDesc: function (t) {
        var a = t.currentTarget.dataset.id,
            e = this.data.typeData;
        this.data.currentId;
        e.map(function (t) {
            t.items.map(function (t) {
                if (a == t.id) {
                    var e = t.isShow;
                    t.isShow = !e, console.log(e)
                } else t.isShow = !1
            })
        }), this.setData({
            typeData: e,
            currentId: a
        })
    }
});