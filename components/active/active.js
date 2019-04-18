Component({
    properties: {
        lists: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        intoActiveDetail: function (t) {
            var e = t.currentTarget.dataset.activeid;
            wx.navigateTo({
                url: "/kejia_active/pages/details/index?activeid=" + e
            })
        }
    }
});