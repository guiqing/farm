App({
    onLaunch: function () {
        wx.removeStorageSync("kejia_farm_tabbar")
        var n = this,
            a = this;
        wx.getSystemInfo({
            success: function (a) {
                n.globalData.sysData = a, a.model.indexOf("iPhone X") > -1 && (n.globalData.isIphoneX = !0);
                var i = [a.windowHeight, a.screenWidth, a.model, !1],
                    t = i[0],
                    e = i[1],
                    o = i[2],
                    r = i[3];
                o.indexOf("iPhone X") > -1 && (r = !0), n.globalData.screenHeight = t, n.globalData.isFullScreen = r, n.globalData.Proportion = e / 750
            }
        });
        
        var i = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&m=kejia_farm&c=entry&a=wxapp&do=class";
        // wx.request({
        //     url: i,
        //     data: {
        //         op: "getCommonData",
        //         uniacid: a.siteInfo.uniacid,
        //         action: "index",
        //         control: "home"
        //     },
        //     success: function (n) {
        //         wx.setStorageSync("kejiaFarmTarbar", n.data.tarbar), wx.setStorageSync("kejia_farm_setData", n.data.farmSetData), "kejia_farm/pages/HomePage/index/index" != n.data.tarbar[0].path && wx.reLaunch({
        //             url: "/" + n.data.tarbar[0].path + "?is_tarbar=true"
        //         })
        //     }
        // })
    },
    onShow: function () {},
    onHide: function () {
        wx.setStorageSync("kejia_farm_hasReload", false);  //退出后台
    },
    onError: function (n) {},
    util: require("we7/resource/js/util.js"),
    api:require("./utils/api.js"),
    siteInfo:require("siteinfo.js"),
    loginBindParent: function (n, a) {
        var i = this;
        void 0 != a && 0 != a && void 0 != n && 0 != n && i.bindParent(n, a)
    },
    bindParent: function (n, a) {
        // var i = this;
        // void 0 == n && 0 == n || i.util.request({
        //     url: "entry/wxapp/distribution",
        //     data: {
        //         op: "bindParent",
        //         user_uid: n,
        //         uniacid: i.siteInfo.uniacid,
        //         uid: a
        //     },
        //     success: function (n) {
        //         console.log(n)
        //     },
        //     error: function (n) {
        //         console.log(n)
        //     }
        // })
    },
    getFarmData:function(){
        let _this=this;
        this.api.ajax('farm/api/getCommonData',{},function(ret){
            // console.log(ret)
            let farmSetData=ret.data;
            if(farmSetData.farmSetData.bar_title.length<2){
                farmSetData.farmSetData.bar_title = _this.siteInfo.name;
            }
            farmSetData.farmSetData.background_color=_this.siteInfo.skin_color;
            _this.globalData.tarbar = farmSetData.tarbar;

            _this.tarbar = "app.js的tarbar";
   
            _this.api.setStorage("kejia_farm_setData",farmSetData.farmSetData);
            _this.api.setStorage("kejia_farm_tarbar",farmSetData.tarbar);
            wx.setNavigationBarTitle({
                title: ret.data.farmSetData.bar_title
            })
        });
    },
    getHomeData:function(){
        let _this=this;
        _this.api.ajax('farm/api/page',{},function(ret){
            _this.api.setStorage("kejia_farm_weather",ret.data.page.weather.weather);
            _this.api.setStorage("kejia_farm_weatherSet",ret.data.page.weather.weatherSet);
            _this.api.setStorage("kejia_farm_page",ret.data.page.page);
        });
    },
    tarbar:"原始",
    globalData: {
        userInfo: null,
        uid: "",
        sessionid: "",
        sysData: {},
        isIphoneX: !1,
        screenHeight: 0,
        Proportion: 0,
        isFullScreen: !1,
        setData:{},
        tarbar: [
        //     {
        //     path:'kejia_farm/pages/HomePage/index/index',
        //     name:'首页',
        //     color:'#666666',
        //     select_color:'#54beab',
        //     icon: '/kejia_farm/images/home.png',
        //     select_icon: '/kejia_farm/images/home_active.png'
        // },{
        //     path:'kejia_farm/pages/land/landList/index',
        //     name:'租地',
        //     color:'#666666',
        //     select_color:'#54beab',
        //     icon: '/kejia_farm/images/land.png',
        //     select_icon: '/kejia_farm/images/land_active.png'
        // },{
        //     path:'kejia_farm/pages/shop/Adopt/index',
        //     name:'认养',
        //     color:'#666666',
        //     select_color:'#54beab',
        //     icon: '/kejia_farm/images/adopt.png',
        //     select_icon: '/kejia_farm/images/adopt_active.png'
        // },
        // {
        //     path:'kejia_farm/pages/user/center/index',
        //     name:'我的',
        //     color:'#666666',
        //     select_color:'#54beab',
        //     icon: '/kejia_farm/images/user.png',
        //     select_icon: '/kejia_farm/images/user_active.png'
        // }
    ]
    }
});