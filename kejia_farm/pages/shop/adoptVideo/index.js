Page({
    data: {
        state: 0,
        src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        cover: "../../../images/banner/banner5.jpg",
        enlarge: !1,
        narrow: !1,
        currentIndex: 0
    },
    onLoad: function (t) {
        var e = t.state;
        this.setData({
            state: e
        })
    },
    enlarge: function () {
        var t = this;
        this.setData({
            enlarge: !0
        }), setTimeout(function () {
            t.setData({
                enlarge: !1
            })
        }, 500)
    },
    narrow: function () {
        var t = this;
        this.setData({
            narrow: !0
        }), setTimeout(function () {
            t.setData({
                narrow: !1
            })
        }, 500)
    },
    direction: function (t) {
        var e = this,
            a = t.currentTarget.dataset.index;
        this.setData({
            currentIndex: a
        }), setTimeout(function () {
            e.setData({
                currentIndex: 0
            })
        }, 500)
    }
});