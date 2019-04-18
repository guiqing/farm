var a = new getApp,
    t = require("../../../utils/util.js");
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        classify: 1,
        Adopt: [],
        typeData: [],
        recommendData: [],
        arr: [],
        scrollTop: 0,
        tarrHight: [],
        user_id: 0,
        newGoodsData: [],
        page: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        is_tarbar: !1,
        Adopt: [{
            id:'17',
            link_param:'kejia_farm/pages/shop/prodeteils/index?goodsid=4',
            link_type:'kejia_farm/pages/shop/index/index',
            rank:'5',
            slide_src:'https://kejia.cqkejia.com//images/17/2018/07/mc48ZsqDeD236bB8gcKkEi09I4Lcic.png',
            slide_type:'2',
            status:'1',
            uniacid:'17'
        },{
            id:'24',
            link_param:'0',
            link_type:'kejia_farm/pages/shop/buyCar/index',
            rank:'99',
            slide_src:'https://kejia.cqkejia.com/images/17/2018/11/Y4IRxI87e436fE56H88iKFS3ZD6s3E.png',
            slide_type:'2',
            status:'1',
            uniacid:'17'
        }],
        typeData: [{
            create_time:"1523588849",
            icon:"https://kejia.cqkejia.com/images/17/2018/07/pAP7U3YN8AburdKDdANBDBuwuUCBP2.png",
            id:"2",
            rank:"2",
            status:"1",
            type_name:"农产品",
            uniacid:"17",
            url_type:"1"
        },{
            create_time: "1523588869",
            icon: "https://kejia.cqkejia.com/images/17/2018/04/kE16G6myS6m1nk1AHtYKoHGGEhMuoe.png",
            id: "3",
            rank:"2",
            status: "1",
            type_name: "家禽",
            uniacid: "17",
            url_type: "1"
        },{
            create_time: "1523588892",
            icon: "https://kejia.cqkejia.com/images/17/2018/04/oO1CffWJ441JUJ5UAZ1cycWKUjfX5W.png",
            id: "4",
            rank:"3",
            status: "1",
            type_name: "水果",
            uniacid: "17",
            url_type: "1"
        },{
            create_time: "1523517177",
            icon: "https://kejia.cqkejia.com/images/17/2018/04/bXup8x58BEvVDd7Ze8D85UTRvmXKVv.png",
            id: "1",
            rank:"4",
            status: "1",
            type_name: "菜品",
            uniacid: "17",
            url_type: "1"
        }],
    },
    onLoad: function (i) {
        var e = this,
            n = !1;
        i.is_tarbar && (n = i.is_tarbar), e.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData"),
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            is_tarbar: n
        });
        var o = a.siteInfo.uniacid,
            r = wx.getStorageSync("kejia_farm_uid");
        wx.showLoading({
            title: "玩命加载中..."
        }), a.api.ajax(
            "farm/api/goods",
            {
                // op: "index",
                uniacid: o,
                uid: r
            },
            function (a) {
                e.setData({
                    // Adopt: a.data.slideData,
                    // typeData: a.data.typeData,
                    recommendData: a.data.recommendData
                }), t.computeHeight(e, a.data.recommendData, 2), wx.hideLoading()
            }
        ), a.util.setNavColor(o);
        var s = i.user_uid;
        void 0 != s && 0 != s && (a.loginBindParent(s, r), e.setData({
            user_uid: s
        }))
    },
    onShow: function (t) {
        var i = this.data.user_uid,
            e = wx.getStorageSync("kejia_farm_uid");
        void 0 != i && 0 != i && (a.loginBindParent(i, e), that.setData({
            user_uid: i
        }))
    },
    onPageScroll: function (a) {
        for (var t = this, i = a.scrollTop, e = t.data.arr, n = t.data.tarrHight, o = 0; o < t.data.recommendData.length; o++) n[o] < i && 0 == e[o] && (e[o] = !0);
        t.setData({
            arr: e,
            scrollTop: i
        })
    },
    intoOrderDetail: function (t) {
        var i = t.currentTarget.dataset.goodsid;
        a.siteInfo.uniacid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + i
        })
    },
    intoGoodsList: function (a) {
        var t = a.currentTarget.dataset.typeid;
        a.currentTarget.dataset.urltype;
        wx.navigateTo({
            url: "../proList/index?type_id=" + t
        })
    },
    touchstart: function (a) {
        this.data.touchDot = a.touches[0].pageX;
        var t = this;
        this.data.interval = setInterval(function () {
            t.data.time += 1
        }, 100)
    },
    touchmove: function (a) {
        var t = a.touches[0].pageX,
            i = this.data.touchDot;
        this.data.time;
        t - i <= -40 && !this.data.done && (this.data.done = !0, this.scrollLeft()), t - i >= 40 && !this.data.done && (this.data.done = !0, this.scrollRight())
    },
    touchend: function (a) {
        clearInterval(this.data.interval), this.data.time = 0, this.data.done = !1
    },
    scrollLeft: function () {
        var a = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            t = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            i = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            });
        this.setData({
            img_width_three: 200
        }), this.animation1 = a, this.animation2 = t, this.animation3 = i, this.animation1.translateX(-60).opacity(.5).step(), this.animation2.translateX(-60).opacity(1).scale(.8, .8).step(), this.animation3.translateX(-60).opacity(.5).scale(1.2, 1.2).step(), this.setData({
            animation1: a.export(),
            animation2: t.export(),
            animation3: i.export()
        });
        var e = this;
        setTimeout(function () {
            e.animation1.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation3.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.setData({
                animation1: a.export(),
                animation2: t.export(),
                animation3: i.export(),
                img_width_three: 60
            })
        }.bind(this), 300);
        var n = this.data.Adopt,
            o = n.shift();
        n.push(o), setTimeout(function () {
            this.setData({
                Adopt: n
            })
        }.bind(this), 195)
    },
    scrollRight: function () {
        var a = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            t = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            i = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            });
        wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_one: 200
        }), this.animation1 = a, this.animation2 = t, this.animation3 = i, this.animation1.translateX(60).opacity(.5).scale(1.2, 1.2).step(), this.animation2.translateX(60).opacity(1).step(), this.animation3.translateX(60).opacity(.5).step(), this.setData({
            animation1: a.export(),
            animation2: t.export(),
            animation3: i.export()
        });
        var e = this;
        setTimeout(function () {
            e.animation1.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), e.animation3.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), e.setData({
                animation1: a.export(),
                animation2: t.export(),
                animation3: i.export(),
                img_width_one: 60
            })
        }.bind(this), 300);
        var n = this.data.Adopt,
            o = n.pop();
        n.unshift(o), setTimeout(function () {
            this.setData({
                Adopt: n
            })
        }.bind(this), 195)
    },
    selectGoods: function (a) {
        wx.navigateTo({
            url: "../search/index"
        })
    },
    intoGoodsDetail: function (a) {
        var t = a.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "../prodeteils/index?goodsid=" + t
        })
    },
    intoDetail: function (a) {
        var t = a.currentTarget.dataset.linktype,
            i = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../land/landList/index"
        }) : 2 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/AdoptRules/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../shop/Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../shop/integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../live/index"
        }) : 5 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/prodeteils/index?goodsid=" + i
        }) : wx.navigateTo({
            url: "../../shop/index/index"
        }) : 6 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/Group/proDetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/Group/index"
        }) : 7 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/integral/exchangedetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        }) : 8 == t && (0 != i ? wx.navigateTo({
            url: "../../article/detail/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../article/index/index"
        }))
    },
    intoDetailSlide: function (a) {
        var t = a.currentTarget.dataset.linktype,
            i = a.currentTarget.dataset.linkparam;
        1 == t ? wx.navigateTo({
            url: "../../user/land/selectionLands/index"
        }) : 2 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/AdoptRules/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../shop/Adopt/index"
        }) : 3 == t ? wx.navigateTo({
            url: "../../shop/integral/index/index"
        }) : 4 == t ? wx.navigateTo({
            url: "../live/index"
        }) : 5 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/prodeteils/index?goodsid=" + i
        }) : wx.navigateTo({
            url: "../../shop/index/index"
        }) : 6 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/Group/proDetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/Group/index"
        }) : 7 == t ? 0 != i ? wx.navigateTo({
            url: "../../shop/integral/exchangedetails/index?goods_id=" + i
        }) : wx.navigateTo({
            url: "../../shop/integral/exchange/index"
        }) : 8 == t && (0 != i ? wx.navigateTo({
            url: "../../article/detail/index?aid=" + i
        }) : wx.navigateTo({
            url: "../../article/index/index"
        }))
    },
    onShareAppMessage: function () {
        var a = wx.getStorageSync("kejia_farm_setData");
        return {
            path: "/kejia_farm/pages/shop/index/index?&user_uid=" + wx.getStorageSync("kejia_farm_uid"),
            success: function (a) {},
            title: a.share_shop_title
        }
    },
    onPullDownRefresh: function (i) {
        var e = this,
            n = a.siteInfo.uniacid,
            o = wx.getStorageSync("kejia_farm_uid");
            a.api.ajax(
                "farm/api/goods",
                {
                    // op: "index",
                    uniacid: n,
                    uid: o,
                    page:1
                },
                function (a) {
                    e.setData({
                        Adopt: a.data.slideData,
                        typeData: a.data.typeData,
                        recommendData: a.data.recommendData,
                        page:2
                    }), t.computeHeight(e, a.data.recommendData, 2), wx.stopPullDownRefresh()
                }
            )
            return ;
        a.api.ajax(
            "farm/api/index",
            {
                uniacid: n,
                // op: "getCommonData"
            },
            function (i) {
                wx.setStorageSync("kejiaFarmTarbar", i.data.tarbar), wx.setStorageSync("kejia_farm_setData", i.data.farmSetData), e.setData({
                    tarbar: i.data.tarbar,
                    farmSetData: i.data.farmSetData
                }), a.api.ajax(
                    "farm/api/goods",
                    {
                        // op: "index",
                        uniacid: n,
                        uid: o,
                        page:1
                    },
                    function (a) {
                        e.setData({
                            Adopt: a.data.slideData,
                            typeData: a.data.typeData,
                            recommendData: a.data.recommendData,
                            page:2
                        }), t.computeHeight(e, a.data.recommendData, 2), wx.stopPullDownRefresh()
                    }
                ), wx.stopPullDownRefresh(), wx.hideLoading()
            }
        )
    },
    changeType: function (a) {
        var t = a.currentTarget.dataset.index;
        this.getGoodsData(1, t), this.setData({
            classify: t
        })
    },
    getGoodsData: function (t, i, e) {
        var n = this,
            o = a.siteInfo.uniacid;
        if (1 != e)
            if (1 == i) {
                if (n.data.recommendData.length > 0) return !1
            } else if (console.log(n.data.newGoodsData.length), n.data.newGoodsData.length > 0) return;
        a.api.ajax(
            "farm/api/getNewGoods",
            {
                // op: "getNewGoods",
                uniacid: o,
                page: t,
                classify: i
            },
            function (a) {
                if (1 == e)
                    if (1 == i) {
                        var o = n.data.recommendData;
                        a.data.recommendData.map(function (a) {
                            o.push(a)
                        }), n.setData({
                            recommendData: o,
                            page: parseInt(t) + 1
                        })
                    } else {
                        var r = n.data.newGoodsData;
                        a.data.newGoodsData.map(function (a) {
                            r.push(a)
                        }), n.setData({
                            newGoodsData: r,
                            page: parseInt(t) + 1
                        })
                    }
                else 1 == i ? n.setData({
                    recommendData: a.data.recommendData,
                    page: 1
                }) : n.setData({
                    newGoodsData: a.data.newGoodsData,
                    page: 1
                })
            }
        )
    },
    onReachBottom: function (a) {
        var t = this.data.classify,
            i = parseInt(this.data.page);
        this.getGoodsData(i, t, 1)
    }
});