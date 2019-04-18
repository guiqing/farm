Page({
    data: {
        isShow: !1,
        adoptPrice: "￥85-￥150",
        cycle: 36,
        recovery: "￥156-￥180",
        type: "散养土鸡",
        harvest: [{
            id: 1,
            title: "农家土鸡(净肉2.5斤以上)",
            price: "￥98.00-￥138.00",
            src: "../../../images/banner/headImg.png",
            select: !1
        }, {
            id: 2,
            title: "平台回收",
            price: "￥168.00-￥188.00",
            src: "../../../images/banner/headImg.png",
            select: !1
        }],
        gift: [{
            id: 1,
            title: "认养一年以上赠送鸡蛋120个",
            desc: "鸡蛋120个",
            src: "../../../images/banner/headImg.png"
        }],
        adoptInfo: [{
            title: "甲方",
            desc: "重庆坤典科技有限公司"
        }, {
            title: "回收价格",
            desc: "￥159-￥180"
        }, {
            title: "认养价格",
            desc: "￥89-￥150"
        }, {
            title: "认养周期",
            desc: "36个月"
        }, {
            title: "收获发放时间",
            desc: "2019年6月8日"
        }],
        details: [{
            title: "品种",
            name: "土鸡"
        }, {
            title: "存活率",
            name: "80%"
        }, {
            title: "喂养方式",
            name: "放养"
        }, {
            title: "营养价值",
            name: "补气益血，强身健体"
        }, {
            title: "肉质",
            name: "精瘦细嫩"
        }, {
            title: "成熟期",
            name: "240天"
        }]
    },
    onLoad: function (e) {},
    showVideo: function () {
        wx.navigateTo({
            url: "../adoptVideo/index?state=1"
        })
    },
    control: function () {
        wx.navigateTo({
            url: "../adoptVideo/index?state=2"
        })
    },
    select: function (e) {
        var t = e.currentTarget.dataset.id,
            i = this.data.harvest;
        i.map(function (e) {
            if (e.select = !1, e.id == t) {
                var i = e.select;
                e.select = !i
            }
        }), this.setData({
            harvest: i,
            isShow: !1
        })
    },
    confrim: function () {
        this.data.harvest.every(function (e) {
            return !1 === e.select
        }) ? this.setData({
            isShow: !0
        }) : console.log("12345")
    },
    hideModel: function () {
        this.setData({
            isShow: !1
        })
    },
    preventTouchMove: function () {}
});