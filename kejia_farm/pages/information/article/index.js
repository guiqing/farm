var t = require("../../../../wxParse/wxParse.js"),
    a = new getApp,
    e = a.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        articleDetail: []
    },
    onLoad: function (i) {
        var r = this,
            l = i.aid;
        api.ajax(
            "farm/api/getArticleDetail",
            {
                // op: "getArticleDetail",
                uniacid: e,
                aid: l
            },
            function (a) {
                r.setData({
                    articleDetail: a.data.articleDetail
                }), "" != a.data.articleDetail.content && t.wxParse("article", "html", a.data.articleDetail.content, r, 5)
            }
        ), a.util.setNavColor(e)
    }
});