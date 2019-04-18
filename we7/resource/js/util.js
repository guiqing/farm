let api=require("../../../utils/api.js");
let siteinfo=require("../../../siteinfo.js");
function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    }
}

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?"))
        for (var a = e.split("?")[1].split("&"), n = 0; n < a.length; n++) a[n].split("=")[0] && unescape(a[n].split("=")[1]) && (t[n] = {
            name: a[n].split("=")[0],
            value: unescape(a[n].split("=")[1])
        });
    return t
}

function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
        n = e.split("?")[1].match(a);
    return null != n ? unescape(n[2]) : null
}

function getSign(e, t, a) {
    var n = require("underscore.js"),
        r = require("md5.js"),
        i = "",
        o = getUrlParam(e, "sign");
    if (o || t && t.sign) return !1;
    if (e && (i = getQuery(e)), t) {
        var s = [];
        for (var u in t) u && t[u] && (s = s.concat({
            name: u,
            value: t[u]
        }));
        i = i.concat(s)
    }
    i = n.sortBy(i, "name"), i = n.uniq(i, !0, "name");
    for (var c = "", d = 0; d < i.length; d++) i[d] && i[d].name && i[d].value && (c += i[d].name + "=" + i[d].value, d < i.length - 1 && (c += "&"));
    return a = a || getApp().siteInfo.token, o = r(c + a)
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    _base = require("base64"),
    _md = require("md5"),
    _md2 = _interopRequireDefault(_md),
    util = {};
util.base64Encode = function (e) {
    return (0, _base.base64_encode)(e)
}, util.base64Decode = function (e) {
    return (0, _base.base64_decode)(e)
}, util.md5 = function (e) {
    return (0, _md2.default)(e)
}, util.url = function (e, t) {
    var a = getApp(),
        n = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (n += "c=" + e[0] + "&"), e[1] && (n += "a=" + e[1] + "&"), e[2] && (n += "do=" + e[2] + "&")), t && "object" === (void 0 === t ? "undefined" : _typeof(t)))
        for (var r in t) r && t.hasOwnProperty(r) && t[r] && (n += r + "=" + t[r] + "&");
    return n
}, util.getSign = function (e, t, a) {
    return getSign(e, t, a)
}, util.getNewUrl = function (e, t) {
    var a = e,
        n = wx.getStorageSync("userInfo").sessionid;
    if (-1 == a.indexOf("http://") && -1 == a.indexOf("https://") && (a = util.url(a)), getUrlParam(a, "state") || e.data && e.data.state || !n || (a = a + "&state=we7sid-" + n), !e.data || !e.data.m) {
        getCurrentPages();
        a = a + "&m=" + t
    }
    var r = getSign(a, e.data);
    return r && (a = a + "&sign=" + r), a
};
/**
 * request
 */
util.request = function (e) {
    let url='farm/api/'+e.data.op;
    e.data.uniacid=siteinfo.uniacid;
    e.data.version=siteinfo.version;
    e.data.acid=siteinfo.acid;
    e.data.uid = wx.getStorageSync("kejia_farm_uid");
    wx.showNavigationBarLoading();
    let method=e.method=='post' || e.method=='POST' ? 'POST' : 'GET';
    delete e.data.op;
    wx.request({
        url:siteinfo.siteroot2+url,
        method:method,
        header: e.method=='post'|| e.method=='POST' ? {
            'content-type': 'application/x-www-form-urlencoded'
        } : {
            'content-type': 'application/json'
        },
        data:e.data,
        success:function(res){
            var ret=res.data;
            if(ret.state==200){
                'function'==typeof e.success && e.success(ret);
            }else if(ret.state==400){
                console.log(ret.info);
            }else{
                console.log("请求异常，请稍后再试");
            }
        },
        fail:function(err){
            api.dev && console.log(err);         
            'function'==typeof e.fail ? e.fail(err) :  console.log("请求异常");
        },
        complete:function(res){
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            wx.hideLoading();
            if(api.dev){
                console.log(method+"请求地址:"+siteinfo.siteroot2+url);
                console.log("request请求的参数:");
                console.log(e.data);
                console.log(res);
            }
            'function'==typeof e.complete && e.complete(res);
        }
    });
};

util.getWe7User = function (e, t) {
    var a = wx.getStorageSync("userInfo") || {};
    util.request({
        url: "auth/session/openid",
        data: {
            code: t || ""
        },
        cachetime: 0,
        showLoading: !1,
        success: function (t) {
            t.data.errno || (a.sessionid = t.data.data.sessionid, a.memberInfo = t.data.data.userinfo, wx.setStorageSync("userInfo", a)), "function" == typeof e && e(a)
        }
    })
}, util.upadteUser = function (e, t) {
    var a = wx.getStorageSync("userInfo");
    if (!e) return "function" == typeof t && t(a);
    a.wxInfo = e.userInfo, util.request({
        url: "auth/session/userinfo",
        data: {
            signature: e.signature,
            rawData: e.rawData,
            iv: e.iv,
            encryptedData: e.encryptedData
        },
        method: "POST",
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        cachetime: 0,
        success: function (e) {
            e.data.errno || (a.memberInfo = e.data.data, wx.setStorageSync("userInfo", a)), "function" == typeof t && t(a)
        }
    })
}, util.checkSession = function (e) {
    util.request({
        url: "auth/session/check",
        method: "POST",
        cachetime: 0,
        showLoading: !1,
        success: function (t) {
            t.data.errno ? "function" == typeof e.fail && e.fail() : "function" == typeof e.success && e.success()
        },
        fail: function () {
            "function" == typeof e.fail && e.fail()
        }
    })
}, util.getUserInfo = function (e, t) {
    var a = function () {
            wx.login({
                success: function (a) {
                    util.getWe7User(function (a) {
                        t ? util.upadteUser(t, function (t) {
                            "function" == typeof e && e(t)
                        }) : wx.canIUse("getUserInfo") ? wx.getUserInfo({
                            withCredentials: !0,
                            success: function (t) {
                                util.upadteUser(t, function (t) {
                                    "function" == typeof e && e(t)
                                })
                            },
                            fail: function () {
                                "function" == typeof e && e(a)
                            }
                        }) : "function" == typeof e && e(a)
                    }, a.code)
                },
                fail: function () {
                    wx.showModal({
                        title: "获取信息失败",
                        content: "请允许授权以便为您提供给服务",
                        success: function (e) {
                            e.confirm && util.getUserInfo()
                        }
                    })
                }
            })
        },
        n = wx.getStorageSync("userInfo") || {};
    n.sessionid ? util.checkSession({
        success: function () {
            t ? util.upadteUser(t, function (t) {
                "function" == typeof e && e(t)
            }) : "function" == typeof e && e(n)
        },
        fail: function () {
            n.sessionid = "", console.log("relogin"), wx.removeStorageSync("userInfo"), a()
        }
    }) : a()
}, util.navigateBack = function (e) {
    var t = e.delta ? e.delta : 1;
    if (e.data) {
        var a = getCurrentPages(),
            n = a[a.length - (t + 1)];
        n.pageForResult ? n.pageForResult(e.data) : n.setData(e.data)
    }
    wx.navigateBack({
        delta: t,
        success: function (t) {
            "function" == typeof e.success && e.success(t)
        },
        fail: function (t) {
            "function" == typeof e.fail && e.fail(t)
        },
        complete: function () {
            "function" == typeof e.complete && e.complete()
        }
    })
}, util.footer = function (e) {
    var t = e,
        a = getApp().tabBar;
    for (var n in a.list) a.list[n].pageUrl = a.list[n].pagePath.replace(/(\?|#)[^"]*/g, "");
    t.setData({
        tabBar: a,
        "tabBar.thisurl": t.__route__
    })
}, util.message = function (e, t, a) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, a = e.type, e = e.title), t) {
        var n = t.substring(0, 9),
            r = "",
            i = "";
        "navigate:" == n ? (i = "navigateTo", r = t.substring(9)) : "redirect:" == n ? (i = "redirectTo", r = t.substring(9)) : (r = t, i = "redirectTo")
    }
    a || (a = "success"), "success" == a ? wx.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!r,
        complete: function () {
            r && setTimeout(function () {
                wx[i]({
                    url: r
                })
            }, 1800)
        }
    }) : "error" == a && wx.showModal({
        title: "系统信息",
        content: e,
        showCancel: !1,
        complete: function () {
            r && wx[i]({
                url: r
            })
        }
    })
}, util.user = util.getUserInfo, util.showLoading = function () {
    wx.getStorageSync("isShowLoading") && (wx.hideLoading(), wx.setStorageSync("isShowLoading", !1)), wx.showLoading({
        title: "加载中",
        complete: function () {
            wx.setStorageSync("isShowLoading", !0)
        },
        fail: function () {
            wx.setStorageSync("isShowLoading", !1)
        }
    })
}, util.showImage = function (e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    wx.previewImage({
        urls: [t]
    })
}, util.parseContent = function (e) {
    if (!e) return e;
    var t = ["\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]"],
        a = e.match(new RegExp(t.join("|"), "g"));
    if (a)
        for (var n in a) e = e.replace(a[n], "[U+" + a[n].codePointAt(0).toString(16).toUpperCase() + "]");
    return e
}, util.date = function () {
    this.isLeapYear = function (e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0)
    }, this.dateToStr = function (e, t) {
        e = arguments[0] || "yyyy-MM-dd HH:mm:ss", t = arguments[1] || new Date;
        var a = e,
            n = ["日", "一", "二", "三", "四", "五", "六"];
        return a = a.replace(/yyyy|YYYY/, t.getFullYear()), a = a.replace(/yy|YY/, t.getYear() % 100 > 9 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100), a = a.replace(/MM/, t.getMonth() > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)), a = a.replace(/M/g, t.getMonth()), a = a.replace(/w|W/g, n[t.getDay()]), a = a.replace(/dd|DD/, t.getDate() > 9 ? t.getDate().toString() : "0" + t.getDate()), a = a.replace(/d|D/g, t.getDate()), a = a.replace(/hh|HH/, t.getHours() > 9 ? t.getHours().toString() : "0" + t.getHours()), a = a.replace(/h|H/g, t.getHours()), a = a.replace(/mm/, t.getMinutes() > 9 ? t.getMinutes().toString() : "0" + t.getMinutes()), a = a.replace(/m/g, t.getMinutes()), a = a.replace(/ss|SS/, t.getSeconds() > 9 ? t.getSeconds().toString() : "0" + t.getSeconds()), a = a.replace(/s|S/g, t.getSeconds())
    }, this.dateAdd = function (e, t, a) {
        switch (a = arguments[2] || new Date, e) {
            case "s":
                return new Date(a.getTime() + 1e3 * t);
            case "n":
                return new Date(a.getTime() + 6e4 * t);
            case "h":
                return new Date(a.getTime() + 36e5 * t);
            case "d":
                return new Date(a.getTime() + 864e5 * t);
            case "w":
                return new Date(a.getTime() + 6048e5 * t);
            case "m":
                return new Date(a.getFullYear(), a.getMonth() + t, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
            case "y":
                return new Date(a.getFullYear() + t, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())
        }
    }, this.dateDiff = function (e, t, a) {
        switch (e) {
            case "s":
                return parseInt((a - t) / 1e3);
            case "n":
                return parseInt((a - t) / 6e4);
            case "h":
                return parseInt((a - t) / 36e5);
            case "d":
                return parseInt((a - t) / 864e5);
            case "w":
                return parseInt((a - t) / 6048e5);
            case "m":
                return a.getMonth() + 1 + 12 * (a.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);
            case "y":
                return a.getFullYear() - t.getFullYear()
        }
    }, this.strToDate = function (dateStr) {
        var data = dateStr,
            reCat = /(\d{1,4})/gm,
            t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d
    }, this.strFormatToDate = function (e, t) {
        var a = 0,
            n = -1,
            r = t.length;
        (n = e.indexOf("yyyy")) > -1 && n < r && (a = t.substr(n, 4));
        var i = 0;
        (n = e.indexOf("MM")) > -1 && n < r && (i = parseInt(t.substr(n, 2)) - 1);
        var o = 0;
        (n = e.indexOf("dd")) > -1 && n < r && (o = parseInt(t.substr(n, 2)));
        var s = 0;
        ((n = e.indexOf("HH")) > -1 || (n = e.indexOf("hh")) > 1) && n < r && (s = parseInt(t.substr(n, 2)));
        var u = 0;
        (n = e.indexOf("mm")) > -1 && n < r && (u = t.substr(n, 2));
        var c = 0;
        return (n = e.indexOf("ss")) > -1 && n < r && (c = t.substr(n, 2)), new Date(a, i, o, s, u, c)
    }, this.dateToLong = function (e) {
        return e.getTime()
    }, this.longToDate = function (e) {
        return new Date(e)
    }, this.isDate = function (e, t) {
        null == t && (t = "yyyyMMdd");
        var a = t.indexOf("yyyy");
        if (-1 == a) return !1;
        var n = e.substring(a, a + 4),
            r = t.indexOf("MM");
        if (-1 == r) return !1;
        var i = e.substring(r, r + 2),
            o = t.indexOf("dd");
        if (-1 == o) return !1;
        var s = e.substring(o, o + 2);
        return !(!isNumber(n) || n > "2100" || n < "1900") && (!(!isNumber(i) || i > "12" || i < "01") && !(s > getMaxDay(n, i) || s < "01"))
    }, this.getMaxDay = function (e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31"
    }, this.isNumber = function (e) {
        return /^\d+$/g.test(e)
    }, this.toArray = function (e) {
        e = arguments[0] || new Date;
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(), t[4] = e.getMinutes(), t[5] = e.getSeconds(), t
    }, this.datePart = function (e, t) {
        t = arguments[1] || new Date;
        var a = "",
            n = ["日", "一", "二", "三", "四", "五", "六"];
        switch (e) {
            case "y":
                a = t.getFullYear();
                break;
            case "M":
                a = t.getMonth() + 1;
                break;
            case "d":
                a = t.getDate();
                break;
            case "w":
                a = n[t.getDay()];
                break;
            case "ww":
                a = t.WeekNumOfYear();
                break;
            case "h":
                a = t.getHours();
                break;
            case "m":
                a = t.getMinutes();
                break;
            case "s":
                a = t.getSeconds()
        }
        return a
    }, this.maxDayOfDate = function (e) {
        (e = arguments[0] || new Date).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate()
    }
}, util.farmPay = function (e, t) {
    util.request({
        url: "entry/wxapp/pay",
        data: e,
        cachetime: "0",
        success: function (e) {
            if (e.data && e.data.data && !e.data.errno) {
                e.data.data.package;
                wx.requestPayment({
                    timeStamp: e.data.data.timeStamp,
                    nonceStr: e.data.data.nonceStr,
                    package: e.data.data.package,
                    signType: "MD5",
                    paySign: e.data.data.paySign,
                    success: function (e) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1,
                            success: function () {
                                wx.redirectTo({
                                    url: "../" + t
                                })
                            }
                        })
                    },
                    fail: function (e) {
                        wx.showModal({
                            title: "系统提示",
                            content: "您取消了支付!",
                            showCancel: !1,
                            success: function (e) {
                                e.confirm
                            }
                        })
                    }
                })
            } else console.log("fail1")
        },
        fail: function (e) {
            "JSAPI支付必须传openid" == e.data.message ? wx.navigateTo({
                url: "/kejia_farm/pages/login/index"
            }) : wx.showModal({
                title: "系统提示",
                content: e.data.message ? e.data.message : "错误",
                showCancel: !1,
                success: function (e) {
                    e.confirm
                }
            })
        }
    })
}, util.saveFormId = function (e, t) {
    var a = wx.getStorageSync("kejia_farm_uid");
    util.request({
        url: "entry/wxapp/class",
        data: {
            op: "saveFormId",
            action: "index",
            control: "home",
            form_id: e,
            uniacid: t,
            uid: a
        },
        success: function (e) {
            console.log(e)
        }
    })
}, util.pay = function (e, t, a, n, r) {
    var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "notify",
        o = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
    util.request({
        url: t,
        data: {
            orderid: e,
            uniacid: r
        },
        cachetime: "0",
        success: function (t) {
            if (t.data && t.data.data && !t.data.errno) {
                var s = t.data.data.package;
                wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function (t) {
                        util.request({
                            url: a,
                            data: {
                                op: i,
                                order_id: e,
                                uniacid: r,
                                prepay_id: s
                            },
                            success: function (e) {
                                console.log(e), wx.showToast({
                                    title: "支付成功",
                                    success: function (e) {
                                        wx.redirectTo({
                                            url: "../" + n
                                        })
                                    }
                                })
                            }
                        })
                    },
                    fail: function (e) {
                        wx.showModal({
                            title: "系统提示",
                            content: "您取消了支付!",
                            showCancel: !1,
                            success: function (e) {
                                e.confirm && o && wx.redirectTo({
                                    url: "../" + n
                                })
                            }
                        })
                    }
                })
            } else console.log("fail1")
        },
        fail: function (e) {
            "JSAPI支付必须传openid" == e.data.message ? wx.navigateTo({
                url: "/kejia_farm/pages/login/index"
            }) : wx.showModal({
                title: "系统提示",
                content: e.data.message ? e.data.message : "错误",
                showCancel: !1,
                success: function (e) {
                    e.confirm
                }
            })
        }
    })
}, util.setNavColor = function (e) {
    var t = wx.getStorageSync("kejia_farm_setData");
    // wx.setNavigationBarColor({
    //     frontColor: t.front_color,
    //     backgroundColor: t.nav_top_color
    // })
}, module.exports = util;