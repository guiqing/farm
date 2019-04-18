var t = new getApp;
let api=require("../../../../utils/api");
Page(function (t, a, i) {
    return a in t ? Object.defineProperty(t, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = i, t
}({
    data: {
        SystemInfo: t.globalData.sysData,
        isIphoneX: t.globalData.isIphoneX,
        img_width_three: 60,
        img_width_one: 60,
        Adopt: [],
        tarbar: [],
        currentImg: "",
        currentStyle: 3,
        showName: 0,
        setData: [],
        is_tarbar: !1
    },
    onLoad: function (a) {
        let _this=this;
        let tarbar=wx.getStorageSync("kejia_farm_tarbar");
        _this.setData({
            tarbar:tarbar
        });
        _this.getanimal();
        return ;
        var i = this,
            n = (wx.getStorageSync("kejia_farm_uid"), wx.getStorageSync("kejia_farm_setData")),
            e = t.siteInfo.uniacid,
            o = !1;
        a.is_tarbar && (o = a.is_tarbar), i.setData({
            tarbar: wx.getStorageSync("kejiaFarmTarbar"),
            setData: n,
            currentStyle: n.animal_list_style ? n.animal_list_style : 3,
            is_tarbar: o
        }), wx.showLoading({
            title: "玩命加载中"
        }), t.util.request({
            url: "entry/wxapp/animal",
            data: {
                op: "index",
                uniacid: e
            },
            success: function (t) {
                var a = t.data.animalData,
                    e = "";
                e = a.length > 1 ? a[1].animal_src : a[0].animal_src, i.setData({
                    Adopt: a,
                    currentImg: e,
                    showName: 1 == n.animal_name_show ? 1 : 0
                }), wx.hideLoading()
            }
        }), t.util.setNavColor(e)
    },
    /**
     * 获取认养列表
     */
    getanimal:function(){
        var _this=this;
        api.ajax('farm/api/animal',{},function(ret){
            let e = ret.data.length > 1 ? ret.data[1].animal_src : ret.data[0].animal_src;
            _this.setData({
               Adopt:ret.data,
               currentImg: e,
               showName: 0
            });
        });
    },
    touchstart: function (t) {
        this.data.touchDot = t.touches[0].pageX;
        var a = this;
        this.data.interval = setInterval(function () {
            a.data.time += 1
        }, 100)
    },
    touchmove: function (t) {
        var a = t.touches[0].pageX,
            i = this.data.touchDot;
        this.data.time;
        a - i <= -40 && !this.data.done && (this.data.done = !0, this.scrollLeft()), a - i >= 40 && !this.data.done && (this.data.done = !0, this.scrollRight())
    },
    touchend: function (t) {
        clearInterval(this.data.interval), this.data.time = 0, this.data.done = !1
    },
    Adopt: function (t) {
        console.log(t.currentTarget.dataset.id)
    },
    scrollLeft: function () {
        var t = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            a = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            i = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            });
        this.setData({
            img_width_three: 200
        }), this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation1.translateX(-60).opacity(.5).step(), this.animation2.translateX(-60).opacity(1).scale(.8, .8).step(), this.animation3.translateX(-60).opacity(.5).scale(1.2, 1.2).step(), this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export()
        });
        var n = this;
        setTimeout(function () {
            n.animation1.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation3.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.setData({
                animation1: t.export(),
                animation2: a.export(),
                animation3: i.export(),
                img_width_three: 60
            })
        }.bind(this), 300);
        var e = this.data.Adopt,
            o = e.shift();
        e.push(o), e.length > 1 && setTimeout(function () {
            this.setData({
                Adopt: e,
                currentImg: e[1].animal_src
            })
        }.bind(this), 195)
    },
    scrollRight: function () {
        var t = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            a = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            }),
            i = wx.createAnimation({
                duration: 300,
                timingFunction: "linear",
                delay: 0
            });
        wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        }), wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.setData({
            img_width_one: 200
        }), this.animation1 = t, this.animation2 = a, this.animation3 = i, this.animation1.translateX(60).opacity(.5).scale(1.2, 1.2).step(), this.animation2.translateX(60).opacity(1).step(), this.animation3.translateX(60).opacity(.5).step(), this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export()
        });
        var n = this;
        setTimeout(function () {
            n.animation1.translateX(0).opacity(.5).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation2.translateX(0).opacity(1).scale(1, 1).step({
                duration: 0,
                timingFunction: "linear"
            }), n.animation3.translateX(0).opacity(.5).step({
                duration: 0,
                timingFunction: "linear"
            }), n.setData({
                animation1: t.export(),
                animation2: a.export(),
                animation3: i.export(),
                img_width_one: 60
            })
        }.bind(this), 300);
        var e = this.data.Adopt,
            o = e.pop();
        e.unshift(o), e.length > 1 && setTimeout(function () {
            this.setData({
                Adopt: e,
                currentImg: e[1].animal_src
            })
        }.bind(this), 195)
    }
}, "Adopt", function (t) {
    var a = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../AdoptRules/index?aid=" + a
    })
}));