var a = new getApp;
Page({
    data: {
        borderImg: "../../../../images/icon/address-line.png",
        orderData: [],
        orderDetail: [],
        aboutData: [],
        farmSetData: []
    },
    onLoad: function (t) {
        var e = this,
            r = t.order_id,
            o = wx.getStorageSync("kejia_farm_uid"),
            i = a.siteInfo.uniacid;
        a.api.ajax(
            "farm/api/getOrderDetail",
            {
                // op: "getOrderDetail",
                uid: o,
                uniacid: i,
                order_id: r
            },
            function (a) {
                e.setData({
                    orderData: a.data.orderData,
                    orderDetail: a.data.orderDetail,
                    aboutData: a.data.aboutData
                })
            }
        ), a.util.setNavColor(i);
        var n = wx.getStorageSync("kejia_farm_setData");
        // wx.setNavigationBarColor({
        //     frontColor: n.front_color,
        //     backgroundColor: n.background_color
        // });
        e.setData({
            farmSetData: n
        })
    },
    copyData: function (a) {
        var t = a.currentTarget.dataset.info;
        wx.setClipboardData({
            data: t,
            success: function (a) {
                wx.showToast({
                    title: "复制成功"
                })
            }
        })
    },
    gotoMerchant: function () {
        var a = this.data.farmSetData;
        wx.openLocation({
            latitude: parseFloat(a.self_lifting_place.lat),
            longitude: parseFloat(a.self_lifting_place.lng),
            name: a.self_lifting_address
        })
    }
});