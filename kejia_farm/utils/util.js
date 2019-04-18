var t = function (t) {
    return (t = t.toString())[1] ? t : "0" + t
};
module.exports = {
    formatTime: function (r) {
        var o = r.getFullYear(),
            e = r.getMonth() + 1,
            n = r.getDate(),
            a = r.getHours(),
            u = r.getMinutes(),
            i = r.getSeconds();
        return [o, e, n].map(t).join("/") + " " + [a, u, i].map(t).join(":")
    },
    computeHeight: function (t, r, o) {
        for (var e = [], n = [], a = r.length, u = 0; u < a; u++) e[u] = !1, n[u] = Math.floor(u / 2) * (320 / 750) * 500;
        for (var i = 0; i < r.length; i++) i < o ? e[i] = !0 : n[i] < t.data.scrollTop && 0 == e[i] && (e[i] = !0);
        t.setData({
            arr: e,
            tarrHight: n
        })
    },
    returnTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        })
    }
};