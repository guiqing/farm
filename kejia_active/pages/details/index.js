var t = new getApp,
    a = t.siteInfo.uniacid,
    e = require("../../../wxParse/wxParse.js");
Page({
    data: {
        sign: [],
        activeList: [],
        isShow: !1,
        selectNum: 1,
        total: 0,
        active: [],
        farmSetData: [],
        sign_order: [],
        isIphoneX: t.globalData.isIphoneX
    },
    onLoad: function (i) {
        var n = this,
            s = i.activeid,
            c = t.util.url("entry/wxapp/active") + "m=kejia_farm_plugin_active",
            o = wx.getStorageSync("kejia_farm_uid"),
            r = wx.getStorageSync("kejia_farm_setData");
        t.api.ajax(
            'farm/api/getActiveDetail',
            {
                // op: "getActiveDetail",
                uniacid: a,
                active_id: s,
                uid: o
            },
            function (t) {
               n.setData({
                    active: t.data.active,
                    spec: t.data.spec,
                    sign: t.data.sign_user,
                    sign_count: t.data.sign_count,
                    farmSetData: r,
                    sign_order: t.data.sign_order
                }), "" != t.data.active.detail && e.wxParse("article", "html", t.data.active.detail, n, 5)
            }
        ), t.util.setNavColor(a)
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.active.phone.toString()
        })
    },
    gotomap: function () {
        var t = this.data.active;
        wx.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            address: t.address,
            scale: 28
        })
    },
    preventDefault: function () {},
    selectItem: function (t) {
        var a = [t.currentTarget.dataset.id, this.data.spec],
            e = a[0],
            i = a[1];
        i.map(function (t) {
            t.select = !1, t.id == e && (t.select = !0)
        }), this.setData({
            spec: i
        }), this.sumPrice()
    },
    reduce: function () {
        var t = this.data.selectNum;
        t <= 1 || (t -= 1, this.setData({
            selectNum: t
        }), this.sumPrice())
    },
    add: function () {
        var t = this.data.selectNum;
        t += 1, this.setData({
            selectNum: t
        }), this.sumPrice()
    },
    sumPrice: function () {
        var t = [this.data.selectNum, this.data.spec, 0],
            a = t[0],
            e = t[1],
            i = t[2];
        e.map(function (t) {
            t.select && (i = t.price * a)
        }), this.setData({
            total: i
        })
    },
    close: function () {
        this.setData({
            isShow: !1
        })
    },
    signUp: function () {
        this.setData({
            isShow: !0
        })
    },
    toPay: function (t) {
        var a = this;
        if (wx.getStorageSync("kejia_farm_uid")) {
            var e = a.data.selectNum,
                i = a.data.active;
            if (i.count > 0 && i.count - i.person_count < e) return wx.showModal({
                title: "提示",
                content: "当前余票不足！剩余" + (i.count - i.person_count) + "张"
            }), !1;
            var n = this.data.spec,
                s = new Array;
            if (n.map(function (t) {
                    t.select && (s = t)
                }), 0 == s.length) wx.showToast({
                title: "请选择规格！"
            });
            else {
                var c = a.data.active,
                    o = a.data.total;
                wx.navigateTo({
                    url: "../signform/index?activeid=" + c.id + "&total=" + o + "&selectNum=" + e + "&spec=" + JSON.stringify(s)
                })
            }
        } else wx.navigateTo({
          url: "/kejia_farm/pages/login/index"
        })
    },
    goHome: function () {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index?is_tarbar=true"
        })
    },
    intoSignInfo: function (t) {
        var a = t.currentTarget.dataset.activeid;
        console.log(a), wx.navigateTo({
            url: "../signInfo/index?active_id=" + a
        })
    },
    openQrcode: function (t) {
        var a = this.data.sign_order;
        wx.navigateTo({
            url: "../ticket/index?order_id=" + a.id
        })
    },
    onShareAppMessage: function (t) {
        var a = this.data.active;
        return {
            path: "kejia_active/pages/details/index?activeid=" + a.id,
            success: function (t) {},
            title: a.title
        }
    }
});