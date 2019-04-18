var a = new getApp,
    t = a.siteInfo.uniacid;
let api=require('../../../../utils/api');
Page({
    data: {
        SystemInfo: a.globalData.sysData,
        isIphoneX: a.globalData.isIphoneX,
        landType: [],
        currentLand: [],
        currentIndex: 1,
        page: 1,
        tarbar: wx.getStorageSync("kejia_farm_tarbar"),
        is_tarbar: !0,
        farmSetData: wx.getStorageSync("kejia_farm_setData"),
        areaList:[],
        area:'区域',
        curren_pid:0,
        curren_id:0,
        showArea:false,
        mainActiveIndex:0,
        activeId:0
    },
    
    onLoad: function (n) {
        let _this=this;
        let tarbar=wx.getStorageSync("kejia_farm_tarbar");
        _this.setData({
            tarbar:tarbar
        });
        _this.getLandType();
    },
    onClickNav({ detail = {} }) {
        this.setData({
          mainActiveIndex: detail.index || 0
        });
      },
    
      onClickItem({ detail = {} }) {
        this.setData({
          activeId: detail.id,
          area:detail.text,
          showArea:false
        });
        detail.id && this.getLandList(detail.id);
      },

    onShowArea(){
        this.setData({ showArea: !this.data.showArea });
    },
      onClose() {
        this.setData({ showArea: false });
      },
    select_menu2:function(e){
        let id=e.currentTarget.dataset.index;
       // console.log(id);
        this.setData({
            curren_id:id,
            show:false
        });
  
        this.getLandList(id);
       
    },
    select_menu1:function(e){
        this.setData({
            curren_pid:e.currentTarget.dataset.index,
            show:true
        });
    },
    /**
     * 租地列表
     */
    getLandType:function(){
        let _this=this;
        api.ajax('farm/api/land',{},function(ret){
             let type_id=ret.data.landType[0].items[0].id;
            let jsonStr=JSON.stringify(ret.data.landType);
            jsonStr=jsonStr.replace(/name/g,"text");
            jsonStr=jsonStr.replace(/items/g,"children");
            let data = JSON.parse(jsonStr);
            //console.log(data);
            _this.setData({
                areaList:data,
                activeId:type_id,
            });
            type_id && _this.getLandList(type_id);
 
        });
    },
    /**
     * 
     */
    getLandList:function(type_id){
        let _this=this;
        var data={
            type_id:type_id
        };
        api.ajax('farm/api/land',data,function(ret){
            _this.setData({
                currentLand:ret.data.landData,
                currentIndex:type_id
            });
        });
    },
    changeArea: function (a) {
        var t = a.currentTarget.dataset.id;
        this.getLandList(t)
    },
    getLandData: function (n, e, r) {
        var d = this;
        r = parseInt(r) + 1, 1 != e && (r = 1), a.api.ajax(
            "farm/api/getLandByType",
            {
                // op: "getLandByType",
                action: "land",
                uniacid: t,
                type_id: n,
                page: r
            },
            function (a) {
                if (1 == e) {
                    var t = d.data.currentLand;
                    a.data.landData && (a.data.landData.map(function (a) {
                        t.push(a)
                    }), d.setData({
                        currentLand: t,
                        page: r,
                        currentIndex: n
                    }))
                } else d.setData({
                    currentLand: a.data.landData,
                    currentIndex: n,
                    page: 1
                })
            }
        )
    },
    onPullDownRefresh:function(e){
        this.getLandList(this.data.curren_id);  
    },
    onReachBottom: function (a) {
        // var t = this.data.currentIndex,
        //     n = this.data.page;
        // this.getLandData(t, 1, n)
    },
    intoLandDetail: function (a) {
        var t = a.currentTarget.dataset.lid;
        wx.navigateTo({
            url: "../landDetails/index?lid=" + t
        })
    }
});