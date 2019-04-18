Component({
    properties: {
        info: {
            type: Object,
            value: {}
        }
    },
    data: {},
    methods: {
        gotoVideoDetail: function (e) {
            var t = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/kejia_farm/pages/information/video/index?aid=" + t
            })
        }
    }
});