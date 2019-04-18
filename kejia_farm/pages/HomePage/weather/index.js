var a = new getApp;
Page({
    data: {
        weather: [],
        weatherSet: [],
        farm_name: ""
    },
    onLoad: function (e) {
        var t = wx.getStorageSync("kejia_farm_weather"),
            r = JSON.parse(e.weatherSet);
        this.setData({
            weather: t,
            weatherSet: r,
            farm_name: e.farm_name
        }), a.util.setNavColor(a.siteInfo.uniacid)
    },
    intoFarmAddress: function (a) {
        var e = this.data.weatherSet;
        wx.openLocation({
            latitude: parseFloat(e.latitude),
            longitude: parseFloat(e.longitude),
            name: this.data.farm_name
        })
    }
});