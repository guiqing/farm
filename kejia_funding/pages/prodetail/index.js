var t = new getApp,
    a = t.siteInfo.uniacid,
    e = require("../../../wxParse/wxParse.js");
Page({
    data: {
        isShow: !1,
        animationData: {},
        currentId: "",
        success: !1,
        isBuy: !1,
        chooseNum: 1,
        proDetail: [],
        spec: [],
        currentSpec: [],
        farmSetData: [],
        progressList: [],
        funding_set: [],
        bottom: 0
    },
    onLoad: function (i) {
        this.videoContext = wx.createVideoContext("myVideo", this);
        var n = this,
            o = i.pid,
            r = t.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
        t.util.request({
            url: r,
            data: {
                op: "getProDetail",
                uniacid: a,
                pid: o
            },
            success: function (t) {
                n.setData({
                    proDetail: t.data.proDetail,
                    spec: t.data.spec,
                    progressList: t.data.progress,
                    funding_set: t.data.funding_set,
                    currentSpec: t.data.spec[0],
                    currentId: t.data.spec[0].id
                }), "" != t.data.proDetail.project_detail && e.wxParse("article", "html", t.data.proDetail.project_detail, n, 5);
                var a = wx.createAnimation({
                    transformOrigin: "50% 50%",
                    duration: 1e3,
                    timingFunction: "ease",
                    delay: 0
                });
                a.width(n.data.proDetail.progress + "%").step({
                    duration: 1e3
                }), n.setData({
                    animationData: a.export()
                })
            }
        });
        var s = 0;
        t.globalData.sysData.model.indexOf("iPhone X") > -1 && (s = 68);
        var u = wx.getStorageSync("kejia_farm_setData");
        this.setData({
            farmSetData: u,
            bottom: s
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
    chooseLevel: function (t) {
        var a = this,
            e = t.currentTarget.dataset.id;
        this.data.spec.map(function (t) {
            t.id == e && a.setData({
                currentSpec: t
            })
        }), this.setData({
            currentId: e
        })
    },
    buyNow: function () {
        this.setData({
            isBuy: !0
        })
    },
    close: function () {
        this.setData({
            isBuy: !1
        })
    },
    preventTouchMove: function () {},
    reduce: function () {
        var t = this.data.chooseNum;
        if (1 === t) return !1;
        t > 1 && this.setData({
            chooseNum: t - 1
        })
    },
    add: function () {
        var t = this.data.chooseNum;
        this.setData({
            chooseNum: t + 1
        })
    },
    goHome: function (t) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index?is_tarbar=true"
        })
    },
    sureSelect: function (t) {
        var a = this.data.currentSpec,
            e = wx.getStorageSync("kejia_farm_uid"),
            i = this.data.chooseNum;
        if (e)
            if ("" != a) {
                var n = JSON.stringify(a),
                    o = this.data.proDetail;
                wx.navigateTo({
                    url: "../confrimOrder/index?count=" + i + "&spec=" + n + "&pid=" + o.id
                })
            } else wx.showToast({
                title: "请选择档位"
            });
        else wx.navigateTo({
            url: "../../login/index"
        })
    },
    progressHistory: function (t) {
        var a = this.data.proDetail.id;
        wx.navigateTo({
            url: "../progress/index?pid=" + a
        })
    },
    onShareAppMessage: function (t) {
        var a = this.data.proDetail;
        return {
            path: "kejia_funding/pages/prodetail/index?pid=" + a.id,
            success: function (t) {},
            title: a.project_name
        }
    },
    intoReturnDetail: function (t) {
        wx.navigateTo({
            url: "../return/index"
        })
    },
    intoContract: function (t) {
        wx.navigateTo({
            url: "../contract/index"
        })
    }
});