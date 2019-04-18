var t = new getApp,
    a = t.siteInfo.uniacid,
    n = require("../../../wxParse/wxParse.js");
Page({
    data: {
        contract: []
    },
    onLoad: function (r) {
        var c = this,
            e = t.util.url("entry/wxapp/project") + "m=kejia_farm_plugin_funding";
        t.util.request({
            url: e,
            data: {
                op: "getContractInfo",
                uniacid: a
            },
            success: function (t) {
                "" != t.data.contract.fund_contract && n.wxParse("article", "html", t.data.contract.fund_contract, c, 5)
            }
        })
    }
});