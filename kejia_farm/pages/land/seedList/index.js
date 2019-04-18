var t = new getApp,
    e = t.siteInfo.uniacid;
Page({
    data: {
        is_show_cart: !1,
        lid: 0,
        seedList: [],
        count: 0,
        can_count: 0,
        selectSeedList: [],
        totalPrice: 0,
        farmSetData: []
        // sumPrice:true,
        // list:[{cover:"/kejia_game/images/farm/main_bg.jpg",send_name:"test",output:"3",cycle:"3",price:"5",selectCount:"2"},{cover:"/kejia_game/images/farm/pasture.jpg",send_name:"test",output:"3",cycle:"3",price:"5",selectCount:"0"}]
    },
    onLoad: function (a) {
        var s = this,
            i = wx.getStorageSync("kejia_farm_setData"),
            n = a.lid,
            o = a.can_count;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getSeedList",
                action: "land",
                uniacid: e,
                lid: n
            },
            success: function (t) {
                s.setData({
                    seedList: t.data.seedList,
                    lid: n,
                    farmSetData: i,
                    can_count: o
                })
            }
        }), s.setData({
            farmSetData: wx.getStorageSync("kejia_farm_setData")
        }), t.util.setNavColor(e)
    },
    closeCart: function (t) {
        this.setData({
            is_show_cart: !this.data.is_show_cart
        }), this.data.is_show_cart && this.data.count <= 0 && wx.showModal({
            title: "提示",
            content: "请先选择种子",
            showCancel: !1
        })
    },
    addSeedCount: function (t) {
        var e = t.currentTarget.dataset.seedid,
            a = this.data.list,
            s = new Array,
            i = this.data.totalPrice,
            n = this.data.count;
        if (this.data.can_count <= n) return wx.showModal({
            title: "提示",
            content: "当前选择的种子面积已大于剩余土地面积啦~",
            showCancel: !1
        }), !1;
        a.map(function (t) {
            t.id == e && (t.selectCount = parseInt(t.selectCount) + 1, i = parseFloat(i) + parseFloat(t.price), n = parseInt(n) + 1), t.selectCount >= 1 && s.push(t)
        }), this.setData({
            seedList: a,
            selectSeedList: s,
            totalPrice: i.toFixed(2),
            count: n
        })
    },
    reduceSeedCount: function (t) {
        var e = t.currentTarget.dataset.seedid,
            a = this.data.seedList,
            s = new Array,
            i = this.data.totalPrice,
            n = this.data.count;
        a.map(function (t) {
            t.id == e && (t.selectCount <= 1 ? t.selectCount = 0 : t.selectCount = parseInt(t.selectCount) - 1, n -= 1, i = parseFloat(i) - t.price), t.selectCount >= 1 && s.push(t)
        }), this.setData({
            seedList: a,
            selectSeedList: s,
            totalPrice: i.toFixed(2),
            count: n
        })
    },
    submitOrder: function (t) {
        var e = this;
        if (this.data.count <= 0) return wx.showModal({
            title: "提示",
            content: "请选择种子",
            showCancel: !1
        }), !1;
        var a = e.data.selectSeedList,
            s = e.data.lid,
            i = e.data.totalPrice;
        wx.navigateTo({
            url: "../confirm_seed/index?lid=" + s + "&totalPrice=" + i + "&seedList=" + JSON.stringify(a)
        })
    },
    lookSeedDetail: function (t) {
        var e = t.currentTarget.dataset.seedid;
        wx.navigateTo({
            url: "/kejia_farm/pages/user/land/seedDetails/index?sid=" + e
        })
    }
});