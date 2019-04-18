var a = require("../../../../wxParse/wxParse.js"),
    t = new getApp,
    e = t.siteInfo.uniacid,
    n = wx.getStorageSync("kejia_farm_uid");
var api=require("../../../../utils/api.js");
Page({
    data: {
        specVal: [],
        sku_name: "",
        count: 0,
        aid: "",
        animalData: [],
        totalPrice: 0,
        copyTotalPrice: 0,
        couponCount: 0,
        userCoupon: [],
        userName: "",
        userTel: "",
        state: !1,
        rules: !0,
        farmSetData: [],
        order_id: 0
    },
    onLoad: function (o) {
        var i = 0,
            r = wx.getStorageSync("kejia_farm_buy_animal"),
            u = o.aid,
            s = o.count;
        i = s * r.price, this.setData({
            count: s,
            aid: u,
            animalData: r,
            totalPrice: i,
            copyTotalPrice: i
        });
        var c = this;
        var e = wx.getStorageSync("kejia_farm_setData");
        console.log(e);
      a.wxParse("article", "html", e.farm_rule, c, 5);
        c.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        })
        // t.util.request({
        //     url: "entry/wxapp/coupon",
        //     data: {
        //         op: "getUseCouponCount",
        //         uid: n,
        //         uniacid: e,
        //         type: 3,
        //         totalprice: i
        //     },
        //     success: function (t) {
        //         if (c.setData({
        //                 couponCount: t.data.couponCount,
        //                 userName: t.data.user.truename,
        //                 userTel: t.data.user.phone
        //             }),wx.getStorageSync("kejia_farm_setData")) {
        //             var e = wx.getStorageSync("kejia_farm_setData");
        //             a.wxParse("article", "html", e.animal_rule, c, 5)
        //         }
        //     }
        // }), c.setData({
        //     farmSetData: wx.getStorageSync("kejia_farm_setData")
        // })
    },
    useCoupon: function (a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=3&totalPrice=" + t
        })
    },
    onShow: function () {
        var a = this.data.copyTotalPrice;
        if (wx.getStorageSync("user_coupon")) {
            var t = wx.getStorageSync("user_coupon");
            wx.removeStorageSync("user_coupon"), this.setData({
                userCoupon: t,
                totalPrice: parseFloat(a - t.coupon.coupon_price).toFixed(2)
            })
        } else this.setData({
            userCoupon: [],
            totalPrice: a
        })
    },
    surePay: function (a) {
      let _this = this;
        var n = this,
            o = n.data.userName,
            i = n.data.userTel;
        if ("" == o) return wx.showToast({
            title: "请填写姓名！"
        }), !1;
        if ("" == i) return wx.showToast({
            title: "请填写联系电话"
        }), !1;
        var r = n.data.rules,
            u = n.data.count,
            s = n.data.aid,
            c = n.data.specVal,
            d = n.data.totalPrice,
            l = n.data.userCoupon,
            p = 0,
            f = 0,
            w = wx.getStorageSync("kejia_farm_uid");
        "" != l && (console.log(l), p = l.coupon.id, f = l.coupon.coupon_price);
        var g = n.data.order_id;
        if (!r) return wx.showModal({
            title: "提示",
            content: "请先阅读并同意农场协议",
            showCancel: !1
        }), !1;
        if(_this.data.order_id && _this.data.order_id!=0){
          _this.farmWxPay(_this.data.order_id);
        }else{
          api.ajax('farm/api/sureAdoptAnimal', {
            // op: "sureAdoptAnimal",
            uid: w,
            // uniacid: e,
            count: u,
            spec_id: c.id,
            aid: s,
            coupon_id: p,
            coupon_price: f,
            username: o,
            phone: i,
            totalPrice: d,
            order_id: g
          }, function (a) {
            let wx_orderId = a.data.order_id;
            //console.log(wx_orderId);
            if (wx_orderId) {
              n.setData({
                order_id: wx_orderId
              });
              _this.farmWxPay(wx_orderId);

            }
          }, null, null, 'POST');
        }
       
    },
  farmWxPay(wx_orderId){
      api.ajax(
        "farm/api/wxpay",
        {
          out_trade_no: wx_orderId,
          type: 'animal'
        },
        function (a) {
          if (a.data && a.data.msg) {
            var n = a.data.msg.package;
            wx.requestPayment({
              timeStamp: a.data.msg.timeStamp,
              nonceStr: a.data.msg.nonceStr,
              package: a.data.msg.package,
              signType: "MD5",
              paySign: a.data.msg.paySign,
              success: function (a) {
                wx.showModal({
                  title: "提示",
                  content: "支付成功",
                  showCancel: !1,
                  success: function () {
                    wx.redirectTo({
                      url: "../../user/Animal/index?current=2"
                    })
                  }
                })
              },
              fail: function (a) {
                wx.showModal({
                  title: "系统提示",
                  content: "您取消了支付!",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm
                  }
                }), wx.hideLoading()
              }
            })
          } else console.log("fail1")
        }, null, null, 'POST')
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
    showModal: function () {
        this.setData({
            state: !0
        })
    },
    preventTouchMove: function () {},
    hideModal: function () {
        this.setData({
            state: !1
        })
    }
});