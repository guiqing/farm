Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        list: {
            type: Array,
            value: []
        },
        path: {
            type: String,
            value: "kejia_farm/pages/HomePage/index/index"
        },
        SystemInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        os_x: !1,
        current:'kejia_farm/pages/HomePage/index/index'
    },
    attached: function () {
        // var t = !1;
        // this.data.SystemInfo.model.indexOf("iPhone X") > -1 && (t = !0), this.setData({
        //     os_x: t
        // })
        let curPages =  getCurrentPages();
        let pageObj = curPages[curPages.length-1];
        this.setData({
            current:pageObj.route
        })
        //console.log(pageObj.route)
        
    },
    methods: {
        navTo: function (t) {
            var e = t.currentTarget.dataset.path;
            wx.reLaunch({
                url: "/" + e + "?is_tarbar=true"
            })
        }
    }
});