var a = new getApp,
    t = a.siteInfo.uniacid;
let api =require('../../../../utils/api.js')
Page({
    data: {
        lid: "",
        mineLand: [],
        sendMine: [],
        landStatus: [],
        scrollLeft: 0,
        isShow: !1,
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        icon: [],
        is_loading: !0,
        is_show_status: !1,
        is_show_gain_dialog: !1,
        gainSeed: [],
        menu:[{img:"/kejia_farm/images/bb.png",name:"背包",id:"1",method:"intoBag"},
            {img:"/kejia_farm/images/bz.png",name:"播种",id:"2",method:"toSeed"},
            {img:"/kejia_farm/images/cc.png",name:"除草",id:"3",method:"weeding"},
            {img:"/kejia_farm/images/sc.png",name:"杀虫",id:"4",method:"killVer"},
            {img:"/kejia_farm/images/sf.png",name:"施肥",id:"5",method:"fertilization"},
            {img:"/kejia_farm/images/js.png",name:"浇水",id:"6",method:"watering"},
            {img:"/kejia_farm/images/js.png",name:"气候",id:"7",method:""},
            {img:"/kejia_farm/images/js.png",name:"更多",id:"8",method:"intoFriend"}],
        img:["/kejia_farm/images/i0.png",
        "/kejia_farm/images/i1.png",
        "/kejia_farm/images/i2.png",
        "/kejia_farm/images/i3.png",
        "/kejia_farm/images/i4.png",
        "/kejia_farm/images/i4.png",
        "/kejia_farm/images/i5.png"]
    },
    onLoad: function (t) {
        var e = this,
            i = t.lid,
            n = a.siteInfo.uniacid,
            d = wx.getStorageSync("kejia_farm_uid"),
            o = wx.getStorageSync("kejia_farm_setData");
        wx.showLoading({
            title: "玩命加载中..."
        }), a.api.ajax(
            "farm/api/getMineLandDetail",
            {
                // op: "getMineLandDetail",
                action: "land",
                uid: d,
                uniacid: n,
                id: i
            },
            function (a) {
                e.setData({
                    mineLand: a.data,
                    // mineLand: a.data.mineLand,
                     lid: a.data.lid
                    // sendMine: a.data.landSeed,
                    // icon: a.data.icon
                }), wx.hideLoading()
            }
        ), this.videoContext = wx.createVideoContext("myVideo", this), a.util.setNavColor(n), this.setData({
            farmSetData: o
        })
    },
    getLandDetail: function (e) {
        var i = this,
            n = wx.getStorageSync("kejia_farm_uid");
        a.api.ajax(
            "farm/api/getMineLandDetail",
            {
                // op: "getMineLandDetail",
                action: "land",
                uid: n,
                uniacid: t,
                lid: e
            },
            function (a) {
                i.setData({
                    mineLand: a.data.mineLand,
                    lid: e,
                    sendMine: a.data.landSeed,
                    icon: a.data.icon
                })
            }
        )
    },
    getSeed: function (a) {
        var t = a.currentTarget.dataset.seedid,
            e = this.data.mineLand.id;
        wx.navigateTo({
            url: "../confirm_order/index?seed_id=" + t + "&mine_land_id=" + e
        })
    },
    showVideo: function () {
        this.setData({
            isShow: !0
        }), this.videoContext.play()
    },
    hiddenVideo: function () {
        this.setData({
            isShow: !1
        }), this.videoContext.pause()
    },
    LookImg: function (a) {
        for (var t = this.data.landStatus, e = a.currentTarget.dataset.id, i = (a.currentTarget.dataset.index, new Array), n = 0; n < t.length; n++)
            if (t[n].id == e) {
                i = t[n].src;
                break
            } wx.previewImage({
            urls: i
        })
    },
    watering: function (t) {
        var e = this,
            i = e.data.mineLand,
            n = wx.getStorageSync("kejia_farm_uid"),
            d = a.siteInfo.uniacid,
            o = t.detail.formId;
        a.api.ajax(
            "farm/api/watering",
            {
                // op: "watering",
                control: "control",
                uniacid: d,
                uid: n,
                lid: i.id,
                web_did: i.deviceInfo.device_num,
                formId: o
            },
            function (a) {
                (e.setData({
                    close_type: 1
                }), e.countDown(i.deviceInfo.device_num, 1))
            }
        )
    },
    fertilization: function (t) {
        var e = this,
            i = e.data.mineLand,
            n = wx.getStorageSync("kejia_farm_uid"),
            d = a.siteInfo.uniacid,
            o = t.detail.formId;
        a.api.ajax(
            "farm/api/fertilization",
            {
                // op: "fertilization",
                control: "control",
                uniacid: d,
                uid: n,
                lid: i.id,
                web_did: i.deviceInfo.device_num,
                formId: o
            },
            function (a) {
                1 == a.data.code ? (e.setData({
                    close_type: 2
                }), e.countDown(i.deviceInfo.device_num, 2)) : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                })
            }
        )
    },
    killVer: function (t) {
        var e = this,
            i = e.data.mineLand,
            n = wx.getStorageSync("kejia_farm_uid"),
            d = a.siteInfo.uniacid,
            o = t.detail.formId;
        a.api.ajax(
            "farm/api/killVer",
            {
                // op: "killVer",
                control: "control",
                uniacid: d,
                uid: n,
                lid: i.id,
                web_did: i.deviceInfo.device_num,
                formId: o
            },
            function (a) {
                1 == a.data.code ? (e.setData({
                    close_type: 3
                }), e.countDown(i.deviceInfo.device_num, 3)) : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                })
            }
        )
    },
    weeding: function (t) {
        var e = this.data.mineLand,
            i = wx.getStorageSync("kejia_farm_uid"),
            n = a.siteInfo.uniacid,
            d = t.detail.formId;
        a.api.ajax(
            "farm/api/weeding",
            {
                // op: "weeding",
                control: "control",
                uniacid: n,
                uid: i,
                lid: e.id,
                formId: d
            },
            function (a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                })
            }
        )
    },
    countDown: function (a, t) {
        var e = this,
            i = 30;
        e.setData({
            isLoading: !0,
            countDownNum: 30
        }), e.setData({
            timer: setInterval(function () {
                i--, e.setData({
                    countDownNum: i
                }), 0 == i && (clearInterval(e.data.timer), console.log("995"), e.setData({
                    isLoading: !1
                }), e.closeDevice(a, t))
            }, 1e3)
        })
    },
    closeDevice: function (t, e) {
        var i = this,
            n = a.siteInfo.uniacid,
            d = wx.getStorageSync("kejia_farm_uid");
        a.api.ajax(
            "farm/api/closeDevice",
            {
                // op: "closeDevice",
                control: "control",
                web_did: t,
                close_type: e,
                uniacid: n,
                uid: d
            },
            function (a) {
                console.log(a), wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), i.setData({
                    close_type: 0
                })
            }
        )
    },
    submitData: function (a) {
        console.log(a)
    },
    onUnload: function (a) {
        var t = this,
            e = this.data.close_type;
        if (1 == e || 2 == e || 3 == e) {
            var i = t.data.mineLand.deviceInfo.device_num;
            t.closeDevice(i, e), clearInterval(t.data.timer)
        }
    },
    play: function (a) {
        this.setData({
            is_loading: !1
        })
    },
    lookStatusInfo: function (e) {
        if (this.setData({
                is_show_status: !this.data.is_show_status
            }), this.data.is_show_status) {
            var i = this,
                n = e.currentTarget.dataset.seedid,
                d = e.currentTarget.dataset.lid,
                o = e.detail.formId,
                s = wx.getStorageSync("kejia_farm_uid");
            wx.showLoading({
                title: "玩命加载中..."
            }), a.api.ajax(
                "farm/api/getSeedStatusList",
                {
                    // op: "getSeedStatusList",
                    action: "land",
                    uniacid: t,
                    seed_id: n,
                    lid: d,
                    formid: o,
                    uid: s
                },
                function (a) {
                    i.setData({
                        landStatus: a.data.landStatus
                    }), wx.hideLoading()
                }
            )
        }
    },
    toSeed: function (a) {
        // api.alert("该功能即将开放，敬请期待");
        // return ;
        var t = this.data.lid,
            e = this.data.mineLand;
        if (e.residue_area <= 0) return wx.showModal({
            title: "提示",
            content: "当前地块面积不足~",
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "/kejia_farm/pages/land/seedList/index?lid=" + t + "&can_count=" + e.residue_area
        })
    },
    pickSeed: function (a) {
        var t = this;
        if (this.setData({
                is_show_gain_dialog: !this.data.is_show_gain_dialog
            }), this.data.is_show_gain_dialog) {
            var e = a.currentTarget.dataset.seedid;
            this.data.sendMine.map(function (a) {
                e == a.id && t.setData({
                    gainSeed: a
                })
            })
        }
    },
    gainSeed: function (e) {
        var i = this,
            n = wx.getStorageSync("uid"),
            d = e.currentTarget.dataset.seedid,
            o = e.detail.formId;
        a.api.ajax(
            "farm/api/gainSeed",
            {
                // op: "gainSeed",
                action: "land",
                uniacid: t,
                seed_id: d,
                uid: n,
                formid: o
            },
            function (a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function (a) {
                        var t = i.data.lid;
                        i.getLandDetail(t), i.setData({
                            is_show_gain_dialog: !i.data.is_show_gain_dialog
                        })
                    }
                })
            }
        )
    },
    intoBag: function (a) {
        var t = a.detail.formId;
        wx.navigateTo({
            url: "../seedBag/index?formid=" + t
        })
    },
    intoFriend:function(a){
        // wx.navigateTo({
        //     url: "/kejia_friend/pages/index/index"
        // })
    }
});