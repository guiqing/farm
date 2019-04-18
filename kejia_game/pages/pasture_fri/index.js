! function (a) {
    a && a.__esModule
}(require("../../utils/util.js"));
var a = getApp(),
    i = a.siteInfo.uniacid;
Page({
    data: {
        screenHeight: 0,
        Proportion: 0,
        money: "10000.00",
        isFullScreen: !1,
        showFriend: !1,
        animalList: [],
        clearTime: !1,
        currentInfo: {},
        noAnimal: !1,
        friendList: []
    },
    onLoad: function (t) {
        var e = t.friend_uid,
            n = !1;
        this.setData({
            screenHeight: a.globalData.screenHeight,
            isFullScreen: a.globalData.isFullScreen,
            Proportion: a.globalData.Proportion
        });
        var r = this,
            s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play"),
            u = wx.getStorageSync("kejia_farm_uid");
        a.util.request({
            url: s,
            data: {
                op: "getMyAnimal",
                action: "animal",
                uid: e,
                uniacid: i
            },
            success: function (a) {
                0 == a.data.animalList.length && (n = !0), r.setData({
                    animalList: a.data.animalList,
                    userData: a.data.userData,
                    noAnimal: n
                })
            }
        });
        var d = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
        a.util.request({
            url: d,
            data: {
                op: "visitFriend",
                action: "friend",
                uid: u,
                friend_uid: e,
                uniacid: i
            },
            success: function (a) {
                r.setData({
                    user: a.data.user,
                    friendList: a.data.friendList
                }), 0 == a.data.code && wx.showToast({
                    title: a.data.msg,
                    icon: "none"
                })
            }
        }), a.util.setNavColor(i)
    },
    animalDetail: function (a) {
        var i = [a.detail, this.data.animalList],
            t = i[0],
            e = i[1].find(function (a) {
                return a.id === t
            });
        this.setData({
            currentInfo: e
        })
    },
    closeDetail: function () {
        this.setData({
            currentInfo: {}
        })
    },
    close: function () {
        this.setData({
            noAnimal: !1
        })
    },
    goBack: function () {
        wx.redirectTo({
            url: "../pasture/index"
        })
    },
    checkFriend: function (t) {
        if (this.setData({
                showFriend: !this.data.showFriend
            }), this.data.showFriend) {
            var e = this,
                n = wx.getStorageSync("kejia_farm_uid"),
                r = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
            a.util.request({
                url: r,
                data: {
                    op: "getFriendInfo",
                    action: "friend",
                    uid: n,
                    uniacid: i
                },
                success: function (a) {
                    e.setData({
                        friendList: a.data.friendList
                    })
                }
            })
        }
    },
    visited: function (a) {
        var i = this,
            t = a.currentTarget.dataset.frienduid;
        wx.redirectTo({
            url: "../pasture_fri/index?friend_uid=" + t,
            success: function (a) {
                i.setData({
                    showFriend: !1
                })
            }
        })
    }
});