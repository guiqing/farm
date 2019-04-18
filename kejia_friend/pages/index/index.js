// kejia_friend/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:1,
      name:"帅小黑",
      time:"15分钟前",
      head:"../../images/head.png",
      isLike:false,
      content:"内容内容内容内容内容内容内容内容",
      imgs:["https://yimudingzhi.kejianet.cn/public//uploads/images/20190321/89ec057d0b19eab6461b676ec8b8a441.png",
      "https://yimudingzhi.kejianet.cn/public//uploads/images/20190321/93f38478bf1ab8a6ad2768766061919a.png"],
      imgsType:1,
      footer:{
        btn1:520,
        btn2:521,
        btn3:523
      }
    },{
      id:2,
      name:"帅小黑2",
      time:"30分钟前",
      head:"../../images/head.png",
      isLike:true,
      content:"内容内容内容内容内容内容内容内容",
      imgs:["../../images/img1.png","../../images/img1.png","../../images/img1.png"],
      imgsType:3,
      footer:{
        btn1:520,
        btn2:521,
        btn3:523
      }
    },{
      id:3,
      name:"帅小黑3",
      time:"1天",
      head:"../../images/head.png",
      isLike:true,
      content:"内容内容内容内容内容内容内容内容",
      imgs:["https://yimudingzhi.kejianet.cn/public//uploads/images/20190321/89ec057d0b19eab6461b676ec8b8a441.png",
      "https://yimudingzhi.kejianet.cn/public//uploads/images/20190321/93f38478bf1ab8a6ad2768766061919a.png"],
      imgsType:2,
      footer:{
        btn1:520,
        btn2:521,
        btn3:523
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  previewImg:function(e){
    let current=e.currentTarget.dataset.url;
    let urls=e.currentTarget.dataset.urls;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})