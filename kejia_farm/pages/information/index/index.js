var t = new getApp,
    a = t.siteInfo.uniacid;
var api=require("../../../../utils/api.js");
Page({
    data: {
        currentType: 0,
        currentIndex: 0,
        typeList: [],
        lists: [],
        videos: [],
        farmSetData: []
    },
    onLoad: function (t) {
        var e = this,
            r = {
                op: "getArticleData",
                uniacid: a,
                page: 1,
               
            };
        e.getArticle(r);
        var i = wx.getStorageSync("kejia_farm_setData");
        e.setData({
            farmSetData: i
        });
        // wx.setNavigationBarColor({
        //     frontColor: i.front_color,
        //     backgroundColor: i.background_color
        // })
    },
    changeType: function (t) {
        var e = t.currentTarget.dataset.id;
        this.data.currentType !== e && this.setData({
            currentType: e
        });
        var r = {
             op: "getArticleData",
            uniacid: a,
            page: 1,
            type_id: e
        };
        this.getArticle(r)
    },
    getArticle: function (a) {
        var e = this;
        t.util.request({
            url:"farm/api/getArticleData",
            data:a,
            success:function (t) {
                console.log(t);
                if(a.type_id){
                    e.setData({
                        articleData:t.data.articleData
                    });
                }else{
                    e.setData(t.data);
                    e.setData({
                        currentType:t.data.type_id[0].id  
                    });
                }
                // if (1 == a.page) {
                //     var r = e.data.type_id;
                //     t.data.typeData && (r = t.data.typeData), e.setData({
                //         lists: t.data.articleData,
                //         // currentType: t.data.type_id,
                //         typeList: r
                //     })
                // } else {

                //     // var i = t.data.articleData,
                //     //     n = e.data.lists;
                //     // i.map(function (t) {
                //     //     n.push(t)
                //     // }), e.setData({
                //     //     lists: n,
                //     // })
                // }
            }
        })
    },
    changeIndex: function (t) {
        var a = t.detail.current;
        this.setData({
            currentIndex: a
        })
    }
});