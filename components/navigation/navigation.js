Component({
    properties: {
        isIphoneX: {
            type: Boolean,
            value: !1
        },
        fontColor: {
            type: String,
            value: "#000000"
        },
        bgColor: {
            type: String,
            value: "#ffffff"
        },
        title: {
            type: String,
            value: "农场"
        },
        clearfix: {
            type: Boolean,
            value: !1
        },
        showIcon: {
            type: Boolean,
            value: !1
        },
        hidden: {
            type: Boolean,
            value: !1
        }
    },
    attached: function () {
        // wx.setNavigationBarColor({
        //     frontColor: this.data.fontColor,
        //     backgroundColor: this.data.bgColor
        // })
    },
    methods: {
        back: function () {
            wx.navigateBack({
                delta: 1
            })
        },
        index: function () {
            wx.reLaunch({
                url: "/kejia_farm/pages/HomePage/index/index"
            })
        }
    }
});