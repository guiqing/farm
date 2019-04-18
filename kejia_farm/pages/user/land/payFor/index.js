var a = require("../../../../../wxParse/wxParse.js"),
    t = new getApp;
    let api=require("../../../../../utils/api.js");
Page({
    data: {
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        selectlands: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        lands: [],
        landLimit: [],
        landLimitArr: [],
        couponCount: 0,
        userCoupon: [],
        land_method: "",
        selectLand: [],
        landDetail: [],
        day: [],
        alias_day: [],
        currentIndex: 0,
        icon: [],
        order_id: 0,
        farmSetData: [],
        is_load: !1
    },
    onLoad: function (e) {
        let _this = this;
        // let setData=wx.getStorageSync("kejia_farm_setData");
        // a.wxParse("article", "html", setData.farm_rule, c, 5);

        var n = this,
            i = t.siteInfo.uniacid,
            o = wx.getStorageSync("kejia_farm_uid"),
            d = e.land_id,
            r = wx.getStorageSync("selectSpec");

        let data={
            lid: d,
            selectLand: JSON.stringify(r),
            land_method: e.land_method,
            uid: o  
        };    
        api.ajax('farm/api/getPayLand',data,function(t){
            let userInfo=api.getStorage('kejia_farm_wxInfo');
            // userName=t.data.user.phone ? t.data.user.phone : '';
            // userTel=t.data.user.phone ? t.data.user.phone : '';
            n.setData({
                land_method: e.land_method,
                landDetail: t.data.landDetail,
                selectLand: r,
                landLimit: t.data.landLimit,
                day: t.data.day,
                alias_day: t.data.alias_day,
                totalPrice: t.data.total_price,
                couponCount: t.data.couponCount,
                // userName: userName,
                // userTel: userTel,
                icon: t.data.icon,
                is_load: !0,
                farmSetData: wx.getStorageSync("kejia_farm_setData")
            }),a.wxParse("article", "html", _this.data.farmSetData.farm_rule, n, 5), n.totalPrice()
        },null,null,'POST');
        // t.util.request({
        //     url: "entry/wxapp/class",
        //     method: "POST",
        //     data: {
        //         op: "getPayLand",
        //         action: "land",
        //         uniacid: i,
        //         lid: d,
        //         selectLand: JSON.stringify(r),
        //         land_method: e.land_method,
        //         uid: o
        //     },
        //     success: function (t) {
        //         n.setData({
        //             land_method: e.land_method,
        //             landDetail: t.data.landDetail,
        //             selectLand: r,
        //             landLimit: t.data.landLimit,
        //             day: t.data.day,
        //             alias_day: t.data.alias_day,
        //             totalPrice: t.data.total_price,
        //             couponCount: t.data.couponCount,
        //             userName: t.data.user.truename,
        //             userTel: t.data.user.phone,
        //             icon: t.data.icon,
        //             is_load: !0,
        //             farmSetData: wx.getStorageSync("kejia_farm_setData")
        //         }), "" != t.data.farmRule.value && a.wxParse("article", "html", t.data.farmRule.farm_rule, n, 5), n.totalPrice()
        //     }
        // }), t.util.setNavColor(i)
    },
    bindPickerChange: function (a) {
        for (var e = this, n = a.currentTarget.dataset.id, i = e.data.lands, o = t.siteInfo.uniacid, d = wx.getStorageSync("kejia_farm_uid"), r = 0; r < i.length; r++) n == i[r].id && (i[r].select_index = a.detail.value), e.setData({
            lands: i
        });
        this.totalPrice();
        var s = e.data.copyTotalPrice;
        t.util.request({
            url: "entry/wxapp/coupon",
            data: {
                op: "getLandCoupon",
                uniacid: o,
                uid: d,
                total_price: s
            },
            success: function (a) {
                e.setData({
                    couponCount: a.data.couponCount,
                    userCoupon: []
                })
            }
        })
    },
    totalPrice: function () {
        var a = this,
            t = a.data.land_method,
            e = 0,
            n = a.data.landLimit;
        if (2 == t) {
            var i = this.data.selectLand,
                o = this.data.currentIndex;
            // e=parseFloat(e)+i[0].price*n[o].day;
            // console.log(e);
            i.map(function (a) {
                e = parseFloat(e) + a.price * n[o].day
            });
            a.setData({
                totalPrice: parseFloat(e).toFixed(2),
                copyTotalPrice: parseFloat(e).toFixed(2)
            })
        } else {
            for (var d = a.data.lands, r = 0; r < d.length; r++) e = parseFloat(d[r].selectArea * d[r].landLimit[d[r].select_index].price * d[r].landLimit[d[r].select_index].day) + parseFloat(e);
            a.setData({
                totalPrice: parseFloat(e).toFixed(2),
                copyTotalPrice: parseFloat(e).toFixed(2)
            })
        }
    },
    bindLimitChange: function (a) {
        var t = a.detail.value;
        this.setData({
            currentIndex: t
        }), this.totalPrice()
    },
    newLandPay: function (a) {
      let _this =this;
        var e = this,
            n = e.data.userName,
            i = e.data.userTel;
        if ("" == n) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == i) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        var o = e.data.selectLand,
            d = e.data.landLimit,
            r = e.data.currentIndex,
            s = e.data.totalPrice,
            c = e.data.rules,
            l = t.siteInfo.uniacid,
            u = wx.getStorageSync("kejia_farm_uid"),
            p = e.data.userCoupon,
            f = 0,
            h = 0;
        if ("" != p && (f = p.coupon.id, h = p.coupon.coupon_price), !c) return wx.showModal({
            title: "提示",
            content: "请先阅读并同意农场协议",
            showCancel: !1
        }), !1;
        if (0 == u || "" == u) return wx.navigateTo({
            url: "/kejia_farm/pages/login/index"
        }), !1;
        var g = e.data.order_id,
            m = "../../user/land/personLand/index";
        wx.getStorageSync("enter_is_play") && (m = "../../../../kejia_game/pages/farm/index");
         if (_this.data.order_id && _this.data.order_id!=0) {
          _this.farmWxPay(_this.data.order_id,m);
        }else{
           api.ajax('farm/api/insertLandOrder',
             {
               uid: u,
               uniacid: l,
               total_price: s,
               username: n,
               phone: i,
               coupon_id: f,
               coupon_price: h,
               selectLand: JSON.stringify(o),
               lid: e.data.landDetail.id,
               limit_id: d[r].id,
               order_id: g,
             }, function (a) {
               g = a.data.order_id, e.setData({
                 order_id: g
               });
               _this.farmWxPay(g,m)


             }, null, null, 'POST');
        } 
        
    },
    farmWxPay (g,m) {
      var n = {
        out_trade_no: g,
        type: 'land'
      };
      api.ajax('farm/api/wxpay', n, function (a) {
        console.log(a);
        if (a.data && a.data.msg) {
          var e = a.data.msg.package;
          wx.requestPayment({
            timeStamp: a.data.msg.timeStamp,
            nonceStr: a.data.msg.nonceStr,
            package: a.data.msg.package,
            signType: "MD5",
            paySign: a.data.msg.paySign,
            success: function (a) {
              console.log(a);
              api.alert("下单成功", null, function () {
                wx.redirectTo({
                  url: "../" + m
                })
              })
            },
            fail: function (a) {
              wx.showModal({
                title: "系统提示",
                content: "您取消了支付!",
                showCancel: !1,
                success: function (a) { }
              }), wx.hideLoading()
            }
          })
        } else console.log("fail1")
      },
        function (a) {
          console.log(a);
          "JSAPI支付必须传openid" == a.data.message ? wx.navigateTo({
            url: "/kejia_farm/pages/login/index"
          }) : wx.showModal({
            title: "系统提示",
            content: a.data.message ? a.data.message : "错误",
            showCancel: !1,
            success: function (a) {
              a.confirm
            }
          })
        }, null, 'POST');
    },
    preventTouchMove: function () {},
    hideModal: function () {
        this.setData({
            state: !1
        })
    },
    showModal: function () {
        this.setData({
            state: !0
        })
    },
    inputUserName: function (a) {
        var t = a.detail.value;
        this.setData({
            userName: t
        })
    },
    inputUserTel: function (a) {
        var t = a.detail.value;
        this.setData({
            userTel: t
        })
    },
    changeRules: function () {
        var a = this.data.rules;
        this.setData({
            rules: !a
        })
    },
    selectCoupon: function (a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../coupon/useCoupon/index?type=4&totalPrice=" + t
        })
    },
    onShow: function (a) {
        var t = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var e = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: e,
                totalPrice: parseFloat(t - e.coupon.coupon_price).toFixed(2)
            })
        } else this.setData({
            userCoupon: [],
            totalPrice: t
        })
    }
});