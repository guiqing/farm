var t = new getApp,
    a = t.siteInfo.uniacid;
Page({
    data: {
        SystemInfo: t.globalData.sysData,
        isIphoneX: t.globalData.isIphoneX,
        page: 1,
        project: [],
        farmSetData: [],
        currentIndex: 1,
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1,
        isContent: !0
    },
    onLoad: function (t) {
        var a = !1;
        t.is_tarbar && (a = t.is_tarbar);
        var e = wx.getStorageSync("kejia_farm_setData");
        this.setData({
            farmSetData: e,
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: a
        }), this.getProjectData(1, 1, 0)
    },
    getProjectData: function (e, r, n) {
        var i = this,
            o = i.data.project,
            s = t.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
        t.util.request({
            url: s,
            data: {
                op: "getProject",
                uniacid: a,
                page: r,
                current: e
            },
            success: function (t) {
                if (t.data.project) {
                    var a = t.data.project;
                    1 == n ? a.map(function (t) {
                        o.push(t)
                    }) : (o = a, r = 1), wx.stopPullDownRefresh(), i.setData({
                        project: o,
                        page: r
                    })
                } else 1 != n && i.setData({
                    isContent: !1
                })
            }
        })
    },
    onPullDownRefresh: function (t) {
        var a = this.data.currentIndex;
        this.getProjectData(a, 1, 0)
    },
    intoProjectDetail: function (t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../prodetail/index?pid=" + a
        })
    },
    changeIndex: function (t) {
        var a = t.currentTarget.dataset.index;
        this.getProjectData(a, 1, 0), this.setData({
            currentIndex: a
        })
    },
    onReachBottom: function (t) {
        var a = parseInt(this.data.page) + 1,
            e = this.data.currentIndex;
        this.getProjectData(e, a, 1)
    },
    onShareAppMessage: function (t) {}
});