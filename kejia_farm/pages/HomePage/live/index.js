var a = new getApp;
var api=require("../../../../utils/api.js");
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        playState: !0,
        LiveIndex: 0,
        farmlands: [],
        liveData: [],
        liveType: [],
        recommendData: [],
        scrollLeft: 0,
        farmSetData: [],
        height: 0,
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1,
        is_loading: !0
    },
    onLoad: function (t) {
        var e = this,
            i = !1;
        t.is_tarbar && (i = t.is_tarbar), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: i
        }), e.videoContext = wx.createVideoContext("myVideo", this);
        var n = a.siteInfo.uniacid;
        api.ajax('farm/api/getLiveData',{
            type_id: 0
        },function (a) {
            new Array;
            a.data.liveData && a.data.liveData[0], e.setData({
                farmland: a.data.liveData,
                liveType: a.data.liveType,
                LiveIndex: 0,
                recommendData: a.data.liveData[0]
            })
        }), a.util.setNavColor(n), wx.getSystemInfo({
            success: function (a) {
                var t = void 0,
                    i = a.windowWidth;
                t = a.windowHeight - i / 750 * 215 - 225, e.setData({
                    height: t
                })
            }
        })
        // a.util.request({
        //     url: "entry/wxapp/live",
        //     data: {
        //         op: "getLiveData",
        //         uniacid: n
        //     },
        //     success: function (a) {
        //         new Array;
        //         a.data.liveData && a.data.liveData[0], e.setData({
        //             farmland: a.data.liveData,
        //             liveType: a.data.liveType,
        //             LiveIndex: 0,
        //             recommendData: a.data.liveData[0]
        //         })
        //     }
        // }), a.util.setNavColor(n), wx.getSystemInfo({
        //     success: function (a) {
        //         var t = void 0,
        //             i = a.windowWidth;
        //         t = a.windowHeight - i / 750 * 215 - 225, e.setData({
        //             height: t
        //         })
        //     }
        // })
    },
    changTab: function (t) {
        var e = this,
            i = t.currentTarget.dataset.index,
            n = (e.data.liveType, a.siteInfo.uniacid),
            r = t.currentTarget.dataset.typename;
        api.ajax('farm/api/getLiveTypeData',{
            type_id: i 
        },function (a) {
            e.data.liveType.map(function (a, t) {
                a.name === r && (t <= 1 ? e.setData({
                    scrollLeft: 0
                }) : t > 1 && t <= e.data.liveType.length - 2 && e.setData({
                    scrollLeft: 100 * (t - 1)
                }))
            });
            var t = new Array;
            a.data.liveData && (t = a.data.liveData[0]), e.setData({
                farmland: a.data.liveData,
                LiveIndex: i,
                recommendData: t
            })
        })
        // a.util.request({
        //     url: "entry/wxapp/live",
        //     data: {
        //         op: "getLiveTypeData",
        //         uniacid: n,
        //         type_id: i
        //     },
        //     success: function (a) {
        //         e.data.liveType.map(function (a, t) {
        //             a.name === r && (t <= 1 ? e.setData({
        //                 scrollLeft: 0
        //             }) : t > 1 && t <= e.data.liveType.length - 2 && e.setData({
        //                 scrollLeft: 100 * (t - 1)
        //             }))
        //         });
        //         var t = new Array;
        //         a.data.liveData && (t = a.data.liveData[0]), e.setData({
        //             farmland: a.data.liveData,
        //             LiveIndex: i,
        //             recommendData: t
        //         })
        //     }
        // })
    },
    chooseLive: function (a) {
        var t = this,
            e = a.currentTarget.dataset.id,
            i = t.data.recommendData,
            n = !0,
            r = void 0;
        if (i.id == e) t.data.playState ? (t.videoContext.pause(), t.setData({
            playState: !1
        })) : (t.videoContext.play(), t.setData({
            playState: !0
        }));
        else {
            for (var s = t.data.farmland, o = 0; o < s.length; o++) e == s[o].id && (i.src == s[o].src && (n = !1), r = s[o]);
            t.setData({
                recommendData: r,
                playState: !0,
                is_loading: n
            })
        }
    },
    statechange: function (a) {
        console.log("live-player code:", a.detail.code)
    },
    play: function (a) {
        this.setData({
            playState: !0,
            is_loading: !1
        })
    },
    pause: function (a) {
        this.setData({
            playState: !1
        })
    },
    bindwaiting: function (a) {
        wx.showToast({
            title: "连接成功",
            icon: "loading"
        }), this.setData({
            is_loading: !1
        })
    }
});