var t = require("../../../../wxParse/wxParse.js"),
    a = new getApp,
    e = a.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        isPlay: !1,
        articleDetail: []
    },
    onLoad: function (i) {
        this.videoContext = wx.createVideoContext("myVideo");
        var l = this,
            s = i.aid;
        api.ajax(
            "farm/api/getArticleDetail",
            {
                op: "getArticleDetail",
                uniacid: e,
                aid: s
            },
            function (a) {
                l.setData({
                    articleDetail: a.data.articleDetail
                }), "" != a.data.articleDetail.content && t.wxParse("article", "html", a.data.articleDetail.content, l, 5)
            }
        ), a.util.setNavColor(e)
    },
    hadPause: function () {
        var t = this.data.isPlay;
        this.setData({
            isPlay: !t
        })
    },
    playVideo: function () {
        this.videoContext.play()
    }
});