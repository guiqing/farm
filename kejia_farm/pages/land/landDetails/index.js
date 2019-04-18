var a = require("../../../../wxParse/wxParse.js"),
    api=require('../../../../utils/api'),
    t = new getApp;
Page({
    data: {
        selectLandSpec: [],
        isReturn: !1,
        isShow: !0,
        seedData: [],
        landSpec: [],
        landLimit: [],
        total_price: 0,
        farmSetData: wx.getStorageSync("kejia_farm_setData"),
        icon: [],
        is_loading: !0
    },
    onLoad: function (i) {
        console.log(i);
        let _this=this,lid=i.lid;
        var data={
            id:lid
        }
        api.ajax('farm/api/landdetail',data,function(ret){
            _this.setData({
                landDetail: ret.data.landDetail,
                seedData: ret.data.seedData,
                landSpec: ret.data.landSpec,
                landLimit: ret.data.landLimit,
                icon: ret.data.icon
            });
        });
        return ;
        var n = this,
            d = i.lid;
        wx.showLoading({
            title: "玩命加载中..."
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandDetail",
                uniacid: e,
                lid: d,
                action: "land"
            },
            success: function (e) {
                var i = 0;
                t.globalData.sysData.model.indexOf("iPhone X") > -1 && (i = 68), n.setData({
                    landDetail: e.data.landDetail,
                    seedData: e.data.seedData,
                    landSpec: e.data.landSpec,
                    landLimit: e.data.landLimit,
                    bottom: i,
                    icon: e.data.icon
                }), e.data.landDetail.land_desc && a.wxParse("article", "html", e.data.landDetail.land_desc, n, 5), wx.hideLoading()
            }
        }), t.util.setNavColor(e), console.log(n.data.is_loading)
    },
    selectArea: function (a) {
        var t = this,
            e = a.currentTarget.dataset.areaid;
        this.data.landSpec.map(function (a) {
            e == a.id && t.setData({
                selectLandSpec: a
            })
        })
    },
    onPageScroll: function (a) {
        var t = !1;
        a.scrollTop > 200 && (t = !0), this.setData({
            isReturn: t
        })
    },
    returnTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
    },
    showVideo: function () {
        this.setData({
            isShow: !0
        })
    },
    hideVideo: function () {
        this.setData({
            isShow: !this.data.isShow
        })
    },
    select: function (a) {
        var t = a.currentTarget.dataset.id,
            e = this.data.landSpec;
        e.map(function (a) {
            if (a.id === t) {
                var e = a.select;
                a.select = !e
            } else a.select = !1
        }), this.setData({
            landSpec: e
        }), this.getTotalPrice()
    },
    getTotalPrice: function (a) {
        var t = this.data.landSpec,
            e = this.data.landLimit,
            i = 0;
        t.map(function (a) {
            a.select && (i = parseFloat(i) + a.price)
        }), this.setData({
            total_price: i.toFixed(2)
        })
    },
    toPay: function (a) {
        var t = this.data.landDetail,
            e = this.data.landSpec,
            i = new Array;
        if (wx.getStorageSync("kejia_farm_uid") || wx.navigateTo({
                url: "../../login/index"
            }), e.map(function (a) {
                a.select && i.push(a)
            }), !(i.length > 0)) return wx.showModal({
            title: "提示",
            content: "请选择土地面积",
            showCancel: !1
        }), !1;
        wx.setStorageSync("selectSpec", i), wx.navigateTo({
            url: "../../user/land/payFor/index?land_id=" + t.id + "&land_method=2"
        })
    },
    intoSeedDetail: function (a) {
        var t = a.currentTarget.dataset.sid;
        wx.navigateTo({
            url: "../../user/land/seedDetails/index?sid=" + t
        })
    },
    play: function (a) {
        this.setData({
            is_loading: !1
        })
    },
    onShow: function (a) {
        this.setData({
            is_loading: !0
        })
    }
});