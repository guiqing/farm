var a = new getApp,
    i = a.siteInfo.uniacid;
Page({
    data: {
        sign: []
    },
    onLoad: function (t) {
        var n = this,
            e = t.active_id;
        console.log(e);
        var s = a.util.url("entry/wxapp/active") + "m=kejia_farm_plugin_active";
        a.util.request({
            url: "farm/api/getSignInfo",
            data: {
                op: "getSignInfo",
                uniacid: i,
                active_id: e
            },
            success: function (a) {
                n.setData({
                    sign: a.data.signInfo
                })
            }
        }), a.util.setNavColor(i)
    }
});