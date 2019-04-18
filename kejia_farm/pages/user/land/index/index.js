var e = new getApp;
Page({
    data: {
        area: 10,
        currentState: "状态",
        currentVegetable: null,
        Vegetables: [],
        seeds: [],
        sumPrice: "",
        lid: "",
        mineLand: [],
        sendMine: [],
        landStatus: [],
        scrollLeft: 0,
        isShow: !1,
        deviceData: [],
        seedCount: 0,
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        icon: [],
        is_loading: !0
    },
    onLoad: function (t) {
        var a = this;
        a.data.Vegetables || wx.navigateTo({
            url: "../../land/selectionSeeds/index"
        });
        var n = t.lid,
            i = e.siteInfo.uniacid,
            d = wx.getStorageSync("kejia_farm_uid"),
            s = wx.getStorageSync("kejia_farm_setData");
        e.util.request({
            url: "entry/wxapp/land",
            data: {
                op: "getMineLandDetail",
                uniacid: i,
                uid: d,
                lid: n
            },
            success: function (e) {
                e.data.sendMine[0] && a.setData({
                    currentVegetable: e.data.sendMine[0]
                }), 1 == s.is_open_webthing && "" != e.data.mineLand.device_id && a.getDevice(e.data.mineLand.device_id, i, a), a.setData({
                    mineLand: e.data.mineLand,
                    lid: n,
                    sendMine: e.data.sendMine,
                    landStatus: e.data.landStatus,
                    icon: e.data.icon
                })
            }
        }), this.videoContext = wx.createVideoContext("myVideo", this), e.util.setNavColor(i), wx.removeStorage({
            key: "seeds"
        }), this.setData({
            farmSetData: s
        })
    },
    getDevice: function (t, a, n) {
        var i = this;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getDidInfo",
                control: "control",
                web_did: t,
                uniacid: a
            },
            success: function (e) {
                console.log(e), i.setData({
                    deviceData: e.data.deviceData
                })
            }
        })
    },
    onShow: function () {
        var e = this,
            t = e.data.mineLand,
            a = t.count - t.can_seed_count,
            n = (this.data.seeds, 0);
        a > 0 && wx.getStorage({
            key: "seeds",
            success: function (t) {
                var a = JSON.parse(t.data);
                console.log(a), a.map(function (e) {
                    n = parseInt(n) + e.num
                }), e.setData({
                    seeds: a,
                    seedCount: n
                }), e.sumPrices()
            }
        })
    },
    changeState: function (e) {
        this.setData({
            currentState: e.currentTarget.dataset.state
        })
    },
    changeVegetable: function (e) {
        var t = this,
            a = e.currentTarget.dataset.id;
        t.data.sendMine.map(function (e, n) {
            a == e.id && (n <= 1 ? t.setData({
                scrollLeft: 0
            }) : n > 1 && n <= t.data.Vegetables.length - 2 && t.setData({
                scrollLeft: 90 * (n - 1)
            }), t.setData({
                currentVegetable: e
            }))
        })
    },
    selectionSeeds: function () {
        var e = this.data.lid,
            t = this.data.mineLand,
            a = t.count - t.can_seed_count;
        if (a >= 1) {
            var n = this.data.seeds;
            console.log(n);
            var i = 0;
            n.length >= 0 ? (n.map(function (e) {
                i = parseInt(i) + e.num
            }), a <= i ? wx.showModal({
                title: "提示",
                content: "当前种子已超过种植面积"
            }) : wx.navigateTo({
                url: "../../land/selectionSeeds/index?lid=" + e
            })) : wx.navigateTo({
                url: "../../land/selectionSeeds/index?lid=" + e
            })
        } else wx.showModal({
            title: "提示",
            content: "当前土地已经种满！"
        })
    },
    deletes: function (e) {
        var t = this,
            a = e.currentTarget.dataset.id,
            n = this.data.seedCount;
        t.data.seeds.map(function (e, i) {
            e.id == a && (e.num -= 1, 0 == e.num && t.data.seeds.splice(i, 1), n -= 1, t.setData({
                seeds: t.data.seeds,
                seedCount: n
            }), wx.setStorage({
                key: "seeds",
                data: JSON.stringify(t.data.seeds)
            }))
        }), t.sumPrices()
    },
    sumPrices: function () {
        var e = 0;
        this.data.seeds.map(function (t) {
            e += t.price * t.num
        }), this.setData({
            sumPrice: e.toFixed(2)
        })
    },
    nowPay: function (t) {
        var a = this,
            n = (e.siteInfo.uniacid, wx.getStorageSync("kejia_farm_uid"), a.data.seeds);
        if (n.length > 0) {
            new Array, new Array;
            var i = a.data.sumPrice,
                d = a.data.lid;
            wx.setStorageSync("kejia_farm_buy_seed", n), wx.navigateTo({
                url: "../confirm_seed/index?total_price=" + i + "&lid=" + d
            })
        } else wx.showModal({
            title: "提示",
            content: "请选择要购买的种子",
            showCancel: !1
        })
    },
    onShareAppMessage: function () {},
    getSeed: function (e) {
        var t = e.currentTarget.dataset.seedid,
            a = this.data.mineLand.id;
        wx.navigateTo({
            url: "../confirm_order/index?seed_id=" + t + "&mine_land_id=" + a
        })
    },
    showVideo: function () {
        this.setData({
            isShow: !0
        }), this.videoContext.play()
    },
    hiddenVideo: function () {
        this.setData({
            isShow: !1
        }), this.videoContext.pause()
    },
    LookImg: function (e) {
        for (var t = this.data.landStatus, a = e.currentTarget.dataset.id, n = (e.currentTarget.dataset.index, new Array), i = 0; i < t.length; i++)
            if (t[i].id == a) {
                n = t[i].src;
                break
            } wx.previewImage({
            urls: n
        })
    },
    watering: function (t) {
        var a = this,
            n = a.data.mineLand,
            i = wx.getStorageSync("kejia_farm_uid"),
            d = e.siteInfo.uniacid,
            s = t.detail.formId;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "watering",
                control: "control",
                uniacid: d,
                uid: i,
                lid: n.id,
                web_did: n.device_id,
                formId: s
            },
            success: function (e) {
                1 == e.data.code ? (a.setData({
                    close_type: 1
                }), a.countDown(n.device_id, 1)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                })
            }
        })
    },
    fertilization: function (t) {
        var a = this,
            n = a.data.mineLand,
            i = wx.getStorageSync("kejia_farm_uid"),
            d = e.siteInfo.uniacid,
            s = t.detail.formId;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "fertilization",
                control: "control",
                uniacid: d,
                uid: i,
                lid: n.id,
                web_did: n.device_id,
                formId: s
            },
            success: function (e) {
                1 == e.data.code ? (a.setData({
                    close_type: 2
                }), a.countDown(n.device_id, 2)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                })
            }
        })
    },
    killVer: function (t) {
        var a = this,
            n = a.data.mineLand,
            i = wx.getStorageSync("kejia_farm_uid"),
            d = e.siteInfo.uniacid,
            s = t.detail.formId;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "killVer",
                control: "control",
                uniacid: d,
                uid: i,
                lid: n.id,
                web_did: n.device_id,
                formId: s
            },
            success: function (e) {
                1 == e.data.code ? (a.setData({
                    close_type: 3
                }), a.countDown(n.device_id, 3)) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                })
            }
        })
    },
    weeding: function (t) {
        var a = this.data.mineLand,
            n = wx.getStorageSync("kejia_farm_uid"),
            i = e.siteInfo.uniacid,
            d = t.detail.formId;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "weeding",
                control: "control",
                uniacid: i,
                uid: n,
                lid: a.id,
                formId: d
            },
            success: function (e) {
                wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                })
            }
        })
    },
    countDown: function (e, t) {
        var a = this,
            n = 30;
        a.setData({
            isLoading: !0,
            countDownNum: 30
        }), a.setData({
            timer: setInterval(function () {
                n--, a.setData({
                    countDownNum: n
                }), 0 == n && (clearInterval(a.data.timer), console.log("995"), a.setData({
                    isLoading: !1
                }), a.closeDevice(e, t))
            }, 1e3)
        })
    },
    closeDevice: function (t, a) {
        var n = this,
            i = e.siteInfo.uniacid;
        e.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "closeDevice",
                control: "control",
                web_did: t,
                close_type: a,
                uniacid: i
            },
            success: function (e) {
                console.log(e), wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                }), n.setData({
                    close_type: 0
                })
            }
        })
    },
    submitData: function (e) {
        console.log(e)
    },
    addNum: function (e) {
        var t = this,
            a = 0,
            n = e.currentTarget.dataset.id,
            i = this.data.seeds,
            d = this.data.mineLand,
            s = d.count - d.seed_area;
        if (i.map(function (e) {
                a = parseInt(e.num) + a
            }), s <= a) wx.showModal({
            title: "提示",
            content: "所选种子数量已超过土地最大种植面积",
            showCancel: !1
        });
        else {
            var o = 0;
            i.map(function (e) {
                e.id === n && e.num++, o += parseInt(e.num)
            }), this.setData({
                seeds: i,
                seedCount: o
            }), wx.setStorage({
                key: "seeds",
                data: JSON.stringify(i)
            }), t.sumPrices()
        }
    },
    onUnload: function (e) {
        var t = this,
            a = this.data.close_type;
        if (1 == a || 2 == a || 3 == a) {
            var n = t.data.mineLand.device_id;
            t.closeDevice(n, a), clearInterval(t.data.timer)
        }
    },
    play: function (e) {
        this.setData({
            is_loading: !1
        })
    }
});