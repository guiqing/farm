var t = new getApp,
    a = t.siteInfo.uniacid;
let api=require("../../../../utils/api.js");
Page({
    data: {
        is_show_sale_dailog: !1,
        bagList: [],
        operationtype: "",
        selectBag: [],
        disabled: !1,
        isContent: !0
    },
    onLoad: function (e) {
        var i = this,
            s = "";
        e.formid && (s = e.formid);
        var n = wx.getStorageSync("kejia_farm_uid");
        api.ajax('farm/api/getSeeBagList',{
            // op: "getSeeBagList",
            // action: "land",
            uid: n,
            uniacid: a,
            formid: s
        },function(t){
            t.data.bagList.length > 0 ? i.setData({
                bagList: t.data.bagList
            }) : i.setData({
                isContent: !1
            })
        }),t.util.setNavColor(a);
        // t.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         op: "getSeeBagList",
        //         action: "land",
        //         uid: n,
        //         uniacid: a,
        //         formid: s
        //     },
        //     success: function (t) {
        //         t.data.bagList.length > 0 ? i.setData({
        //             bagList: t.data.bagList
        //         }) : i.setData({
        //             isContent: !1
        //         })
        //     }
        // }), t.util.setNavColor(a)
    },
    getBagList: function () {
        var e = this,
            i = wx.getStorageSync("kejia_farm_uid");
        api.ajax('farm/api/getSeeBagList',{
            // op: "getSeeBagList",
            action: "land",
            uid: i,
            uniacid: a
        },function (t) {
            t.data.bagList.length > 0 ? e.setData({
                bagList: t.data.bagList
            }) : e.setData({
                isContent: !1
            })
        });
        // t.util.request({
        //     url: "entry/wxapp/class",
        //     data: {
        //         op: "getSeeBagList",
        //         action: "land",
        //         uid: i,
        //         uniacid: a
        //     },
        //     success: function (t) {
        //         t.data.bagList.length > 0 ? e.setData({
        //             bagList: t.data.bagList
        //         }) : e.setData({
        //             isContent: !1
        //         })
        //     }
        // })
    },
    onShow: function (t) {
        this.getBagList()
    },
    operationBag: function (t) {
        var a = this;
        if (this.data.is_show_sale_dailog) this.setData({
            is_show_sale_dailog: !this.data.is_show_sale_dailog
        });
        else {
            t.currentTarget.dataset.seedid;
            var e = t.currentTarget.dataset.bagid,
                i = t.currentTarget.dataset.operationtype;
            if (this.data.bagList.map(function (t) {
                    t.id == e && a.setData({
                        selectBag: t
                    })
                }), 2 == i) return wx.navigateTo({
                url: "../pay_freight/index?selectBag=" + JSON.stringify(this.data.selectBag)
            }), !1;
            this.setData({
                is_show_sale_dailog: !this.data.is_show_sale_dailog,
                operationtype: i,
                bagid: e
            })
        }
    },
    saleSeed: function (e) {
        var i = this,
            s = this.data.selectBag,
            n = e.detail.value.weight,
            o = e.detail.formId,
            d = wx.getStorageSync("kejia_farm_uid");
        return n <= 0 ? (wx.showModal({
            title: "提示",
            content: "重量必须大于0",
            showCancel: !1
        }), !1) : parseFloat(n) > parseFloat(s.weight) ? (wx.showModal({
            title: "提示",
            content: "重量不能大于" + s.weight + " kg",
            showCancel: !1
        }), !1) : (i.setData({
            disabled: !0
        }), void t.api.ajax(
            "farm/api/saleSeed",
            {
                // op: "saleSeed",
                action: "land",
                uniacid: a,
                selectBag: JSON.stringify(s),
                uid: d,
                weight: n,
                formid: o
            },
            function (t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function () {
                        i.setData({
                            is_show_sale_dailog: !i.data.is_show_sale_dailog,
                            disabled: !1
                        }), i.getBagList(o)
                    }
                })
            }
        ,null,null,'POST'))
    }
});