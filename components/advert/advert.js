Component({
    properties: {
        height: {
            type: Number,
            value: 0
        },
        adLists: {
            type: Array,
            value: []
        },
        types: {
            type: Number,
            value: 1
        }
    },
    data: {},
    methods: {
        navToPage: function (a) {
            var e = a.currentTarget.dataset.linktype,
                n = a.currentTarget.dataset.linkparam;
                console.log(n)
                wx.navigateTo({
                    url: n
               })
            // 1 == e ? n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/land/landDetails/index?lid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/land/landList/index"
            // }) : 2 == e ? n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/AdoptRules/index?aid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/Adopt/index"
            // }) : 3 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/integral/index/index"
            // }) : 4 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/HomePage/live/index"
            // }) : 5 == e ? n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/prodeteils/index?goodsid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/index/index"
            // }) : 6 == e ? n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/Group/proDetails/index?goods_id=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/Group/index/index"
            // }) : 7 == e ? n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/integral/exchangedetails/index?goods_id=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/integral/exchange/index"
            // }) : 8 == e ? n && 0 != n ? wx.navigateTo({
            //     url: "/kejia_farm/pages/information/article/index?aid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_farm/pages/information/index/index"
            // }) : 9 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/user/coupon/index/index"
            // }) : 10 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/HomePage/issue/index"
            // }) : 11 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/shop/buyCar/index"
            // }) : 12 == e ? wx.navigateTo({
            //     url: "/kejia_farm/pages/user/addCard/index"
            // }) : 13 == e ? n && 0 != n ? wx.navigateTo({
            //     url: "/kejia_funding/pages/prodetail/index?pid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_funding/pages/index/index"
            // }) : 14 == e ? n && 0 != n ? wx.navigateTo({
            //     url: "/kejia_active/pages/details/index?activeid=" + n
            // }) : wx.navigateTo({
            //     url: "/kejia_active/pages/index/index"
            // }) : 15 == e && wx.navigateTo({
            //     url: "/kejia_game/pages/farm/index"
            // })
        }
    }
});