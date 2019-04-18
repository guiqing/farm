var a = function (a) {
        return a && a.__esModule ? a : {
            default: a
        }
    }(require("../../../template/calendarTemplate/calendarTemplate")),
    t = new getApp;
var api=require("../../../../../utils/api.js");
Page({
    data: {
        SystemInfo: t.globalData.sysData,
        isIphoneX: t.globalData.isIphoneX,
        bg: "http://ozt9rm7rf.bkt.clouddn.com/images/17/2018/04/l0WW0r0Z12IlAhwJPqUbN0UeBirAJb.png",
        date: 3,
        userInfo: [],
        userData: [],
        is_sign: 2,
        aboutData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1
    },
    onLoad: function (e) {
        (0, a.default)();
        var n = this,
            i = wx.getStorageSync("kejia_farm_uid"),
            r = wx.getStorageSync("userInfo"),
            s = t.siteInfo.uniacid,
            d = this.data.calendar,
            o = this.data.calendar.curYear,
            u = this.data.calendar.curMonth,
            g = wx.getStorageSync("kejia_farm_setData"),
            c = !1;
        e.is_tarbar && (c = e.is_tarbar), n.setData({
            sign_title: g.sign_title,
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: c
        }), 0 != i ? api.ajax('farm/api/getSignData',{
            op: "getSignData",
            uid: i,
            uniacid: s,
            year: o,
            month: u
        },function (a) {
            if (a.data.signData) {
                for (var t = a.data.signData, e = 0; e < t.length; e++)
                    for (var i = 0; i < d.days.length; i++) d.days[i].day == t[e].day && (d.days[i].choosed = !0, d.days[i].sign = !0);
                n.setData({
                    calendar: d
                })
            }
            n.setData({
                userInfo: r.memberInfo,
                userData: a.data.userData,
                is_sign: a.data.is_sign,
                aboutData: a.data.aboutData,
                bg: a.data.aboutData.sign_banner
            })
        }): wx.redirectTo({
            url: "../../../login/index"
        }), t.util.setNavColor(s)
        // t.util.request({
        //     url: "entry/wxapp/sign",
        //     data: {
        //         op: "getSignData",
        //         uid: i,
        //         uniacid: s,
        //         year: o,
        //         month: u
        //     },
        //     success: function (a) {
        //         if (a.data.signData) {
        //             for (var t = a.data.signData, e = 0; e < t.length; e++)
        //                 for (var i = 0; i < d.days.length; i++) d.days[i].day == t[e].day && (d.days[i].choosed = !0, d.days[i].sign = !0);
        //             n.setData({
        //                 calendar: d
        //             })
        //         }
        //         n.setData({
        //             userInfo: r.memberInfo,
        //             userData: a.data.userData,
        //             is_sign: a.data.is_sign,
        //             aboutData: a.data.aboutData,
        //             bg: a.data.aboutData.sign_banner
        //         })
        //     }
        // }) : wx.redirectTo({
        //     url: "../../../login/index"
        // }), t.util.setNavColor(s)
    },
    intoIntegral: function (a) {
        // wx.navigateTo({
        //     url: "../exchange/index"
        // })
    },
    intoRecord: function (a) {
        wx.navigateTo({
            url: "../record/index"
        })
    },
    addSign: function (a) {
        var e = wx.getStorageSync("kejia_farm_uid"),
            n = t.siteInfo.uniacid,
            i = this,
            r = i.data.calendar.days;
        api.ajax(
             "farm/api/addSign",
            {
                op: "addSign",
                uid: e,
                uniacid: n
            },
            function (a) {
                if (1 == a.data.code) {
                    wx.showToast({
                        title: "签到成功"
                    });
                    for (var t = 0; t < r.length; t++) r[t].day == a.data.day && (r[t].choosed = !0);
                    i.setData({
                        userData: a.data.userData,
                        is_sign: 1,
                        "calendar.days": r
                    })
                } else 2 == a.data.code ? wx.showToast({
                    title: "签到失败"
                }) : 3 == a.data.code ? wx.showToast({
                    title: "今日已签到"
                }) : wx.showToast({
                    title: "签到失败1"
                })
            }
        )
    },
    intoSignRule: function (a) {
        wx.navigateTo({
            url: "../sign_rule/index"
        })
    },
    onShareAppMessage: function () {},
    signCard: function () {
        var a = wx.getStorageSync("kejia_farm_uid"),
            e = t.siteInfo.uniacid;
        api.ajax(
            "farm/api/signCard",
            {
                op: "signCard",
                uid: a,
                uniacid: e
            },
            function (a) {
                console.log(a)
            }
        )
    }
});