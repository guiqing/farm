Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        articleData: {
            type: Array,
            value: []
        },
        text: {
            type: String,
            value: "ceece"
        },
        list: {
            type: Array,
            value: []
        }
    },
    data: {
        setData: wx.getStorageSync("kejia_farm_setData"),
        currentText:''
    },
    lifetimes:{
        attached(){
            // if(this.properties.list.length>0){
            //     let i=0;
            //     let l=this.properties.list.length;
            //     setInterval(() => {
            //         i=i%l;
            //         this.changeText(i); 
            //         i++; 
            //     }, 3000);
            //     // this.slideup();
            // }
        } 
    },
    methods: {
        intoArticle: function (t) {
            wx.navigateTo({
                url: "/kejia_farm/pages/information/index/index"
            })
        },
        // changeText:function(index){         
        //     this.setData({
        //         currentText:this.properties.list[index].title
        //     });
        // },
        // slideup:function(){
        //     this.slideupshow(this, 'slide_up1', -200, 1)
        // },
        // slideupshow:function(that,param,px,opacity){
        //     var animation = wx.createAnimation({
        //       duration: 800,
        //       timingFunction: 'ease',
        //     });
        //     animation.translateY(px).opacity(opacity).step()
        //     //将param转换为key
        //     var json = '{"' + param + '":""}'
        //     json = JSON.parse(json);
        //     json[param] = animation.export()
        //     //设置动画
        //     that.setData(json)
        //   },
    }
});