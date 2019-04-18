var n = new getApp,
    t = n.siteInfo.uniacid;
Page({
    data: {
        info: []
    },
    onLoad: function (a) {
        var i = this,
            u = n.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
        n.util.request({
            url: u,
            data: {
                op: "getReturnInfo",
                uniacid: t
            },
            success: function (n) {
                i.setData({
                    info: n.data.returnInfo
                })
            }
        })
    }
});