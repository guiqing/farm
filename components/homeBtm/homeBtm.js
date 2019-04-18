Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        homeBtm: {
            type: Object,
            value: []
        }
    },
    data: {},
    methods: {
        intoBtmDetail: function (e) {
            var t = e.currentTarget.dataset.jumpurl;
            wx.navigateTo({
                url: t,
                fail: function (e) {
                    wx.switchTab({
                        url: t
                      })
                }
            })
            
            // return "kejia_active/pages/index/index" == t ? (wx.navigateTo({
            //     url: "/" + t
            // }), !1) : "kejia_funding/pages/index/index" == t ? (wx.navigateTo({
            //     url: "/" + t
            // }), !1) : void(0 != t && "" != t && void 0 != t && wx.navigateTo({
            //     url: "/kejia_farm/pages/" + t,
            //     fail: function (e) {
            //         wx.switchTab({
            //             url: '/kejia_farm/pages/'+t
            //           })
            //     }
            // }))
        }
    }
});