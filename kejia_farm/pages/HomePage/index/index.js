var a = new getApp,
    t=a.siteInfo.uniacid;
    let api=require('../../../../utils/api.js'),
        config=require('../../../../siteinfo.js');

Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        setData: wx.getStorageSync("kejia_farm_setData"),
        weather: [],
        loading: !0,
        mockView: 4,
        user_uid: 0,
        page: [],
        tarbar: wx.getStorageSync("kejia_farm_tarbar"),
        scrollTop: 0,
        is_loading: !1,
        nowTime: "",
        oldTime: "",
        isBarHidden: !1,
        barDistance: 0,
        appTest:a.tarbar,
        
        msgList:[{
            title:"智慧农场销售联系方式",
        },{
            title:"如何发展我国家庭农场？了解国内外家庭农场发展模式。",
        },{
            title:"智慧农场新版本内测",
        }],

        advert3:{
            id: 3, 
            type: "advert", 
            selectType: 3, 
            height: 150, 
            adLists: [{
                img:"https://kejia.cqkejia.com/images/17/2019/01/GvW5V2YDVVBvVfvqV1bKBv5zVbf1M1.jpg",
            },{
                img:"https://kejia.cqkejia.com/images/17/2019/01/GvW5V2YDVVBvVfvqV1bKBv5zVbf1M1.jpg",
            },{
                img:"https://kejia.cqkejia.com/images/17/2019/01/GvW5V2YDVVBvVfvqV1bKBv5zVbf1M1.jpg",
            }], 
            opeartion_imgs_id: 2
        },
        advert1:{
            id: 1, 
            type: "advert", 
            selectType: 1, 
            height: 150, 
            adLists: [{
                img:"https://kejia.cqkejia.com/images/17/2019/01/GvW5V2YDVVBvVfvqV1bKBv5zVbf1M1.jpg",
            }], 
            opeartion_imgs_id: 2
        },
      
        //小提示
        showView: false
    },
    onLoad: function (e) {
        let _this=this;
        // let menu= api.getStorage("kejia_farm_tabbar");
        // console.log(menu);
        // _this.setData({
        //     appTest: a.tarbar,
        //     tarbar: menu,
        // }); 
        let hasReload=api.getStorage("kejia_farm_hasReload");
        if(hasReload){
            console.log("从缓存读取数据");
            let page = api.getStorage("kejia_farm_page");
            let weather=api.getStorage("kejia_farm_weather");
            let weatherSet=api.getStorage("kejia_farm_weatherSet");
            let tarbar = api.getStorage("kejia_farm_tarbar");
            let setData = api.getStorage("kejia_farm_setData");
            
            _this.setData({
                page:page,
                weather: weather,
                weatherSet: weatherSet,
                tarbar:tarbar,
                setData:setData,
                loading: !1   
            });
            wx.setNavigationBarTitle({
                title: setData.bar_title
            })
           
            _this.setData({
                showView:true
            });
            setTimeout(() => {
                _this.setData({
                    showView:false
                });
            }, 4000);
            let s={},list=_this.data.page;
            for(var index in list){
                switch(list[index].type){
                    case "navigation":s.navigation=list[index];break;
                    case "information":s.information=list[index];break;
                    case "weather":s.weather=list[index];break;
                    default:break;
                }
            }
            let menus=[]
            _this.setData({
                mk:s
            });
        }else{
            _this.getFarmData();  
        }

        let userId=e.user_uid;
        void 0 != userId && 0 != userId && _this.setData({
            user_uid: userId
        });
     
    },
    onReady: function () {
        // setTimeout(function () {
        //     var a = this;
        //     a.setData({
        //         showView: !a.data.showView
        //     })
        // }.bind(this), 5e3)
    },
    onPageScroll: function (a) {
        var t = a.scrollTop;
        this.setData({
            scrollTop: t
        })
    },
    /**
     * 获取首页数据
     */
    getHomeData:function(){
        console.log("重新加载首页数据");
        let _this=this;
        api.ajax('farm/api/page',{},function(ret){
            api.setStorage("kejia_farm_weather",ret.data.page.weather.weather);
            api.setStorage("kejia_farm_weatherSet",ret.data.page.weather.weatherSet);
            api.setStorage("kejia_farm_page",ret.data.page.page);
            api.setStorage("kejia_farm_hasReload",true);  //是否加载了数据
            _this.setData({
                page:ret.data.page.page,
                weather: ret.data.page.weather.weather,
                weatherSet: ret.data.page.weather.weatherSet,
                loading: !1,
                icon: ret.data.icon || []     
            });
            _this.setData({
                showView:true
            });
            setTimeout(() => {
                _this.setData({
                    showView:false
                });
            }, 4000);
            let s={},list=_this.data.page;
            for(var index in list){
                switch(list[index].type){
                    case "navigation":s.navigation=list[index];break;
                    case "information":s.information=list[index];break;
                    case "weather":s.weather=list[index];break;
                    default:break;
                }
            }
            let menus=[]
            _this.setData({
                mk:s
            });
        });
    },
    /**
     * 获取农场配置
     */
    getFarmData:function(){
        console.log("重新加载农场配置");
        let _this=this;
        api.ajax('farm/api/getCommonData',{},function(ret){
            let farmSetData=ret.data;
            if(farmSetData.farmSetData.bar_title.length<2){
                farmSetData.farmSetData.bar_title = config.name;
            }
            farmSetData.farmSetData.background_color=config.skin_color;         
            api.setStorage("kejia_farm_tarbar",farmSetData.tarbar);
            api.setStorage("kejia_farm_setData",farmSetData.farmSetData);
            _this.setData({
                setData:farmSetData.farmSetData,
                tarbar:farmSetData.tarbar,
            });
            wx.setNavigationBarTitle({
                title: ret.data.farmSetData.bar_title
            })
            _this.getHomeData();
        });
    },

    // getMusic: function () {
    //     var t = a.siteInfo.uniacid;
    //     return new Promise(function (e, n) {
    //         a.util.request({
    //             url: "entry/wxapp/class",
    //             data: {
    //                 op: "getCommonData",
    //                 action: "index",
    //                 control: "home",
    //                 uniacid: t
    //             },
    //             success: function (a) {
    //                 e(a)
    //             }
    //         })
    //     })
    // },
    
    /**
     * 农场天气
     */
    // getWeatherData: function () {
    //     var e = this;
    //     a.util.request({
    //         url: "entry/wxapp/class",
    //         data: {
    //             op: "getNowWeatherData",
    //             uniacid: t,
    //             action: "index",
    //             control: "home"
    //         },
    //         success: function (a) {
    //             e.setData({
    //                 weather: a.data.weather,
    //                 weatherSet: a.data.weatherSet
    //             })
    //         }
    //     })
    // },
    preventTouchMove: function () {},
    intoVetInfo: function (a) {
        var t = a.currentTarget.dataset.title;
        this.data.setData.vet_title && (t = this.data.setData.vet_title), wx.navigateTo({
            url: "/kejia_farm/pages/shop/VeterinaryIntroduce/index?title=" + t
        })
    },
    onShareAppMessage: function () {
        var _this=this;
        var a = wx.getStorageSync("kejia_farm_setData");
        let user_uid=wx.getStorageSync("kejia_farm_uid");
        return {
            path: "kejia_farm/pages/HomePage/index/index?&user_uid="+user_uid,
            success: function (a) {},
            title: _this.data.setData.share_home_title
        }
    },
    onPullDownRefresh: function (t) {
        var _this=this;
       // _this.getFarmData();
        _this.getFarmData();
        // wx.showLoading({
        //     title: "玩命加载中..."
        // });
        // var e = this,
        //     n = a.siteInfo.uniacid;
        // a.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         uniacid: n,
        //         op: "getCommonData",
        //         action: "index",
        //         control: "home",
        //         refresh: !0
        //     },
        //     success: function (a) {
        //         wx.setStorageSync("kejiaFarmTarbar", a.data.tarbar), wx.setStorageSync("kejia_farm_setData", a.data.farmSetData), e.setData({
        //             tarbar: a.data.tarbar,
        //             setData: a.data.farmSetData
        //         }), e.getFirstData(), wx.stopPullDownRefresh(), wx.hideLoading()
        //     }
        // })
    },
    // getFirstData: function () {
    //     var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
    //         e = this,
    //         n = a.siteInfo.uniacid,
    //         r = wx.getStorageSync("kejia_farm_uid"),
    //         i = wx.getStorageSync("kejia_farm_setData");
    //     a.util.request({
    //         url: "entry/wxapp/class",
    //         data: {
    //             op: "getHomeData",
    //             action: "index",
    //             control: "home",
    //             uniacid: n,
    //             uid: r,
    //             refresh: t
    //         },
    //         success: function (a) {
    //             var t = new Array;
    //             a.data.weather && (t = a.data.weather, wx.setStorageSync("kejia_farm_weather", t));
    //             var r = new Array;
    //             a.data.weatherSet && (r = a.data.weatherSet);
    //             var o = !1;
    //             "search" == a.data.page[0].type && (o = !0), o || (e.data.barDistance = 128, e.data.isIphoneX && (e.data.barDistance = 176)), e.setData({
    //                 page: a.data.page,
    //                 weather: t,
    //                 loading: !1,
    //                 weatherSet: r,
    //                 icon: a.data.icon,
    //                 isBarHidden: o,
    //                 barDistance: e.data.barDistance
    //             }), wx.setStorageSync("kejiaFarmHomePage", a.data);
    //             var s = parseInt((new Date).valueOf()) + 18e5;
    //             wx.setStorageSync("kejiaFarmHomePage_time" + n, s), i && i.bar_title && wx.setNavigationBarTitle({
    //                 title: i.bar_title
    //             })
    //         }
    //     })
    // },
    onShow: function () {
        var t = this,
            e = this.data.user_uid;
        void 0 != e && 0 != e && (a.loginBindParent(e, uid), t.setData({
            user_uid: e
        }))
    }
});