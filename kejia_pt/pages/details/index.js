Object.defineProperty(exports, "__esModule", {
    value: !0
});
var e = require("../../utils/util"),
    t = require("../../../wxParse/wxParse.js"),
    a = getApp(),
    n = {},
    i = a.siteInfo.uniacid,
    s = a.util.getNewUrl("entry/wxapp/pt", "kejia_farm_plugin_pt");
Page({
    data: {
        isFullScreen: !1,
        currentClass: "1",
        isSelect: !1,
        endTime: "",
        countDown: {
            sec: 0,
            min: 0,
            hour: 0,
            day: 0
        },
        finised: !1,
        lists: [],
        commentList: [],
        selected: "",
        selectNum: 1,
        goods: [],
        spec: [],
        selectSku: [],
        buy_types: 2,
        relation_id: "",
        page: 1,
        uid: 0,
        farmSetData: [],
        ptIng: [],
        list: [{
            id: 1,
            src: "../../images/icon/Illumination.png",
            name: "果实爸爸"
        }, {
            id: 2,
            src: "../../images/icon/Illumination.png",
            name: "你好"
        }, {
            id: 3,
            src: "../../images/icon/Illumination.png",
            name: "坤典科技aaaaa"
        }, {
            id: 4,
            src: "../../images/icon/Illumination.png",
            name: "让"
        }, {
            id: 5,
            src: "../../images/icon/Illumination.png",
            name: "让品牌就"
        }]
    },
    onLoad: function (o) {
        var c = a.globalData.isFullScreen;
        this.setData({
            isFullScreen: c
        });
        var r = wx.getStorageSync("kejia_farm_uid"),
            d = this,
            u = o.goodsid,
            l = wx.getStorageSync("kejia_farm_setData"),
            m = "";
        o.relation_id && (m = o.relation_id), e.util.request({
            url: s,
            data: {
                op: "getPtDetail",
                action: "index",
                goods_id: u,
                uniacid: i
            },
            success: function (a) {
                var i = a.data.goods.limit_time;
                d.setData({
                    goods: a.data.goods,
                    spec: a.data.spec,
                    endTime: a.data.goods.limit_time,
                    lists: a.data.ptOrder,
                    relation_id: m,
                    commentList: a.data.commentList,
                    ptIng: a.data.ptIng,
                    uid: r,
                    farmSetData: l
                });
                var s = a.data.ptOrder;
                s.map(function (t, a) {
                    t.finised || (n["time" + a] = setInterval(function () {
                        var i = e.countDown(t.endTime);
                        t.hour = i.hour, t.min = i.min, t.sec = i.sec, 0 == i.day && 0 == i.hour && 0 == i.sec && 0 == i.min && (t.finised = !0, clearInterval(n["time" + a])), s[a] = t, d.setData({
                            lists: s
                        })
                    }, 1e3))
                }), n.time = setInterval(function () {
                    var t = e.countDown(i);
                    0 == t.day && 0 == t.hour && 0 == t.sec && 0 == t.min && (d.setData({
                        finised: !0
                    }), clearInterval(n.time)), d.setData({
                        countDown: t
                    })
                }, 1e3), "" != a.data.goods.content && t.wxParse("article", "html", a.data.goods.content, d, 5)
            }
        })
    },
    onShow: function () {
        var t = this,
            a = this.data,
            i = a.lists,
            s = a.endTime;
        i && i.map(function (a, s) {
            a.finised || (n["time" + s] = setInterval(function () {
                var o = e.countDown(a.endTime);
                a.hour = o.hour, a.min = o.min, a.sec = o.sec, 0 == o.day && 0 == o.hour && 0 == o.sec && 0 == o.min && (a.finised = !0, clearInterval(n["time" + s])), i[s] = a, t.setData({
                    lists: i
                })
            }, 1e3))
        }), s && (n.time = setInterval(function () {
            var a = e.countDown(s);
            0 == a.day && 0 == a.hour && 0 == a.sec && 0 == a.min && (t.setData({
                finised: !0
            }), clearInterval(n.time)), t.setData({
                countDown: a
            })
        }, 1e3))
    },
    onHide: function () {
        var e = this.data,
            t = e.finised,
            a = e.lists;
        t || (clearInterval(n.time), a && a.length > 0 && a.map(function (e, t) {
            clearInterval(n["time" + t])
        }))
    },
    changeClass: function (e) {
        var t = e.currentTarget.dataset.class;
        t != this.data.currentClass && this.setData({
            currentClass: t
        })
    },
    preventTouchMove: function () {},
    selectSpec: function (e) {
        var t = this.data.isSelect,
            n = e.currentTarget.dataset.types || 2;
        this.setData({
            isSelect: !t,
            buy_types: n
        }), t || a.util.saveFormId(e.detail.formId, i)
    },
    selected: function (e) {
        var t = "",
            a = e.currentTarget.dataset.valid,
            n = e.currentTarget.dataset.specid,
            i = this.data,
            s = i.spec,
            o = i.goods,
            c = i.selectSpec,
            r = o.sku;
        s.map(function (e) {
            e.id == n && e.specVal.map(function (e) {
                e.selected = !1, e.id == a && (e.selected = !0)
            })
        });
        var d = [];
        s.map(function (e) {
            e.specVal.map(function (e) {
                e.selected && (t += "  " + e.spec_value, d.push(e.id))
            })
        }), r.map(function (e) {
            e.sku_name == d.join(",") && (c = e)
        }), this.setData({
            selected: t,
            spec: s,
            selectSpec: c || []
        })
    },
    reduce: function () {
        var e = this.data.selectNum;
        e <= 1 || this.setData({
            selectNum: e - 1
        })
    },
    add: function () {
        var e = this.data.selectNum;
        this.setData({
            selectNum: e + 1
        })
    },
    inputNum: function (e) {
        var t = Number(e.detail.value);
        this.setData({
            selectNum: t
        })
    },
    goHome: function (e) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index"
        })
    },
    confirmOrder: function (e) {
        var t = this.data,
            n = t.goods,
            s = t.selectNum,
            o = t.selectSpec,
            c = t.buy_types,
            r = t.selected,
            d = t.relation_id;
        if ("1" == n.is_open_sku) {
            if (!o || void 0 == o || o.length <= 0) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1
        } else if (s > n.count) return void wx.showToast({
            title: "库存不足",
            icon: "none"
        });
        a.util.saveFormId(e.detail.formId, i), wx.navigateTo({
            url: "../confirmOrder/index?selectNum=" + s + "&selectSpec=" + JSON.stringify(o) + "&goods_id=" + n.id + "&buy_types=" + c + "&selected=" + r + "&relation_id=" + d
        })
    },
    onShareAppMessage: function (e) {
        var t = this.data.goods,
            a = wx.getStorageSync("kejia_farm_uid");
        return {
            path: "/kejia_pt/pages/details/index?goodsid=" + t.id + "&user_uid=" + a,
            success: function (e) {},
            title: t.goods_name,
            imageUrl: t.cover
        }
    },
    pinDan: function (e) {
        var t = e.currentTarget.dataset.relationid;
        this.setData({
            isSelect: !0,
            relation_id: t,
            buy_types: 2
        })
    },
    previewImg: function (e) {
        var t = e.currentTarget.dataset,
            a = t.commentid,
            n = t.index,
            i = [];
        this.data.commentList.map(function (e) {
            a == e.id && (i = e.src)
        }), wx.previewImage({
            urls: i,
            current: i[n]
        })
    },
    onReachBottom: function (e) {
        var t = this,
            a = this.data,
            n = a.currentClass,
            o = a.page,
            c = a.goods,
            r = a.commentList;
        1 != n && (o = parseInt(o) + 1, e.util.request({
            url: s,
            data: {
                op: "getPtCommentList",
                action: "index",
                uniacid: i,
                goods_id: c.id,
                page: o
            },
            success: function (e) {
                console.log(e), e.data.commentList && (e.data.commentList.map(function (e) {
                    r.push(e)
                }), t.setData({
                    commentList: r,
                    page: o
                }))
            }
        }))
    },
    updateUserInfo: function (e) {
        if ("getUserInfo:fail auth deny" == e.detail.errMsg) return wx.showModal({
            title: "提示",
            content: "您取消了授权",
            showCancel: !1
        }), !1;
        var t = new getApp,
            a = this,
            n = t.siteInfo.uniacid;
        t.util.getUserInfo(function (e) {
            wx.showLoading({
                title: "登录中..."
            }), console.log(e), wx.setStorageSync("kejia_farm_uid", e.memberInfo.uid), wx.setStorageSync("kejia_farm_sessionid", e.sessionid), wx.setStorageSync("kejia_farm_wxInfo", e.wxInfo);
            var i = e.wxInfo.avatarUrl,
                s = e.wxInfo.nickName,
                o = e.memberInfo,
                c = {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: o.avatar,
                    uid: o.uid,
                    nickname: o.nickname,
                    uniacid: n,
                    wxNickName: s,
                    wxAvatar: i
                };
            t.util.request({
                url: "entry/wxapp/class",
                data: c,
                success: function (e) {
                    wx.setStorageSync("kejia_farm_uid", e.data.uid), 0 == e.data.code ? a.setData({
                        uid: e.data.uid
                    }) : wx.showToast({
                        title: "登录失败",
                        icon: "none"
                    }), wx.hideLoading()
                }
            })
        }, e.detail)
    }
});