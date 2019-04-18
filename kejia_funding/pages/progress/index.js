var s = new getApp,
    t = s.siteInfo.uniacid;
Page({
    data: {
        progressList: []
    },
    onLoad: function (a) {
        var e = this,
            i = a.pid,
            r = s.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
        s.util.request({
            url: r,
            data: {
                op: "getProgress",
                uniacid: t,
                pid: i
            },
            success: function (s) {
                console.log(s), e.setData({
                    progressList: s.data.progress
                })
            }
        })
    }
});