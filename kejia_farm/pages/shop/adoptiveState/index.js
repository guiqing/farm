var a = new getApp;
Page({
    data: {
        adoptData: [],
        statusData: [],
        adopt_id: "",
        page: 1,
        state: 1,
        isslaugHter: !1,
        farmSetData: [],
        isShow: !1,
        is_loading: !0
    },
    onLoad: function (t) {
        var e = this,
            i = a.siteInfo.uniacid,
            s = t.adopt_id;
        a.api.ajax(
            "farm/api/getAdoptDetail",
            {
                // op: "getAdoptDetail",
                uniacid: i,
                uid:a.api.getStorage("kejia_farm_uid"),
                adopt_id: s
            },
            function (a) {
                e.setData({
                    adoptData: a.data.adoptData,
                    statusData: a.data.statusData,
                    adopt_id: s
                })
            }
        ), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        }), a.util.setNavColor(i)
    },
    onReachBottom: function (t) {
        var e = this,
            i = a.siteInfo.uniacid,
            s = e.data.adopt_id,
            n = e.data.statusData,
            o = e.data.page;
        a.api.ajax(
            "farm/api/getStatusData",
            {
                // op: "getStatusData",
                uniacid: i,
                adopt_id: s,
                page: o
            },
            function (a) {
                if (a.data.statusData) {
                    for (var t = a.data.statusData, i = 0; i < t.length; i++) n.push(t[i]);
                    e.setData({
                        statusData: n,
                        page: parseInt(o) + 1
                    })
                }
            }
        )
    },
    preImg: function (a) {
        for (var t = this.data.statusData, e = a.currentTarget.dataset.sid, i = a.currentTarget.dataset.index, s = new Array, n = 0; n < t.length; n++) t[n].id == e && (s = t[n].src);
        wx.previewImage({
            current: s[i],
            urls: s
        })
    },
    kellSend: function (a) {
        var t = this.data.adopt_id;
        wx.navigateTo({
            url: "../../user/confirmOrder/index?adopt_id=" + t
        })
    },
    slaugHter: function () {
        this.setData({
            isslaugHter: !0
        })
    },
    cancel: function () {
        this.setData({
            isslaugHter: !1
        })
    },
    confrim: function () {},
    preventTouchMove: function () {},
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
    },
    lookOrder: function (a) {
        var t = a.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "/kejia_farm/pages/shop/Group/orderDetails/index?order_id=" + t
        })
    }
});