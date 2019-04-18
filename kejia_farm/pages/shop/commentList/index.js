var t = new getApp,
    e = t.siteInfo.uniacid;
Page({
    data: {
        commentList: [],
        page: 1,
        goods_id: 0
    },
    onLoad: function (t) {
        var e = t.goods_id;
        this.getCommentList(e, 1)
    },
    onReachBottom: function () {
        var t = this.data,
            e = t.goods_id,
            a = t.page;
        this.getCommentList(e, parseInt(a) + 1)
    },
    getCommentList: function (a, i) {
        var n = this;
        t.api.ajax(
            "farm/api/getCommentList",
            {
                // op: "getCommentList",
                uniacid: e,
                page: i,
                goods_id: a
            },
            function (t) {
                var e = n.data.commentList,
                    o = t.data.commentList;
                i > 1 ? (o.length > 0 && o.map(function (t) {
                    e.push(t)
                }), n.setData({
                    commentList: e,
                    page: i,
                    goods_id: a
                })) : n.setData({
                    commentList: t.data.commentList,
                    goods_id: a
                })
            }
        )
    },
    previewImg: function (t) {
        var e = t.currentTarget.dataset.id,
            a = t.currentTarget.dataset.index,
            i = [];
        this.data.commentList.map(function (t) {
            t.id == e && (i = t.src)
        }), wx.previewImage({
            urls: i,
            current: i[a]
        })
    }
});