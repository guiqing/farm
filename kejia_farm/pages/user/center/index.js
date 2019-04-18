var a = new getApp;
let api=require("../../../../utils/api.js");
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        tarbar: wx.getStorageSync("kejia_farm_tarbar"),
        nickName: "",
        avatarUrl: "../../../images/icon/moren.png",
        back_img: "",
        noPayCount: 0,
        peiCount: 0,
        getCount: 0,
        is_admin: 2,
        setData: [],
        is_distributor: 0,
        aboutData: [],
        _userInfo: '',
        get userInfo() {
            return this._userInfo;
        },
        set userInfo(value) {
            this._userInfo = value;
        },
        styleType: 2,
        page: [],
        useuserInfos:{
            score:0,
            money:0,
            continue_day:0
        },
        usedList:[[{
            desc:'进入播种或摘取',
            icon:'icon-tudi1',
            iconColor:'#27d892',
            img:'/kejia_farm/images/wdtd.png',
            id:'1',
            name:'我的地块',
            select:true,
            type:'center_land',
            url:'user/land/personLand/index'
        },{
            desc:'认养实时信息',
            icon:'icon-jiaoyin',
            iconColor:'#a53f58',
            img:'/kejia_farm/images/wdry.png',
            id:'2',
            name:'认养',
            select:true,
            type:'center_animal',
            url:'user/Animal/index'
        }],[{
            id: 11, 
            name: "我的钱包", 
            icon: "icon-qianbao", 
            url: "user/wallet/index", 
            type: "center_wallet",
            desc:"余额详细与提现",
            iconColor:"#ff0000",
            select:true,
            img:'/kejia_farm/images/wdqb.png'
        },{
            id: 7, 
            name: "分享中心", 
            icon: "icon-center-fenxiao", 
            url: "distribution/index/index",
            desc:"分销分享赚钱",
            iconColor:"#ff8000",
            select:true,
            type:'center_sale',
            img:'/kejia_farm/images/fxzx.png'
        }]],
        moreList:[
            //     {
            //     icon:'icon-youhuiquan1',
            //     iconColor:'#c0c0c0',
            //     img:'/kejia_farm/images/wdyhq.png',
            //     id:6,
            //     name:'我的优惠券',
            //     select:true,
            //     type:'center_coupon',
            //     url:'user/coupon/myCoupon/index'
            // },
            
            // {
            //     icon:'icon-gift',
            //     iconColor:'#c0c0c0',
            //     img:'/kejia_farm/images/hddd.png',
            //     id:15,
            //     name:'活动订单',
            //     select:true,
            //     type:'center_active',
            //     url:''
            //     // url:'active/orderList/index'
            // },
            // {
            //     id: 15, 
            //     name: "投资订单", 
            //     icon: "icon-gift", 
            //     // url: "active/orderList/index", 
            //     url:'',
            //     type: "center_active",
            //     img:'/kejia_farm/images/tzdd.png'
            // },
            // {
            //     id: 8, 
            //     name: "农资", 
            //     icon: "icon-duihuanka", 
            //     url: "user/addCard/index", 
            //     type: "center_card",
            //     img:'/kejia_farm/images/dhk.png'
            // },
            // {
            //     id: 3, 
            //     name: "积分商城", 
            //     icon: "icon-jifen1", 
            //     // url: "shop/integral/exchange/index",
            //     url:"",
            //     img:'/kejia_farm/images/jfsc.png'
            // },
            {
                icon:'icon-position',
                iconColor:'#c0c0c0',
                img:'/kejia_farm/images/shdz.png',
                id:13,
                name:'收货地址',
                select:true,
                type:'center_address',
                url:''
            },{
                icon:'icon-issue',
                iconColor:'#c0c0c0',
                img:'/kejia_farm/images/cjwt.png',
                id:10,
                name:'常见问题',
                select:true,
                type:'center_issue',
                url:'HomePage/issue/index'
            },{
                icon:'icon-issue',
                iconColor:'#c0c0c0',
                img:'/kejia_farm/images/wdkf.png',
                id:10,
                name:'我的客服',
                select:true,
                type:'center_kefu',
                url:''
            }]

    },
    onLoad: function (t) {
        let _this=this;
        let tarbar=wx.getStorageSync("kejia_farm_tarbar");
        _this.setData({
            tarbar:tarbar
        });
        // let _this=this;
        // let uid=api.getStorage("kejia_farm_uid");
        // if(uid){
        //     _this.getCenterData();
        // }else{
        //     wx.navigateTo({
        //         url: "../../login/index"
        //     }) 
        // }
        // var n = this,
        //     e = wx.getStorageSync("kejia_farm_uid"),
            // i = a.siteInfo.uniacid,
            // r = wx.getStorageSync("kejia_farm_setData"),
            // o = !1;
        // t.is_tarbar && (o = t.is_tarbar);
        // wx.getStorageSync("kejia_farm_setData");
        // n.setData({
        //     setData: r,
        //     tarbar: wx.getStorageSync("kejiaFarmTarbar"),
        //     is_tarbar: o
        // });
        // try {
        //     var s = wx.getStorageSync("kejiaFarmCenter");
        //     s ? n.setData({
        //         is_admin: s.is_admin,
        //         aboutData: s.aboutData,
        //         back_img: s.back_img,
        //         page: s.page,
        //         noPayCount: s.noPayCount,
        //         peiCount: s.peiCount,
        //         getCount: s.getCount,
        //         styleType: s.page.currentType
        //     }) : n.getCenterData()
        // } catch (a) {
        //     n.getCenterData()
        // }
        // e ? n.getUserData() : wx.navigateTo({
        //     url: "../../login/index"
        // }), a.util.setNavColor(i)
    },
    getUserData: function () {
        var t = this,
            n = wx.getStorageSync("kejia_farm_uid"),
            e = a.siteInfo.uniacid;
        a.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getUserInfo",
                action: "index",
                control: "home",
                uid: n,
                uniacid: e
            },
            success: function (a) {
                a.data.userInfo.avatarurl && void 0 != a.data.userInfo.avatarurl && t.setData({
                    nickName: a.data.userInfo.nickname,
                    avatarUrl: a.data.userInfo.avatarurl,
                    noPayCount: a.data.noPayCount,
                    peiCount: a.data.peiCount,
                    getCount: a.data.getCount,
                    is_admin: a.data.is_admin,
                    is_distributor: a.data.userInfo.is_distributor,
                    userInfo: a.data.userInfo
                })
            }
        })
    },
    getCenterData: function () {
        let _this=this;
        api.ajax('farm/api/getCenterData',{
            uid:api.getStorage("kejia_farm_uid")
        },function(ret){
            let centerList=ret.data;
            _this.setData(centerList);
            _this.setData({
                isUpdate:1,
            });
        });
        // var t = this,
        //     n = wx.getStorageSync("kejia_farm_uid"),
        //     e = a.siteInfo.uniacid;
        // a.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         uniacid: e,
        //         action: "index",
        //         control: "home",
        //         op: "getCommonData"
        //     },
        //     success: function (i) {
        //         wx.setStorageSync("kejiaFarmTarbar", i.data.tarbar), wx.setStorageSync("kejia_farm_setData", i.data.farmSetData), t.setData({
        //             tarbar: i.data.tarbar,
        //             setData: i.data.farmSetData
        //         }), a.util.request({
        //             url: "entry/wxapp/class",
        //             data: {
        //                 op: "getCenterData",
        //                 action: "index",
        //                 control: "home",
        //                 uid: n,
        //                 uniacid: e
        //             },
        //             success: function (a) {
        //                 var n = !1;
        //                 a.data.userInfo && (n = a.data.userInfo.is_distributor), t.setData({
        //                     is_admin: a.data.is_admin,
        //                     aboutData: a.data.aboutData,
        //                     back_img: a.data.back_img,
        //                     page: a.data.page,
        //                     is_distributor: n,
        //                     noPayCount: a.data.noPayCount,
        //                     peiCount: a.data.peiCount,
        //                     getCount: a.data.getCount,
        //                     styleType: a.data.page.currentType
        //                 }), wx.setStorageSync("kejiaFarmCenter", a.data)
        //             }
        //         })
        //     }
        // })
    },
    onShow: function () {
        let _this=this;
        let uid=api.getStorage("kejia_farm_uid");
        let userinfo=api.getStorage("kejia_farm_wxInfo");
        if( uid && userinfo){
            _this.getCenterData();
            _this.setData({
                users:userinfo
            }) 
        }else {
            wx.navigateTo({
                url: "../../login/index"
            })  
        }
        // wx.getSetting({
        //     success(res) {
        //         if (res.authSetting['scope.userInfo']) {
        //             _this.setData({
        //                 isAuth: true
        //             });
        //             let uesrInfo=wx.getStorageSync("kejia_farm_wxInfo");
        //             if(!uesrInfo || !api.getStorage('kejia_farm_uid')){
        //                 wx.navigateTo({
        //                     url: "../../login/index"
        //                 }) 
        //             }else if(_this.data.isUpdate!=1){
        //                 _this.getCenterData();
        //                 _this.setData({
        //                     users:api.getStorage("kejia_farm_wxInfo")
        //                 });
        //             }
        //         }else{
        //             _this.setData({
        //                 isAuth: false
        //             });
        //             wx.navigateTo({
        //                 url: "../../login/index"
        //             }) 
        //         }
        //     }
        // });
        // var t = this,
        //     n = wx.getStorageSync("kejia_farm_wxInfo");
        // n && t.setData({
        //     avatarUrl: n.avatarUrl,
        //     nickName: n.nickName
        // });
        //this.getUserData()
    },
    chooseAddress: function (a) {
        wx.chooseAddress({
            success: function (a) {}
        })
    },
    intoOrder: function (a) {
        var t = a.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../../shop/orderList/index?status=" + t
        })
    },
    updateUserInfo: function (a) {
        var t = this,
            n = getApp(),
            e = n.siteInfo.uniacid;
        n.util.getUserInfo(function (a) {
            wx.setStorageSync("kejia_farm_uid", a.memberInfo.uid), wx.setStorageSync("kejia_farm_sessionid", a.sessionid), wx.setStorageSync("kejia_farm_wxInfo", a.wxInfo), console.log(a.wxInfo);
            var i = a.memberInfo,
                r = a.wxInfo.avatarUrl,
                o = a.wxInfo.nickName,
                s = i.uid;
            if (t.setData({
                    nickName: o,
                    avatarUrl: r
                }), !s) return wx.showModal({
                title: "提示",
                content: "获取用户UID失败",
                showCancel: !1
            }), !1;
            n.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: i.avatar,
                    nickname: i.nickname,
                    uid: s,
                    uniacid: e,
                    wxNickName: o,
                    wxAvatar: r
                },
                success: function (a) {
                    var t = wx.getStorageSync("farm_share_uid");
                    void 0 != t && 0 != t && n.loginBindParent(t, s), wx.showModal({
                        title: "提示",
                        content: a.data.msg,
                        showCancel: !1
                    })
                }
            })
        }, a.detail)
    },
    onPullDownRefresh: function (a) {
        let _this=this;
        _this.getCenterData();
        // var t = this,
        //     n = wx.getStorageSync("kejia_farm_wxInfo");
        // n && t.setData({
        //     avatarUrl: n.avatarUrl,
        //     nickName: n.nickName
        // }), t.getCenterData(), wx.stopPullDownRefresh()
    },
    intoAdmin: function (a) {
        wx.navigateTo({
            url: "../userCenter/index"
        })
    },
    callPhone: function (a) {
        var t = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        })
    },
    intoMenuDetail: function (a) {
        var t = this,
            n = a.currentTarget.dataset.menutype,
            e = a.currentTarget.dataset.url;
        if ("center_address" == n) wx.chooseAddress({
            success: function (a) {}
        });
        else if ("center_sale" == n) {
            var i = t.data.is_distributor;
            1 == i ? wx.navigateTo({
                url: "/kejia_farm/pages/distribution/index/index"
            }) : 2 == i ? wx.navigateTo({
                url: "/kejia_farm/pages/distribution/examine/index"
            }) : wx.navigateTo({
                url: "/kejia_farm/pages/distribution/addinfo/index"
            })
        }else "center_animal" == n ? wx.navigateTo({
            url: "/kejia_farm/pages/" + e + "?current=4"
        }) : "center_set" == n || ("center_funding" == n ? wx.navigateTo({
            url: "/kejia_funding/pages/orderList/index"
        }) : "center_active" == n ? wx.navigateTo({
            url: ""
        }) : "plugin_pt" == n ? wx.navigateTo({
            url: "/kejia_pt/pages/orderLists/index"
        }) : wx.navigateTo({
            url: "/kejia_farm/pages/" + e
        }))
    },
    intoScoreRecord: function (a) {
        wx.navigateTo({
            url: "/kejia_farm/pages/shop/integral/record/index"
        })
    },
    intoMoney: function () {
        wx.navigateTo({
            url: "/kejia_farm/pages/user/wallet/index"
        })
    },
    intoSign: function () {
        wx.navigateTo({
            url: "/kejia_farm/pages/shop/integral/index/index"
        })
    },
    showSystemInfo: function (t) {
        var n = "domain=" + a.siteInfo.siteroot + ";uid=" + wx.getStorageSync("kejia_farm_uid") + ";uniacid=" + a.siteInfo.uniacid;
        wx.showModal({
            title: "提示",
            content: n
        })
    }
});