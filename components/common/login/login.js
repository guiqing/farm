let api=require("../../../utils/api");
Component({
    properties: {
       
    },
    data: {
        isAuth: false,
        userInfo:''
    },
    // lifetimes: {
    //     attached() {
    //         var _this = this;
    //         wx.getSetting({
    //             success(res) {
    //                 if (res.authSetting['scope.userInfo']) {
    //                     _this.setData({
    //                         isAuth: true
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // },
    methods: {
        updateUserInfo: function (e) {
            var _this = this;
            // console.log(e)
            if(e.detail.errMsg=='getUserInfo:ok'){
                _this.login();
            }else{
                api.toast('未授权成功')
            }
        },
        login: function () {
            var _this = this;
            wx.login({
                success(res) {
                    // console.log(res);
                    if (res.code) {
                        var code = res.code;
                        wx.getUserInfo({
                            lang: "zh_CN",
                            success(ret) {
                                ret.code=code;
                                _this.triggerEvent('getcode', ret);
                            }
                        });
                    } else {
                        api.toast("没有获取到登录信息，请重试");
                    }
                }
            });
        },
    }
})