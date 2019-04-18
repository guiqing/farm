Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        imgUrl: {
            type: Array,
            value: []
        },
        focus: {
            type: Boolean,
            value: !1
        },
        focusColor: {
            type: String,
            value: "#000"
        },
        swiperHeight: {
            type: Number,
            value: 250
        }
    },
    data: {
        currentIndex: 0
    },
    methods: {
        changeCurrent: function (a) {
            var e = a.detail.current;
            this.setData({
                currentIndex: e
            })
        },
        intoDetailSlide: function (a) {
            var e = a.currentTarget.dataset.linktype,
                n = a.currentTarget.dataset.linkparam;
            let url='';
            switch(e){
                case "2":url="/kejia_farm/pages/land/landList/index";break;
                case "9":url="/kejia_game/pages/farm/index";break;
                default:break;
            }
            wx.navigateTo({
                url:url,
                fail:function(e){
                    wx.switchTab({
                        url:url
                    })
                }
            });
            return ;
            1 == e ? wx.navigateTo({
                url: "/kejia_farm/pages/land/landList/index"
            }) : 2 == e ? n ? wx.navigateTo({
                url: "/kejia_farm/pages/shop/AdoptRules/index?aid=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/shop/Adopt/index"
            }) : 3 == e ? wx.navigateTo({
                url: "/kejia_farm/pages/shop/integral/index/index"
            }) : 4 == e ? wx.navigateTo({
                url: "/kejia_farm/pages/HomePage/live/index"
            }) : 5 == e ? 0 != n ? wx.navigateTo({
                url: "/kejia_farm/pages/shop/prodeteils/index?goodsid=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/shop/index/index"
            }) : 6 == e ? n ? wx.navigateTo({
                url: "/kejia_farm/pages/shop/Group/proDetails/index?goods_id=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/shop/Group/index"
            }) : 7 == e ? n ? wx.navigateTo({
                url: "/kejia_farm/pages/shop/integral/exchangedetails/index?goods_id=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/shop/integral/exchange/index"
            }) : 8 == e ? n && 0 != n ? wx.navigateTo({
                url: "/kejia_farm/pages/information/article/index?aid=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/information/index/index"
            }) : 13 == e ? n && 0 != n ? wx.navigateTo({
                url: "/kejia_farm/pages/funding/prodetail/index?pid=" + n
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/funding/index/index"
            }) : 15 == e && wx.navigateTo({
                url: "/kejia_game/pages/farm/index"
            })
        }
    }
});