var a = new getApp,
    t = a.siteInfo.uniacid;
Page({
    data: {
        orderData: [],
        is_check_user: [],
        farmSetData: []
    },
    onLoad: function (e) {
        var r = this,
            i = e.order_id,
            n = a.util.url("entry/wxapp/order") + "m=kejia_farm_plugin_active",
            u = wx.getStorageSync("kejia_farm_uid"),
            d = wx.getStorageSync("kejia_farm_setData");
        a.api.ajax(
            'farm/api/getActiveTicketData',
            {
                // op: "getTicketData",
                order_number: i,
                uniacid: t,
                uid: u
            },
            function (a) {
                r.setData({
                    orderData: a.data.orderData,
                    is_check_user: a.data.is_check_user,
                    farmSetData: d
                })
            }
        ), a.util.setNavColor(t)
    },
    checkActive: function (e) {
        var r = this,
            i = a.util.url("entry/wxapp/order") + "m=kejia_farm_plugin_active",
            n = wx.getStorageSync("kejia_farm_uid");
        a.api.ajax(
            'farm/api/checkActive',
            {
                // op: "checkActive",
                uniacid: t,
                order_id: r.data.orderData.id,
                uid: n
            },
            function (a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                })
            }
        )
    }
});