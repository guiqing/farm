var t = new getApp,
    a = t.siteInfo.uniacid,
    e = t.util.getNewUrl("entry/wxapp/pt", "kejia_farm_plugin_pt");
Page({
    data: {
        current: 0,
        imgList: [],
        types: [],
        currentType: 0,
        groupList: [],
        page: 1,
        farmSetData: []
    },
    onLoad: function () {
        var t = this,
            i = wx.getStorageSync("kejia_farm_setData");
        wx.showLoading({
            title: "玩命加载中..."
        }), t.util.request({
            url: e,
            data: {
                op: "getPtIndex",
                action: "index",
                uniacid: a
            },
            success: function (a) {
                t.setData({
                    imgList: a.data.slideData,
                    types: a.data.typeData,
                    groupList: a.data.goodsData,
                    farmSetData: i
                }), wx.hideLoading()
            }
        })
    },
    currentIndex: function (t) {
        var a = t.detail.current;
        this.setData({
            current: a
        })
    },
    getPtList: function (t) {
        var i = this,
            n = i.data,
            r = n.currentType,
            s = n.groupList;
        t.util.request({
            url: e,
            data: {
                op: "getPtList",
                action: "index",
                type_id: r,
                uniacid: a,
                page: t
            },
            success: function (a) {
                var e = a.data.goodsData;
                t > 1 ? e.lenght > 0 && e.map(function (t) {
                    s.push(t)
                }) : s = e, i.setData({
                    groupList: s,
                    page: t
                })
            }
        })
    },
    selectedType: function (t) {
        var a = t.currentTarget.dataset.type;
        this.data.currentType != a && (this.setData({
            currentType: a
        }), this.getPtList(1))
    },
    onReachBottom: function (t) {
        var a = this.data.page;
        this.getPtList(parseInt(a) + 1)
    },
    intoDetail: function (t) {
        var a = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../details/index?goodsid=" + a
        })
    }
});