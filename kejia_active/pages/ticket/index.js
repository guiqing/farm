var a = new getApp,
    t = a.siteInfo.uniacid;
Page({
    data: {
        orderData: [],
        active: []
    },
    onLoad: function (e) {
        var i = this,
            d = wx.getStorageSync("kejia_farm_uid"),
            r = a.util.url("entry/wxapp/order") + "m=kejia_farm_plugin_active";
        a.util.request({
          url: "farm/api/getActiveqrcode",
            data: {
                // op: "getQrcode",
                uniacid: t,
                order_id: e.order_id,
                uid: d
            },
            success: function (a) {
                i.setData({
                    orderData: a.data.orderData,
                    active: a.data.active
                })
            }
        }), a.util.setNavColor(t)
    },
    intoMap: function (a) {
        var t = this;
        wx.openLocation({
            latitude: parseFloat(t.data.active.latitude),
            longitude: parseFloat(t.data.active.longitude),
            address: t.data.active.address,
            scale: 28
        })
    },
    doCall: function (a) {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.active.phone
        })
    }
});