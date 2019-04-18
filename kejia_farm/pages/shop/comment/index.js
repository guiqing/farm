var t = new getApp,
    e = t.siteInfo.uniacid;
Page({
    data: {
        imgArr: [],
        orderData: [],
        orderDetail: [],
        module_name: "kejia_farm"
    },
    onLoad: function (a) {
        var r = this,
            n = a.order_id,
            i = wx.getStorageSync("kejia_farm_uid"),
            o = "kejia_farm";
        a.module_name && (o = a.module_name);
        var d = {},
            u = "entry/wxapp/order";
        if ("kejia_farm" == o && (d = {
                op: "getOrderDetail",
                uid: i,
                uniacid: e,
                order_id: n,
                module_name: o
            }), "kejia_farm_plugin_pt" == o) return u = t.util.getNewUrl("entry/wxapp/pt", o), d = {
            op: "getCommentOrder",
            action: "index",
            uid: i,
            uniacid: e,
            order_id: n,
            module_name: o
        }, t.util.request({
            url: u,
            data: d,
            success: function (t) {
                var e = t.data.orderDetail;
                e.map(function (t) {
                    t.score = 5, t.title = "非常好", t.commentSrc = new Array
                }), r.setData({
                    orderData: t.data.orderData,
                    orderDetail: e,
                    module_name: o
                })
            }
        }), !1;
        t.util.request({
            url: u,
            data: d,
            success: function (t) {
                var e = t.data.orderDetail;
                e.map(function (t) {
                    t.score = 5, t.title = "非常好", t.commentSrc = new Array
                }), r.setData({
                    orderData: t.data.orderData,
                    orderDetail: e,
                    module_name: o
                })
            }
        })
    },
    pickScore: function (t) {
        var e = t.currentTarget.dataset.goodsid;
        this.data.orderDetail.map(function (a) {
            a.goods_id == e && (a.sroce = t.currentTarget.dataset.score, a.title = t.currentTarget.dataset.title)
        }), this.setData({
            score: t.currentTarget.dataset.score,
            title: t.currentTarget.dataset.title
        })
    },
    addImg: function (t) {
        var e = this,
            a = t.currentTarget.dataset.goodsid,
            r = e.data.orderDetail;
        wx.chooseImage({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (t) {
                var n = t.tempFilePaths;
                r.map(function (t) {
                    if (t.goods_id == a)
                        for (var e = 0; e < n.length; e++) t.commentSrc.push(n[e])
                }), e.setData({
                    orderDetail: r
                })
            }
        })
    },
    deleteImg: function (t) {
        var e = this,
            a = t.currentTarget.dataset.url;
        this.data.imgArr.map(function (t, r) {
            t == a && e.data.imgArr.splice(r, 1)
        })
    },
    getContent: function (t) {
        var e = t.currentTarget.dataset.goodsid;
        this.data.orderDetail.map(function (a) {
            e == a.goods_id && (a.content = t.detail.value)
        })
    },
    submitData: function (a) {
        var r = this;
        wx.showToast({
            title: "正在发布中...",
            icon: "loading",
            mask: !0,
            duration: 1e4
        }), this.updateImg().then(function (a) {
            console.log(a);
            var n = wx.getStorageSync("kejia_farm_uid"),
                i = r.data.module_name;
            t.util.request({
                url: "entry/wxapp/order",
                data: {
                    op: "commentOrder",
                    orderDetail: JSON.stringify(a),
                    uniacid: e,
                    uid: n,
                    module_name: i
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function (t) {
                    wx.hideToast(), wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: "false",
                        success: function () {
                            0 == t.data.code && wx.navigateBack({
                                delta: 1
                            })
                        }
                    })
                }
            })
        }).then(function () {})
    },
    updateImg: function () {
        var t = this,
            e = this.data.orderDetail;
        return new Promise(function (a, r) {
            Promise.all(t.geturl()).then(function (t) {
                for (var r = 0; r < e.length; r++) {
                    e[r].imgs = [];
                    for (var n = 0; n < t.length; n++) e[r].goods_id === t[n].id && e[r].imgs.push(t[n].url)
                }
                a(e)
            })
        })
    },
    geturl: function () {
        var t = this.data.orderDetail,
            e = [];
        for (var a in t)
            for (var r = 0; r < t[a].commentSrc.length; r++) e.push(this.uploadImg(t[a].commentSrc[r], t[a].goods_id));
        return e
    },
    uploadImg: function (e, a) {
        var r = t.siteInfo.siteroot,
            n = (r = r.replace("app/index.php", "web/index.php")) + "?i=" + t.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0";
        return new Promise(function (t, r) {
            wx.uploadFile({
                url: n,
                filePath: e,
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function (e) {
                    var r = JSON.parse(e.data);
                    t({
                        url: r.url,
                        id: a
                    })
                }
            })
        })
    }
});