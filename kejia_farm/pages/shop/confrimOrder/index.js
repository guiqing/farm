var a = new getApp;
Page({
    data: {
        address: "",
        phone: "",
        userName: "",
        goodsData: [],
        count: "",
        totalPrice: [],
        copyTotalPrice: 0,
        cartData: [],
        is_buy_type: 1,
        goods_id: "",
        cart_id: "",
        spec_id: "",
        send_price: 0,
        couponCount: 0,
        userCoupon: [],
        farmSetData: [],
        order_id: 0,
        isIphoneX: a.globalData.isIphoneX,
        recovery_method: []
    },
    onLoad: function (t) {
        var e = t.goodsid,
            o = t.spec_id,
            i = t.cart_id,
            r = t.count,
            s = wx.getStorageSync("kejia_farm_uid"),
            c = this,
            n = a.siteInfo.uniacid,
            d = wx.getStorageSync("kejia_farm_setData"),
            u = 1;
        2 == d.recovery_method && (u = 2), c.setData({
            farmSetData: d,
            recovery_method: u
        }), e && (a.api.ajax(
            "farm/api/getSureGoods",
            {
                // op: "getSureGoods",
                uniacid: n,
                goods_id: e,
                spec_id: o,
                count: r,
                uid: s
            },
            function (a) {
                a.data.goodsData;
                var t = a.data.totalPrice;
                2 == u && (t = parseFloat(t - a.data.send_price).toFixed(2)), c.setData({
                    count: r,
                    totalPrice: t,
                    goods_id: e,
                    goodsData: a.data.goodsData,
                    copyTotalPrice: a.data.totalPrice,
                    spec_id: o || "",
                    send_price: a.data.send_price,
                    couponCount: a.data.couponCount
                })
            }
        ,null,null,'POST'), a.util.setNavColor(n)), i && a.api.ajax(
            "farm/api/getBuyCartData",
            {
                // op: "getBuyCartData",
                uniacid: n,
                uid: s,
                cart_id: i
            },
            function (a) {
                c.setData({
                    cartData: a.data.cartData,
                    is_buy_type: 2,
                    totalPrice: a.data.totalPrice,
                    copyTotalPrice: a.data.totalPrice,
                    cart_id: i,
                    send_price: a.data.send_price,
                    couponCount: a.data.couponCount
                })
            }
        )
    },
    chooseAddress: function (a) {
        var t = this;
        wx.chooseAddress({
            success: function (a) {
                t.setData({
                    address: a.provinceName + a.cityName + a.countyName + a.detailInfo,
                    userName: a.userName,
                    phone: a.telNumber
                })
            },
            fail: function (a) {
                wx.showModal({
                    title: "提示",
                    content: "您上次拒绝了授权收获地址",
                    confirmText: "前去授权",
                    success: function (a) {
                        a.confirm ? wx.reLaunch({
                            url: "../../user/center/index?is_tarbar=true"
                        }) : a.cancel && console.log("用户点击取消")
                    }
                })
            }
        })
    },
    changeRecoveryMethod: function (a) {
        var t = a.currentTarget.dataset.state,
            e = this.data,
            o = e.totalPrice,
            i = e.send_price,
            r = e.copyTotalPrice;
        o = 2 == t ? parseFloat(o - i).toFixed(2) : r, this.setData({
            recovery_method: t,
            totalPrice: o
        })
    },
    addCount: function (a) {
        var t = this.data.goodsData,
            e = parseInt(this.data.count) + 1;
        if (1 == t.is_open_sku) o = parseFloat(this.data.goodsData.specVal.price * e) + parseFloat(this.data.send_price);
        else var o = parseFloat(t.price * e) + parseFloat(this.data.send_price);
        this.setData({
            count: e,
            totalPrice: o,
            copyTotalPrice: o
        })
    },
    reduceCount: function (a) {
        if (this.data.count > 1) {
            var t = this.data.goodsData,
                e = parseInt(this.data.count) - 1;
            if (1 == t.is_open_sku) o = parseFloat(this.data.goodsData.specVal.price * e) + parseFloat(this.data.send_price);
            else var o = parseFloat(t.price * e) + parseFloat(this.data.send_price);
            this.setData({
                count: e,
                totalPrice: o,
                copyTotalPrice: o
            })
        }
    },
    selectCoupon: function (a) {
        var t = this.data.copyTotalPrice - this.data.send_price;
        wx.navigateTo({
            url: "../../user/coupon/useCoupon/index?type=1&totalPrice=" + t
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
    },
    subOrder: function (t) {
        var e = this,
            o = a.siteInfo.uniacid,
            i = wx.getStorageSync("kejia_farm_uid"),
            r = e.data.is_buy_type,
            s = t.detail.value.remark,
            c = e.data,
            n = (c.order_id, c.userName),
            d = c.address,
            u = c.phone,
            p = c.userCoupon,
            l = c.send_price,
            _ = c.totalPrice,
            h = c.recovery_method,
            g = 0,
            f = 0;
        if ("" != p && (g = p.coupon.id, f = p.coupon.coupon_price), 1 == h && ("" == n || "" == d || "" == u)) return wx.showToast({
            title: "请选择收获地址",
            icon: "none"
        }), !1;
        if (2 != h || (n = t.detail.value.userName, u = t.detail.value.phone, "" != n && "" != u)) {
            if (1 == r) var y = e.data.goods_id,
                m = e.data.count,
                w = e.data.spec_id,
                x = {
                    // op: "addOrder",
                    address: d,
                    name: n,
                    phone: u,
                    uniacid: o,
                    goods_id: y,
                    count: m,
                    uid: i,
                    remark: s,
                    is_buy_type: 1,
                    spec_id: w,
                    coupon_id: g,
                    coupon_price: f,
                    send_price: l,
                    totalPrice: _,
                    recovery_method: h
                };
            else var v = e.data.cart_id,
                x = {
                    // op: "addOrder",
                    address: d,
                    name: n,
                    phone: u,
                    uniacid: o,
                    cart_id: v,
                    uid: i,
                    remark: s,
                    is_buy_type: 2,
                    coupon_id: g,
                    coupon_price: f,
                    send_price: l,
                    totalPrice: _,
                    recovery_method: h
                };
            a.api.ajax(
                "farm/api/addOrder",
                x,
                function (t) {
                    if(t.data.order_id){
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1,
                            success: function () {
                                wx.redirectTo({
                                    url: "../orderList/index"
                                })
                            }
                        })
                    }
                    return ;
                    if (1 == t.data.code) {
                        var i = t.data.order_id;
                        e.setData({
                            order_id: i
                        }), a.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                op: "getShopPayOrder",
                                orderid: i,
                                uniacid: o,
                                file: "shop"
                            },
                            cachetime: "0",
                            success: function (t) {
                                if (t.data && t.data.data && !t.data.errno) {
                                    var e = t.data.data.package;
                                    wx.requestPayment({
                                        timeStamp: t.data.data.timeStamp,
                                        nonceStr: t.data.data.nonceStr,
                                        package: t.data.data.package,
                                        signType: "MD5",
                                        paySign: t.data.data.paySign,
                                        success: function (t) {
                                            wx.showLoading({
                                                title: "加载中"
                                            }), a.util.request({
                                                url: "entry/wxapp/shop",
                                                data: {
                                                    order_id: i,
                                                    op: "sendMsg",
                                                    uniacid: o,
                                                    prepay_id: e
                                                },
                                                success: function () {
                                                    wx.showModal({
                                                        title: "提示",
                                                        content: "支付成功",
                                                        showCancel: !1,
                                                        success: function () {
                                                            wx.redirectTo({
                                                                url: "../orderList/index"
                                                            })
                                                        }
                                                    }), wx.hideLoading()
                                                }
                                            })
                                        },
                                        fail: function (a) {
                                            wx.showModal({
                                                title: "系统提示",
                                                content: "您取消了支付!",
                                                showCancel: !1,
                                                success: function (a) {
                                                    a.confirm && wx.redirectTo({
                                                        url: "../orderList/index"
                                                    })
                                                }
                                            }), wx.hideLoading()
                                        }
                                    })
                                } else console.log("fail1")
                            },
                            fail: function (a) {
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
                            }
                        })
                    } else wx.showModal({
                        title: "提示",
                        content: "订单生成失败！",
                        showCancel: !1
                    })
                }
            ,null,null,'POST')
        } else wx.showToast({
            title: "请填写取货信息",
            icon: "none"
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