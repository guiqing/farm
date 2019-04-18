var n = new getApp;
let api=require("../../../utils/api");
Page({
    data: {},
    onLoad: function (a) {
        n.util.setNavColor(n.siteInfo.uniacid)
    },
    updateUserInfo: function (e) {
        console.log(e);
        let data={
            signature: e.detail.signature,
            rawData: e.detail.rawData,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code:e.detail.code          
        }
        api.ajax('farm/api/login',data,function(ret){

            api.toast("登录成功","success");
            wx.setStorageSync("kejia_farm_uid", ret.data.id),
            wx.setStorageSync("kejia_farm_wxInfo", e.detail.userInfo),
            setTimeout(function () {
                wx.navigateBack();
            }, 1000);
        },null,null,'POST');
  
        return ;
        if ("getUserInfo:fail auth deny" == n.detail.errMsg) return wx.showModal({
            title: "提示",
            content: "您取消了授权",
            showCancel: !1
        }), !1;
        var a = new getApp,
            e = a.siteInfo.uniacid;
        a.util.getUserInfo(function (n) {
            wx.showLoading({
                title: "登录中..."
            }), console.log(n), wx.setStorageSync("kejia_farm_uid", n.memberInfo.uid), wx.setStorageSync("kejia_farm_sessionid", n.sessionid), wx.setStorageSync("kejia_farm_wxInfo", n.wxInfo);
            var t = n.wxInfo.avatarUrl,
                i = n.wxInfo.nickName,
                o = n.memberInfo,
                s = {
                    op: "login",
                    action: "index",
                    control: "home",
                    avatar: o.avatar,
                    uid: o.uid,
                    nickname: o.nickname,
                    uniacid: e,
                    wxNickName: i,
                    wxAvatar: t
                };
            a.util.request({
                url: "entry/wxapp/class",
                data: s,
                success: function (n) {
                    if (wx.setStorageSync("kejia_farm_uid", n.data.uid), 0 == n.data.code) {
                        var e = wx.getStorageSync("farm_share_uid");
                        void 0 != e && 0 != e && a.loginBindParent(e, o.uid), wx.showToast({
                            title: "登陆成功",
                            icon: "none",
                            success: function (n) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    } else wx.showToast({
                        title: "登录失败",
                        icon: "none"
                    });
                    wx.hideLoading()
                }
            })
        }, n.detail)
    },
    onReachBottom: function () {}
});