function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t
}
var e, a = require("../../../../wxParse/wxParse.js"),
    o = new getApp,
    s = o.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page((e = {
    data: {
        isIphoneX: o.globalData.isIphoneX,
        isServer: !1,
        pageScrollTop: 0,
        isShow: !1,
        scrollShow: !1,
        currentIndex: 1,
        scrollTop: !1,
        goodsData: [],
        goodsid: "",
        is_show: "1",
        specItem: [],
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        buy_type: 1,
        specVal: [],
        sku_name_str: "",
        currentLsit: [],
        fertilizerList: [],
        pesticidesList: [],
        traceData: [],
        is_fumier: 1,
        user_uid: "",
        farmSetData: [],
        show_haibao: !1,
        show_goods_shop_model_mask: !1,
        bottom: 0,
        slideCurrentIndex: 1,
        commentCount: 0,
        commentList: [],
        is_create_poster: !1
    },
    onLoad: function (t) {
        var e = this,
            a = o.siteInfo.uniacid,
            s = t.goodsid;
        if (s) {
            var i = t.user_uid,
                n = wx.getStorageSync("kejia_farm_uid");
            o.loginBindParent(i, n), void 0 != i && 0 != i && e.setData({
                user_uid: i
            });
            var r = 0;
            o.globalData.sysData.model.indexOf("iPhone X") > -1 && (r = 68), e.getGoodsDetailData(s), o.util.setNavColor(a), e.setData({
                farmSetData: wx.getStorageSync("kejia_farm_setData"),
                bottom: r
            })
        } else wx.showModal({
            title: "提示",
            content: "当前商品不存在或已下架！",
            showCancel: "false",
            success: function () {
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },
    onShow: function (t) {
        var e = this,
            a = (o.siteInfo.uniacid, e.data.user_uid),
            s = wx.getStorageSync("kejia_farm_uid");
        o.loginBindParent(a, s)
    },
    setCurrent: function (t) {
        this.setData({
            slideCurrentIndex: parseInt(t.detail.current) + 1
        })
    },
    getGoodsDetailData: function (t) {
        var e = this;
        api.ajax(
            "farm/api/getGoodsDetail",
            {
                // op: "getGoodsDetail",
                uniacid: s,
                goodsid: t
            },
            function (o) {
                var s = new Array;
                o.data.traceData && (s = o.data.traceData), e.setData({
                    goodsData: o.data.goodsData,
                    goodsid: t,
                    specItem: o.data.specItem,
                    traceData: s,
                    commentCount: o.data.commentCount,
                    commentList: o.data.commentList
                }), "" != o.data.goodsData.goods_desc && a.wxParse("article", "html", o.data.goodsData.goods_desc, e, 5)
            }
        )
    },
    showMode: function (t) {
        var e = this,
            a = e.data.goodsData,
            spec_id = e.data.spec_id,
            s = wx.getStorageSync("kejia_farm_uid");
        if (s)
            if (1 == a.is_open_sku) e.setData({
                is_show: 2,
                buy_type: 2
            });
            else {
                var i = e.data.goodsid,
                    n = e.data.count,
                    r = o.siteInfo.uniacid;
                api.ajax(
                    "farm/api/addCart",
                    {
                        // op: "addCart",
                        goods_id: i,
                        uniacid: r,
                        count: n,
                        spec_id:spec_id,
                        uid: s
                    },
                    function (t) {
                        1 == t.data.code ? wx.showToast({
                            title: "已加入购物车"
                        }) : wx.showToast({
                            title: "操作失败"
                        })
                    }
                ,null,null,'POST')
            }
        else wx.navigateTo({
            url: "../../login/index"
        })
    },
    hideModal: function () {
        this.setData({
            is_show: 1
        })
    },
    reduceNum: function () {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        })
    },
    addNum: function () {
        var t = parseInt(this.data.count) + 1;
        this.setData({
            count: t
        })
    },
    chooseNum: function (t) {
        var e = t.detail.value;
        e <= 1 ? this.setData({
            count: 1
        }) : this.setData({
            count: e
        })
    },
    selectSpec: function (t) {
        for (var e = this, a = o.siteInfo.uniacid, s = e.data.goodsid, i = t.currentTarget.dataset.specid, n = t.currentTarget.dataset.valid, r = e.data.specItem, d = new Array, c = 0; c < r.length; c++) {
            r[c].id == i && (r[c].select_spec = 1);
            for (var l = 0; l < r[c].specVal.length; l++) r[c].id == i && (r[c].specVal[l].select_val = 0), r[c].specVal[l].id == n && (r[c].specVal[l].select_val = 1), 1 == r[c].specVal[l].select_val && d.push(r[c].specVal[l].id)
        }
        var u = d.join(",");
        api.ajax(
            "farm/api/getSpec",
            {
                // op: "getSpec",
                uniacid: a,
                spec_id: u,
                goodsid: s
            },
            function (t) {
                if (1 == t.data.code) {
                    t.data.specVal.count <= 0 && wx.showToast({
                        title: "库存不足..."
                    });
                    for (var a = 0; a < r.length; a++) {
                        r[a].id == d && (r[a].is_select = 1);
                        for (var o = 0; o < r[a].specVal.length; o++) {
                            r[a].specVal[o].is_count = 1, r[a].specVal[o].id == n && (r[a].specVal[o].is_select = 0, t.data.specVal.count <= 0 && (r[a].specVal[o].is_count = 0));
                            for (var s = 0; s < d.length; s++) d[s] == n && d.splice(s, 1)
                        }
                    }
                    e.setData({
                        price: t.data.specVal.price,
                        spec_src: t.data.specVal.spec_src,
                        spec_id: t.data.specVal.id,
                        specItem: r,
                        specVal: t.data.specVal
                    })
                } else e.setData({
                    specItem: r
                })
            }
        )
    },
    sureGoods: function (t) {
        var e = this,
            a = e.data.goodsid,
            o = this.data.goodsData,
            s = e.data.spec_id,
            i = e.data.count,
            n = e.data.specVal,
            r = wx.getStorageSync("kejia_farm_uid");
        if (0 != r && void 0 != r)
            if (1 == o.is_open_sku) {
                if ("" == s && 0 == s.length) return wx.showToast({
                    title: "请选择规格",
                    icon: "none"
                }), !1;
                n.sku_name ? n.count >= i ? (wx.setStorageSync("shop_buy_goods", n), wx.navigateTo({
                    url: "../confrimOrder/index?goodsid=" + a + "&spec_id=" + s + "&count=" + i
                })) : wx.showToast({
                    title: "库存不足",
                    icon: "none"
                }) : wx.showToast({
                    title: "请选择规格",
                    icon: "none"
                })
            } else o.count >= i ? wx.navigateTo({
                url: "../confrimOrder/index?goodsid=" + o.id + "&count=" + i
            }) : wx.showToast({
                title: "库存不足",
                icon: "none"
            });
        else wx.navigateTo({
            url: "../../login/index"
        })
    },
    buySelectSpec: function (t) {
        this.setData({
            is_show: 2,
            buy_type: 1
        })
    },
    buyNow: function (t) {
        this.data.goodsData, this.data.count;
        var e = wx.getStorageSync("kejia_farm_uid");
        0 != e && void 0 != e ? this.setData({
            is_show: 2,
            buy_type: 1
        }) : wx.navigateTo({
            url: "../../login/index"
        })
    },
    addCart: function (t) {
        var e = this,
            a = e.data.goodsid,
            s = e.data.spec_id,
            i = e.data.count,
            n = o.siteInfo.uniacid,
            r = wx.getStorageSync("kejia_farm_uid"),
            d = e.data.specVal;
        if (console.log(s), 0 != r && void 0 != r) {
            if ("" == s || void 0 == s) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
            d.count >= i ? api.ajax(
                "farm/api/addCart",
                {
                    // op: "addCart",
                    goods_id: a,
                    spec_id: s,
                    uniacid: n,
                    count: i,
                    uid: r
                },
                function (t) {
                    1 == t.data.code ? (wx.showToast({
                        title: "已加入购物车",
                        icon: "none"
                    }), e.setData({
                        is_show: 1
                    })) : wx.showToast({
                        title: "操作失败",
                        icon: "none"
                    })
                }
            ,null,null,'POST') : wx.showToast({
                title: "库存不足",
                icon: "none"
            })
        } else wx.navigateTo({
            url: "../../login/index"
        })
    },
    goHome: function (t) {
        wx.reLaunch({
            url: "/kejia_farm/pages/HomePage/index/index?is_tarbar=true"
        })
    },
    onShareAppMessage: function () {
        var t = this,
            e = wx.getStorageSync("kejia_farm_uid");
        return {
            path: "/kejia_farm/pages/shop/prodeteils/index?goodsid=" + t.data.goodsData.id + "&user_uid=" + e,
            success: function (t) {},
            title: t.data.goodsData.goods_name,
            imageUrl: t.data.goodsData.cover
        }
    },
    intoCart: function (t) {
        wx.navigateTo({
            url: "../buyCar/index"
        })
    },
    onPageScroll: function (t) {
        var e = !1;
        t.scrollTop >= 150 && (e = !0), this.setData({
            scrollTop: e
        })
    },
    proDetailVideo: function (t) {
        var e = t.currentTarget.dataset.videosrc;
        wx.navigateTo({
            url: "../prodeteilVideo/index?src=" + e
        })
    },
    chengeIndex: function (t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            currentIndex: e
        })
    }
}, t(e, "onPageScroll", function (t) {
    var e = !1;
    t.scrollTop >= 350 && (e = !0), this.setData({
        scrollShow: e
    }), 0 == this.data.isShow ? this.setData({
        pageScrollTop: t.scrollTop
    }) : wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    })
}), t(e, "isShow", function (t) {
    var e = t.currentTarget.dataset.index,
        a = this.data.goodsData;
    1 == e && this.setData({
        currentLsit: a.fumierData,
        isShow: !0,
        is_fumier: e
    }), 2 == e && this.setData({
        currentLsit: a.insecData,
        isShow: !0,
        is_fumier: e
    }), wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    })
}), t(e, "scroll", function (t) {
    wx.pageScrollTo({
        scrollTop: this.data.pageScrollTop,
        duration: 0
    })
}), t(e, "noShow", function () {
    this.setData({
        isShow: !1
    })
}), t(e, "returnTop", function () {
    wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
    })
}), t(e, "previewImg", function (t) {
    var e = t.currentTarget.dataset.index,
        a = t.currentTarget.dataset.id,
        o = this.data.traceData,
        s = new Array;
    o.map(function (t) {
        t.id == a && (s = t.img)
    }), wx.previewImage({
        urls: s,
        current: s[e]
    })
}), t(e, "previewSlideImg", function (t) {
    var e = t.currentTarget.dataset.index,
        a = this.data.goodsData;
    wx.previewImage({
        urls: a.goods_slide,
        current: a[e]
    })
}), t(e, "displayServer", function () {
    this.setData({
        isServer: !0
    })
}), t(e, "hideServer", function () {
    this.setData({
        isServer: !1
    })
}), t(e, "showGoodsShareModel", function (t) {
    this.setData({
        show_shop_model: !0,
        show_goods_shop_model_mask: !0
    })
}), t(e, "closeGoodsShareModel", function (t) {
    this.setData({
        show_shop_model: !1,
        show_goods_shop_model_mask: !1
    })
}), t(e, "closeGoodsHaihao", function (t) {
    this.setData({
        show_haibao: !1,
        show_goods_shop_model_mask: !1
    })
}), t(e, "createGoodsPost", function (t) {
    var e = this;
    this.data.is_create_poster ? e.setData({
        show_shop_model: !1,
        show_haibao: !0
    }) : (wx.showLoading({
        title: "海报生成中"
    }), e.getPoster())
}), t(e, "intoCommentList", function (t) {
    wx.navigateTo({
        url: "../commentList/index?goods_id=" + this.data.goodsid
    })
}), t(e, "getPoster", function () {
    var t = this,
        e = wx.getStorageSync("kejia_farm_uid");
    api.ajax(
        "farm/api/getGoodsQrcode",
        {
            // op: "getGoodsQrcode",
            uid: e,
            goods_id: t.data.goodsid,
            uniacid: s
        },
        function (e) {
            console.log(e), e.data.qrcode && t.createPoster(e.data.qrcode, e.data.module_name)
        }
    )
}), t(e, "createPoster", function (t, e) {
    var a = this,
        o = this.data.goodsData,
        s = wx.createCanvasContext("canvas_poster");
    s.clearRect(0, 0, 0, 0), s.save(), wx.getImageInfo({
        src: o.cover,
        success: function (t) {
            s.drawImage(t.path, 20, 20, 225, 225)
        }
    }), s.drawImage(o.cover, 20, 20, 225, 225), this.canvasTextAutoLine(o.goods_name, s, 20, 265, 35, 240, 1), s.setTextAlign("left"), s.setFontSize("16"), s.setFillStyle("rgb(225,0,0)"), s.fillText("￥" + o.price, 20, 295), s.setTextAlign("right"), s.setFontSize("14"), s.setFillStyle("rgb(190,190,190)"), s.fillText("已售 " + o.sale_count + "件", 250, 295), wx.getImageInfo({
        src: t,
        success: function (t) {
            s.drawImage(t.path, 20, 320, 80, 80)
        }
    }), s.drawImage(t, 20, 320, 80, 80), s.setTextAlign("left"), s.setFontSize("14"), s.setFillStyle("rgb(0,0,0)"), s.fillText("长按识别小程序码", 120, 360), s.setTextAlign("left"), s.setFontSize("12"), s.setFillStyle("rgb(190,190,190)"), s.fillText("" + e, 120, 380), setTimeout(function () {
        s.draw(), a.setData({
            show_shop_model: !1,
            show_haibao: !0,
            is_create_poster: !0
        })
    }, 1e3)
}), t(e, "canvasTextAutoLine", function (t, e, a, o, s, i) {
    for (var n = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 1, r = 0, d = 0, c = 1, l = 0; l < t.length; l++) {
        if (e.setFillStyle("rgb(0,0,0)"), e.setFontSize(14), (r += e.measureText(t[l]).width) > i) {
            c++;
            var u = t.substring(d, l);
            if (c > n && t.length > l && (u = t.substring(d, l - 2) + "..."), e.fillText(u, a, o), o += s, r = 0, d = l, c > n) break
        }
        l == t.length - 1 && e.fillText(t.substring(d, l + 1), a, o)
    }
}), t(e, "savePoster", function () {
    var t = this;
    wx.canvasToTempFilePath({
        canvasId: "canvas_poster",
        x: 0,
        y: 0,
        width: 750,
        height: 1334,
        fileType: "jpg",
        success: function (e) {
            t.setData({
                tempImg: e.tempFilePath
            }), wx.saveImageToPhotosAlbum({
                filePath: e.tempFilePath,
                success: function (t) {
                    wx.hideLoading(), wx.showToast({
                        title: "保存成功"
                    })
                },
                fail: function () {
                    wx.hideLoading()
                }
            })
        }
    })
}), e));