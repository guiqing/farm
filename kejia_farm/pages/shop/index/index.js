var a = new getApp,
    api=require("../../../../utils/api.js"),
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
        page1: 1,
        page2: 1,
        farmSetData: [],
        tarbar: wx.getStorageSync("kejia_farm_tarbar"),
        is_tarbar: !1
    },
    onLoad: function (i) {
        let _this=this;
        let tarbar=wx.getStorageSync("kejia_farm_tarbar");
        _this.setData({
            farmSetData:wx.getStorageSync("kejia_farm_setData"),
            tarbar:tarbar
        });
        _this.getShopData();
    },
    onShow: function (t) {
        var i = this.data.user_uid,
            e = wx.getStorageSync("kejia_farm_uid");
        void 0 != i && 0 != i && (a.loginBindParent(i, e), that.setData({
            user_uid: i
        }))
    },
    /**
     * 获取商城首页信息
     */
    getShopData:function(){
        let _this=this;
        api.ajax('farm/api/goods',{page:1},function(ret){
            _this.setData({
                recommendData:ret.data.recommendData,
                typeData:ret.data.typeData
            });
        });
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
        let _this=this;
        _this.getShopData();  //1  下拉刷新 2 分页 3 改变分类
        // var e = this,
        //     n = a.siteInfo.uniacid,
        //     o = wx.getStorageSync("kejia_farm_uid");
        // a.util.request({
        //     url: "entry/wxapp/index",
        //     data: {
        //         uniacid: n,
        //         op: "getCommonData"
        //     },
        //     success: function (i) {
        //         wx.setStorageSync("kejiaFarmTarbar", i.data.tarbar), wx.setStorageSync("kejia_farm_setData", i.data.farmSetData), e.setData({
        //             tarbar: i.data.tarbar,
        //             farmSetData: i.data.farmSetData
        //         }), a.util.request({
        //             url: "entry/wxapp/shop",
        //             data: {
        //                 op: "index",
        //                 uniacid: n,
        //                 uid: o
        //             },
        //             success: function (a) {
        //                 e.setData({
        //                     Adopt: a.data.slideData,
        //                     typeData: a.data.typeData,
        //                     recommendData: a.data.recommendData
        //                 }), t.computeHeight(e, a.data.recommendData, 2), wx.stopPullDownRefresh()
        //             }
        //         }), wx.stopPullDownRefresh(), wx.hideLoading()
        //     }
        // })
    },
    changeType: function (a) {
        let _this=this;
        var t = a.currentTarget.dataset.index;
        let page=_this.data.page1
        if(t==2){
            page=_this.data.page2
        }
        let params={
            page:page,
            classify:t
        }
        _this.getGoodsData(3,params);  //1  下拉刷新 2 分页 3 改变分类
        _this.setData({
            classify: t
        })
    },
    /**
     * 
     * @param {*} type 1 下拉刷新  2 加载更多  3 改变分类
     * @param {*} t page
     * @param {*} i 分类
     */
    getGoodsData: function (type,data) {
        console.log(data);
        let _this=this;
        api.ajax('farm/api/getNewGoods',data,function(ret){
            switch(type){
                case 1:
                    _this.setData({
                        // Adopt: ret.data.slideData,
                        // typeData: ret.data.typeData,
                        recommendData: ret.data.recommendData,
                        page:1 
                    });
                break;
                case 2:
                    if (1 == data.classify) {
                        var o = _this.data.recommendData;
                        if(ret.data.recommendData.length>0){
                            ret.data.recommendData.map(function (a) {
                                o.push(a)
                            }), _this.setData({
                                recommendData: o,
                                page: parseInt(data.page) 
                            })
                        }
                    } else {
                        var r = _this.data.newGoodsData;
                        if(ret.data.newGoodsData.length>0){
                            ret.data.newGoodsData.map(function (a) {
                                r.push(a)
                            }), _this.setData({
                                newGoodsData: r,
                                page: parseInt(data.page) 
                            })
                        }
                        
                    }
                break;
                case 3:
                    if(1==data.classify){
                        _this.setData({
                            recommendData: ret.data.recommendData,
                            page1: 1
                        })
                    }else{
                        _this.setData({
                            newGoodsData: ret.data.newGoodsData,
                            page2: 1
                        })
                    }
                break;
                default:break;
            }
            //t.computeHeight(_this, ret.data.recommendData, 2)
        });
        return ;
        var n = this,
            o = a.siteInfo.uniacid;
        if (1 != e)
            if (1 == i) {
                if (n.data.recommendData.length > 0) return !1
            } else if (console.log(n.data.newGoodsData.length), n.data.newGoodsData.length > 0) return;
        a.util.request({
            url: "entry/wxapp/shop",
            data: {
                op: "getNewGoods",
                uniacid: o,
                page: t,
                classify: i
            },
            success: function (a) {
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
        })
    },
    onReachBottom: function (a) {
        return ;
        let _this=this;
        var t = _this.data.classify,
            i = parseInt(_this.data.page) + 1;
            console.log(i);
            let params={
                page:i,
                classify:t
            }
            _this.getGoodsData(2,params);  //1  下拉刷新 2 分页 3 改变分类
    }
});