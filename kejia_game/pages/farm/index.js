var t = function (t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(require("../../utils/util.js")),
    a = getApp(),
    e = void 0,
    n = a.siteInfo.uniacid;
Page({
    data: {
        saleWeight: "",
        saleMoney: 0,
        state: 0,
        screenHeight: 0,
        Proportion: 0,
        isFullScreen: !1,
        money: 0,
        area: 10,
        lands: [{
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }, {
            is_land_buy: 0,
            steal: !1,
            stealist: [],
            crops: []
        }],
        friendList: [],
        seedsList: [],
        extensionIndex: 0,
        showFriend: !1,
        currentLand: {},
        showLandDetail: !1,
        currentShow: 1,
        isPlay: !1,
        isSelect: !1,
        showSeedList: !1,
        seedLandId: "",
        totalNum: 0,
        totalPrice: 0,
        showSelectSeeds: !1,
        alert: !1,
        isrun: !0,
        isNotice: !1,
        NoticeArr: ["xxx购买了一百块土地，实在是太土豪了", "xxx购买了一块土地，实在是太穷了", "恭喜xxx喜提20块土地"],
        close: !1,
        depotList: [],
        currentAnimal: {},
        selectNum: 1,
        showDepot: !1,
        showDetail: !1,
        showAlert: !1,
        postList: [],
        showShop: !1,
        showFarm: !1,
        total: 0,
        userData: [],
        kejiaPlaySet: [],
        share_uid: "",
        is_auth: !0,
        showOperation: !1,
        operatype: 1
    },
    onLoad: function (t) {
        var e = this,
            i = wx.getStorageSync("kejia_farm_uid");
        if (i && 0 != i && "" != i || this.setData({
                is_auth: !1
            }), t.share_uid) {
            var s = t.share_uid;
            e.becomeFriend(i, s), e.setData({
                share_uid: s
            })
        }
        this.setData({
            screenHeight: a.globalData.screenHeight,
            isFullScreen: a.globalData.isFullScreen,
            Proportion: a.globalData.Proportion
        }), this.videoContext = wx.createVideoContext("myVideo"), this.getHomeData(i), a.util.setNavColor(n), wx.getStorageSync("enter_is_play") && wx.removeStorageSync("enter_is_play")
    },
    becomeFriend: function (t, e) {
        var i = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
        t != e && a.util.request({
            url: i,
            data: {
                op: "becomeFriend",
                action: "friend",
                uid: t,
                share_uid: e,
                uniacid: n
            },
            success: function (t) {}
        })
    },
    onShow: function () {
        var t = wx.getStorageSync("kejia_farm_uid"),
            a = this.data.share_uid;
        a && this.becomeFriend(t, a), t ? this.getHomeData(t) : this.setData({
            is_auth: !1
        }), this.run(), wx.getStorageSync("entry_is_play") && wx.removeStorageSync("entry_is_play")
    },
    getHomeData: function (t) {
        var e = this;
        if (!t || 0 == t) return !1;
        a.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "getPluginLogin",
                uniacid: n
            },
            success: function (i) {
                var s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
                a.util.request({
                    url: s,
                    data: {
                        op: "getHomeData",
                        action: "land",
                        uniacid: n,
                        uid: t,
                        depot_type: 1
                    },
                    success: function (a) {
                        if (41009 == a.data.errno) return e.setData({
                            is_auth: !1
                        }), !1;
                        var n = a.data.playSet;
                        wx.setStorageSync("kejiaPlaySet", n);
                        var i = !1;
                        t && 0 == a.data.userData.first_send_money && n.first_time_gold_count > 0 && (i = !0), e.setData({
                            lands: a.data.allLand,
                            userData: a.data.userData,
                            close: i,
                            kejiaPlaySet: n,
                            alert: a.data.none_land,
                            depotList: a.data.depotData
                        }), e.getStatusIndex()
                    }
                })
            }
        })
    },
    onHide: function () {
        clearTimeout(e)
    },
    run: function () {
        var t = this,
            a = !1;
        e = setTimeout(function () {
            a = !t.data.isrun, t.setData({
                isrun: a
            }), t.run()
        }, 700)
    },
    WillClose: function () {
        var t = this,
            e = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play"),
            i = wx.getStorageSync("kejia_farm_uid"),
            s = wx.getStorageSync("kejiaPlaySet"),
            o = t.data.userData;
        a.util.request({
            url: e,
            data: {
                op: "getCoin",
                action: "land",
                uniacid: n,
                uid: i,
                first_time_gold_count: s.first_time_gold_count
            },
            success: function (a) {
                o.money = parseFloat(o.money) + parseFloat(s.first_time_gold_count), t.coinMusic(s.first_time_gold_count), t.setData({
                    close: !1,
                    userData: o
                }), 0 == a.data.code && wx.showToast({
                    title: "首次进入获得" + s.first_time_gold_count + "元",
                    icon: "none"
                })
            }
        })
    },
    coinMusic: function (t) {
        var a = wx.createInnerAudioContext();
        a.autoplay = !0, a.src = this.data.tempFilePath ? this.data.tempFilePath : this.data.kejiaPlaySet.jinbiMusic, this.setNumbeer(t)
    },
    setNumbeer: function (a) {
        var e = this,
            n = new t.default.NumberAnimate({
                from: a,
                speed: 1500,
                refreshTime: 200,
                decimals: 0,
                onUpdate: function () {
                    e.setData({
                        money: n.tempValue
                    })
                }
            })
    },
    getStatusIndex: function () {
        var t = [];
        this.data.lands.map(function (a) {
            1 == a.is_land_buy && t.push(a)
        }), this.setData({
            extensionIndex: t.length
        })
    },
    checkFriend: function () {
        var t = this.data.showFriend;
        if (this.setData({
                showFriend: !t
            }), !t) {
            var e = this,
                i = wx.getStorageSync("kejia_farm_uid"),
                s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
            a.util.request({
                url: s,
                data: {
                    op: "getFriendInfo",
                    action: "friend",
                    uniacid: n,
                    uid: i
                },
                success: function (t) {
                    e.setData({
                        friendList: t.data.friendList
                    })
                }
            })
        }
    },
    checkLand: function (t) {
        var a = t.currentTarget.dataset.id,
            e = this.data.lands.find(function (t) {
                return t.id == a
            });
        1 == e.status && (this.setData({
            currentLand: e,
            showLandDetail: !0,
            currentShow: 1
        }), this.videoContext.pause())
    },
    monitor: function () {},
    closeVideo: function () {
        this.setData({
            showLandDetail: !1
        }), this.videoContext.pause()
    },
    changeType: function (t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            currentShow: a
        }), 1 == a ? this.videoContext.pause() : this.videoContext.play()
    },
    changeVideoState: function () {
        var t = this.data.isPlay;
        t ? this.videoContext.pause() : this.videoContext.play(), this.setData({
            isPlay: !t
        })
    },
    playVideo: function () {
        var t = this.data.isPlay;
        this.setData({
            isPlay: !t
        })
    },
    selectLand: function (t) {
        var a = this.data.isSelect;
        this.setData({
            isSelect: !a
        })
    },
    showSeedList: function (t) {
        var e = this.data.showSeedList;
        if (this.setData({
                showSeedList: !e,
                totalNum: 0
            }), !e) {
            var i = this,
                s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play"),
                o = t.currentTarget.dataset.landid,
                r = t.currentTarget.dataset.mindlandid;
            a.util.request({
                url: s,
                data: {
                    op: "getLandSeed",
                    action: "land",
                    uniacid: n,
                    land_id: o
                },
                success: function (t) {
                    i.setData({
                        seedsList: t.data.seedsList,
                        seedLandId: r
                    })
                }
            })
        }
    },
    select: function (t) {
        var a = this,
            e = t.currentTarget.dataset.id,
            n = this.data.seedsList,
            i = n.findIndex(function (t) {
                return t.id == e
            });
        this.data.totalNum >= this.data.area ? (this.setData({
            isNotice: !0
        }), setTimeout(function () {
            a.know()
        }, 2e3)) : (n[i].num++, this.setData({
            seedsList: n
        }), this.sumSelectNum(n))
    },
    know: function () {
        this.setData({
            isNotice: !1
        })
    },
    reduceSeed: function (t) {
        var a = t.currentTarget.dataset.id,
            e = this.data.seedsList;
        e[e.findIndex(function (t) {
            return t.id == a
        })].num--, this.setData({
            seedsList: e
        }), this.sumSelectNum(e)
    },
    sumSelectNum: function (t) {
        var a = t.reduce(function (t, a) {
                return a.num + t
            }, 0),
            e = t.reduce(function (t, a) {
                return a.num * a.price + t
            }, 0);
        this.setData({
            totalNum: a,
            totalPrice: e.toFixed(2)
        })
    },
    mature: function (t) {
        var e = t.currentTarget.dataset.id,
            i = this.data.lands,
            s = i.findIndex(function (t) {
                return t.id == e
            }),
            o = this,
            r = t.currentTarget.dataset.minelandid,
            d = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play"),
            u = wx.getStorageSync("kejia_farm_uid");
        a.util.request({
            url: d,
            data: {
                op: "pickSeed",
                action: "land",
                uid: u,
                uniacid: n,
                mine_land_id: r
            },
            success: function (t) {
                0 == t.data.code ? (i[s].animation = !0, i[s].steal = !0, i[s].crops.map(function (t, a) {
                    2 == t.status && i[s].crops.splice(a, 1)
                }), i[s].crops.length > 0 ? i[s].process = 3 : i[s].process = 0, o.setData({
                    lands: i
                }), wx.showModal({
                    title: "提示",
                    content: "正在收获中,收获成功后将放入背包,请耐心等待",
                    confirmText: "进入背包",
                    success: function (t) {
                        o.getSeedBagData(), t.confirm && o.setData({
                            showDepot: !0
                        })
                    }
                })) : wx.showToast({
                    title: t.data.smg,
                    icon: "none"
                })
            }
        })
    },
    showSelectSeeds: function () {
        var t = this.data.showSelectSeeds;
        this.setData({
            showSelectSeeds: !t
        })
    },
    visited: function (t) {
        var a = this,
            e = t.currentTarget.dataset.frienduid,
            n = t.detail.formId;
        wx.navigateTo({
            url: "../friend/index?friend_uid=" + e + "&form_id=" + n,
            success: function (t) {
                a.setData({
                    showFriend: !1
                })
            }
        })
    },
    reflect: function () {
        this.data.userData;
        wx.navigateTo({
            url: "/kejia_farm/pages/user/wallet/index"
        })
    },
    payfor: function (t) {
        var e = this,
            i = e.data.totalPrice,
            s = t.currentTarget.dataset.landid,
            o = wx.getStorageSync("kejia_farm_uid"),
            r = this.data.seedsList.filter(function (t) {
                return t.num > 0
            });
        if (r.length <= 0) return wx.showToast({
            title: "请选择种子~",
            icon: "none"
        }), !1;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "addSeedOrder",
                action: "land",
                uniacid: n,
                uid: o,
                total_price: i,
                seedList: JSON.stringify(r),
                lid: s
            },
            success: function (t) {
                var i = t.data.order_id;
                e.setData({
                    order_id: i
                }), a.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        op: "getSeedPayOrder",
                        action: "land",
                        orderid: i,
                        uniacid: n
                    },
                    cachetime: "0",
                    success: function (t) {
                        if (t.data && t.data.data && !t.data.errno) {
                            var r = t.data.data.package;
                            wx.requestPayment({
                                timeStamp: t.data.data.timeStamp,
                                nonceStr: t.data.data.nonceStr,
                                package: t.data.data.package,
                                signType: "MD5",
                                paySign: t.data.data.paySign,
                                success: function (t) {
                                    a.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "notifySeed",
                                            action: "land",
                                            order_id: i,
                                            uniacid: n,
                                            prepay_id: r,
                                            lid: s
                                        },
                                        success: function (t) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "种子已购买成功,请等待种植~",
                                                showCancel: !1,
                                                success: function () {
                                                    e.setData({
                                                        showSelectSeeds: !1,
                                                        selectSeedList: [],
                                                        showSeedList: !1,
                                                        totalNum: 0
                                                    }), e.getHomeData(o)
                                                }
                                            })
                                        }
                                    })
                                },
                                fail: function (t) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function (t) {}
                                    })
                                }
                            })
                        }
                    },
                    fail: function (t) {
                        wx.showModal({
                            title: "系统提示",
                            content: t.data.message ? t.data.message : "错误",
                            showCancel: !1,
                            success: function (t) {}
                        })
                    }
                })
            }
        })
    },
    pasture: function () {
        wx.navigateTo({
            url: "../pasture/index"
        })
    },
    checkDepot: function () {
        var t = this.data.showDepot;
        this.setData({
            showDepot: !t
        })
    },
    sale: function (t) {
        var a = [t.currentTarget.dataset.id, this.data.depotList],
            e = a[0],
            n = a[1].find(function (t) {
                return t.id === e
            });
        n.animation || this.setData({
            currentAnimal: n,
            state: 1
        })
    },
    closrProDetail: function () {
        this.setData({
            state: 0,
            saleWeight: ""
        })
    },
    post: function () {
        var t = this.data.currentAnimal;
        wx.navigateTo({
            url: "/kejia_farm/pages/land/pay_freight/index?types=1&selectBag=" + JSON.stringify(t)
        })
    },
    saleItem: function () {
        this.setData({
            state: 2
        })
    },
    inputWeight: function (t) {
        var a = t.detail.value;
        this.setData({
            saleWeight: a
        })
    },
    saleAll: function (t) {
        var e = this,
            i = t.detail.formId,
            s = this.data.currentAnimal,
            o = (s.sale_price * s.weight).toFixed(2);
        wx.showModal({
            title: "提示",
            content: "确认售出全部的商品吗？",
            success: function (t) {
                if (t.confirm) {
                    var r = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
                    a.util.request({
                        url: r,
                        data: {
                            op: "saleAll",
                            action: "land",
                            saleData: JSON.stringify(s),
                            uniacid: n,
                            form_id: i
                        },
                        success: function (t) {
                            wx.showModal({
                                title: "提示",
                                content: t.data.msg,
                                showCancel: !1,
                                success: function () {
                                    e.setData({
                                        state: 3,
                                        saleMoney: o
                                    }), e.getSeedBagData()
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    salePart: function (t) {
        var e = this,
            i = t.detail.formId,
            s = this.data,
            o = s.saleWeight,
            r = s.currentAnimal;
        if (parseFloat(o) > parseFloat(r.weight)) wx.showToast({
            title: "售出重量超过总重量",
            icon: "none",
            duration: 2e3
        });
        else if ("" != o) {
            var d = (o * r.sale_price).toFixed(2);
            wx.showModal({
                title: "提示",
                content: "确认售出部分商品吗？",
                success: function (t) {
                    if (t.confirm) {
                        var s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
                        a.util.request({
                            url: s,
                            data: {
                                op: "salePart",
                                action: "land",
                                saleData: JSON.stringify(r),
                                weight: o,
                                uniacid: n,
                                form_id: i
                            },
                            success: function (t) {
                                wx.showModal({
                                    title: "提示",
                                    content: t.data.msg,
                                    showCancel: !1,
                                    success: function () {
                                        e.setData({
                                            state: 3,
                                            saleMoney: d
                                        }), e.getSeedBagData()
                                    }
                                })
                            }
                        })
                    }
                }
            })
        } else wx.showToast({
            title: "你还没输入售出的重量",
            icon: "none",
            duration: 2e3
        })
    },
    getIndex: function (t, a) {
        return t.findIndex(function (t) {
            return t.id == a.id
        })
    },
    showFarm: function () {
        var t = this.data.showFarm;
        this.setData({
            showFarm: !t
        })
    },
    onShareAppMessage: function (t) {
        t.from;
        var a = wx.getStorageSync("kejia_farm_uid");
        return {
            title: this.data.kejiaPlaySet.farm_share_title,
            path: "kejia_game/pages/farm/index?share_uid=" + a
        }
    },
    goToBuyLand: function (t) {
        wx.navigateTo({
            url: "/kejia_farm/pages/land/landList/index?is_play=1"
        })
    },
    intoLandDetail: function (t) {
        var a = t.currentTarget.dataset.minelandid;
        wx.navigateTo({
            url: "/kejia_farm/pages/land/mineLandDetail/index?lid=" + a
        })
    },
    intoLive: function (t) {
        wx.navigateTo({
            url: "/kejia_farm/pages/HomePage/live/index"
        })
    },
    denyAuth: function (t) {
        this.setData({
            is_auth: !0
        }), wx.showModal({
            title: "提示",
            content: "您拒绝了授权，将获取不到您的用户信息，可能会影响您的体验哦",
            showCancel: !1
        })
    },
    updateUserInfo: function (t) {
        var a = this,
            e = getApp(),
            n = e.siteInfo.uniacid;
        e.util.getUserInfo(function (t) {
            wx.setStorageSync("kejia_farm_uid", t.memberInfo.uid), wx.setStorageSync("kejia_farm_userInfo", t.memberInfo), wx.setStorageSync("kejia_farm_sessionid", t.sessionid);
            var i = t.memberInfo,
                s = t.wxInfo.avatarUrl,
                o = t.wxInfo.nickName,
                r = i.uid;
            if (a.setData({
                    nickName: o,
                    avatarUrl: s
                }), !r) return wx.showModal({
                title: "提示",
                content: "获取用户UID失败",
                showCancel: !1
            }), !1;
            var d = e.util.getNewUrl("entry/wxapp/class", "kejia_farm");
            a.util.request({
                url: d,
                data: {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: s,
                    nickname: o,
                    uid: r,
                    uniacid: n
                },
                success: function (t) {
                    0 == t.data.code && wx.showToast({
                        title: "授权成功~",
                        icon: "none",
                        success: function () {
                            a.setData({
                                is_auth: !0
                            }), a.getHomeData(r)
                        }
                    })
                }
            })
        }, t.detail)
    },
    showOperation: function (t) {
        var a = 1;
        this.data.showOperation || (a = t.currentTarget.dataset.operatype), this.setData({
            showOperation: !this.data.showOperation,
            operatype: a
        })
    },
    operationLand: function (t) {
        var e = t.currentTarget.dataset.adoptid,
            i = t.currentTarget.dataset.operatype,
            s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play"),
            o = wx.getStorageSync("kejia_farm_uid"),
            r = t.currentTarget.dataset.landname;
        a.util.request({
            url: s,
            data: {
                op: "operationLand",
                action: "land",
                uniacid: n,
                uid: o,
                adopt_id: e,
                operatype: i,
                land_name: r
            },
            success: function (t) {
                if (-1 == t.data.code) return wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), !1;
                var e = t.data.order_id;
                a.util.request({
                    url: "entry/wxapp/playPay",
                    data: {
                        order_id: e,
                        uniacid: n
                    },
                    cachetime: "0",
                    success: function (t) {
                        if (t.data && t.data.data && !t.data.errno) {
                            var i = t.data.data.package;
                            wx.requestPayment({
                                timeStamp: t.data.data.timeStamp,
                                nonceStr: t.data.data.nonceStr,
                                package: t.data.data.package,
                                signType: "MD5",
                                paySign: t.data.data.paySign,
                                success: function (t) {
                                    var s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
                                    a.util.request({
                                        url: s,
                                        data: {
                                            op: "operation_notify",
                                            action: "land",
                                            order_id: e,
                                            uniacid: n,
                                            prepay_id: i
                                        },
                                        success: function (t) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            })
                                        }
                                    })
                                },
                                fail: function (t) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function (t) {}
                                    })
                                }
                            })
                        }
                    },
                    fail: function (t) {
                        if ("JSAPI支付必须传openid" == t.data.message) return wx.navigateTo({
                            url: "/kejia_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: t.data.message ? t.data.message : "错误",
                            showCancel: !1,
                            success: function (t) {}
                        })
                    }
                })
            }
        })
    },
    intoMenuPro: function (t) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index"
        })
    },
    intoMoneyBag: function (t) {
        wx.navigateTo({
            url: "/kejia_farm/pages/user/wallet/index"
        })
    },
    getSeedBagData: function (t) {
        var e = this,
            i = wx.getStorageSync("kejia_farm_uid"),
            s = a.util.getNewUrl("entry/wxapp/game", "kejia_farm_plugin_play");
        a.util.request({
            url: s,
            data: {
                op: "getSeedBagData",
                action: "land",
                uniacid: n,
                uid: i
            },
            success: function (t) {
                e.setData({
                    depotList: t.data.depotData
                })
            }
        })
    }
});