var t = new getApp,
    a = t.siteInfo.uniacid;
Page({
    data: {
        SystemInfo: t.globalData.sysData,
        isIphoneX: t.globalData.isIphoneX,
        activeList: [],
        page: 1,
        activeSet: [],
        currentIndex: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1,
        isContent: !0
    },
    onLoad: function (e) {
        var i = !1;
        e.is_tarbar && (i = e.is_tarbar);
        var n = wx.getStorageSync("kejia_farm_setData");
        this.setData({
            farmSetData: n,
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: i
        }), this.getActiveData(1, 1, 0), t.util.setNavColor(a)
    },
    getActiveData: function (e, i, n) {
        wx.showLoading({
            title: "玩命加载中...."
        });
        var r = this,
            s = r.data.activeList,
            c = t.util.url("entry/wxapp/active") + "m=kejia_farm_plugin_active";
        t.api.ajax(
            'farm/api/getActiveList',
           {
                // op: "getActiveList",
                uniacid: a,
                uid:t.api.getStorage("kejia_farm_uid"),
                page: e,
                current: i
            },
            function (t) {
                if (t.data.activeList) {
                    var a = t.data.activeList;
                    1 == n ? a.map(function (t) {
                        s.push(t)
                    }) : (s = a, e = 1), r.setData({
                        activeList: s,
                        page: e,
                        activeSet: t.data.activeSetData
                    }), wx.stopPullDownRefresh()
                } else r.setData({
                    activeSet: t.data.activeSetData,
                    isContent: !1
                });
                wx.setStorageSync("kejia_farm_active_set", t.data.activeSetData), wx.hideLoading()
            }
        )
    },
    onReachBottom: function (t) {
        var a = parseInt(this.data.page) + 1,
            e = this.data.currentIndex;
        this.getActiveData(a, e, 1)
    },
    onPullDownRefresh: function (t) {
        var a = this.data.currentIndex;
        this.getActiveData(1, a, 0)
    },
    intoActiveDetail: function (t) {
        var a = t.currentTarget.dataset.activeid;
        wx.navigateTo({
            url: "../details/index?activeid=" + a
        })
    },
    changeIndex: function (t) {
        var a = t.currentTarget.dataset.index;
        this.getActiveData(1, a, 0), this.setData({
            currentIndex: a
        })
    },
    onShareAppMessage: function (t) {}
});