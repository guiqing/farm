var api=require("../../utils/api.js");
Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        column: {
            type: Number,
            value: 4
        },
        fontColor: {
            type: String,
            value: "#000"
        },
        fontSize: {
            type: Number,
            value: 32
        },
        radius: {
            type: String,
            value: "50%"
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        currentIndex: 0
    },
    methods: {
        currentChange: function (e) {
            var n = e.detail.current;
            this.setData({
                currentIndex: n
            })
        },
        intoDetail: function (e) {
            var n = e.currentTarget.dataset.url;
            console.log(n);
            
            wx.navigateTo({
                url:n,
                fail:function(e){
                    wx.switchTab({
                        url:n
                    });
                }
            });
            // switch(n){
            //     case "land/landList/index":
            //         wx.switchTab({
            //             url:"/kejia_farm/pages/land/landList/index"
            //         });break;
            //     case "shop/Adopt/index":
            //         wx.switchTab({
            //             url:"/kejia_farm/pages/shop/Adopt/index"
            //         });break;
            //     case "HomePage/live/index":
            //         wx.navigateTo({
            //             url:"/kejia_farm/pages/HomePage/live/index"
            //         });break;
            //     case "shop/integral/index/index":
            //         wx.navigateTo({
            //             url:"/kejia_farm/pages/shop/integral/index/index"
            //         });break;
            //     default:api.alert("该功能即将开放，尽情期待");break;
            // }
            // return "kejia_game/pages/farm/index" == n ? (wx.navigateTo({
            //     url: "/" + n
            // }), !1) : "kejia_active/pages/index/index" == n ? (wx.navigateTo({
            //     url: "/" + n
            // }), !1) : "kejia_funding/pages/index/index" == n ? (wx.navigateTo({
            //     url: "/" + n
            // }), !1) : "kejia_pt/pages/index/index" == n ? (wx.navigateTo({
            //     url: "/" + n
            // }), !1) : void wx.navigateTo({
            //     url: "/kejia_farm/pages/" + n,
            //     fail: function (e) {
            //         wx.switchTab({
            //             url:"/kejia_farm/pages/"+n
            //         });
            //     }
            // })
        }
    }
});