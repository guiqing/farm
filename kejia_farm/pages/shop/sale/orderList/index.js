function e(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var t,a=new getApp,r=a.siteInfo.uniacid;Page((t={data:{currentIndex:0,page:1,is_show_send:1,orderid:"",express_company:"",send_number:"",type:1,farmSetData:[]},onLoad:function(e){a.util.setNavColor(r);var t=this,n=e.type;t.setData({type:n,farmSetData:wx.getStorageSync("kejia_farm_setData")}),t.getOrder(t,r,n)},changeIndex:function(e){this.setData({currentIndex:e.currentTarget.dataset.index});var t=this;t.getOrder(t,r,t.data.type)},showSend:function(e){var t=e.currentTarget.dataset.orderid;this.setData({orderid:t,is_show_send:2})},hideSend:function(e){this.setData({is_show_send:1})},scan:function(e){var t=this;wx.scanCode({success:function(e){t.setData({send_number:e.result})}})},sureSend:function(e){var t=this,n=t.data.orderid,s=e.detail.value.express_company,d=t.data.type,o=t.data.send_number;""==o&&(o=e.detail.value.send_number),a.util.request({url:"entry/wxapp/manager",data:{op:"sendGoods",uniacid:r,orderid:n,express_company:s,send_number:o},success:function(e){1==e.data.code&&wx.showModal({title:"提示",content:"发货成功",confirmText:"朕知道了",showCancel:!1,success:function(e){e.confirm&&(t.setData({is_show_send:1,send_number:""}),t.getOrder(t,r,d))}})}})}},e(t,"sureSend",function(e){var t=this,n=t.data,s=n.orderid,d=n.send_number,o=n.type,i=e.detail.value.express_company;""==d&&(d=e.detail.value.send_number),a.util.request({url:"entry/wxapp/manager",data:{op:"sureSend",uniacid:r,orderid:s,express_company:i,send_number:d,type:o},success:function(e){0==e.data.code&&wx.showModal({title:"提示",content:e.data.msg,confirmText:"朕知道了",showCancel:!1,success:function(e){e.confirm&&(t.setData({is_show_send:1,send_number:""}),t.getOrder(t,r,t.data.type))}})}})}),e(t,"getOrder",function(e,t,r){a.util.request({url:"entry/wxapp/manager",data:{op:"order_list",uniacid:t,current:e.data.currentIndex,type:r},success:function(t){e.setData({orderData:t.data.orderData,page:1})}})}),e(t,"cancelOrder",function(e){var t=this,n=e.currentTarget.dataset.orderid,s=this.data.type;a.util.request({url:"entry/wxapp/manager",data:{op:"cancelOrder",uniacid:r,orderid:n,type:s},success:function(e){wx.showModal({title:"提示",confirmText:"朕知道了",showCancel:!1,content:e.data.msg,success:function(){t.getOrder(t,r,t.data.type)}})}})}),e(t,"onReachBottom",function(e){var t=this,n=t.data.page,s=t.data.orderData;a.util.request({url:"entry/wxapp/manager",data:{op:"order_list",uniacid:r,current:t.data.currentIndex,page:n,type:t.data.type},success:function(e){e.data.orderData&&e.data.orderData.map(function(e){s.push(e)}),t.setData({orderData:s,page:parseInt(n)+1})}})}),e(t,"intoOrderDetail",function(e){var t=e.currentTarget.dataset.orderid,a=(e.currentTarget.dataset.status,this.data.type);wx.navigateTo({url:"../orderState/index?orderid="+t+"&type="+a})}),e(t,"deleteOrder",function(e){var t=this;wx.showModal({title:"提示",content:"确认删除该订单吗？删除后将不可找回！",success:function(n){if(n.confirm){var s=t.data.type,d=e.currentTarget.dataset.orderid;a.util.request({url:"entry/wxapp/manager",data:{op:"deleteOrder",orderid:d,uniacid:r,type:s},success:function(e){0!=e.data.code?wx.showToast({title:e.data.msg}):wx.showModal({title:"提示",content:e.data.msg,confirmText:"朕知道了",showCancel:!1,success:function(){t.getOrder(t,r,s)}})}})}}})}),e(t,"refundOrder",function(e){var t=this,n=e.currentTarget.dataset.orderid,s=this.data.type;wx.showModal({title:"提示",content:"确定对该订单进行退款操作吗？",success:function(e){e.confirm&&a.util.request({url:"entry/wxapp/manager",data:{op:"refundOrder",uniacid:r,orderid:n,type:s},success:function(e){wx.showModal({title:"提示",confirmText:"朕知道了",showCancel:!1,content:e.data.msg,success:function(){t.getOrder(t,r,t.data.type)}})}})}})}),e(t,"verifyOrder",function(e){var t=this,n=e.currentTarget.dataset.orderid;wx.showModal({title:"提示",content:"确定核销该订单吗？",success:function(e){e.confirm&&a.util.request({url:"entry/wxapp/manager",data:{op:"verifyOrder",uniacid:r,orderid:n},success:function(e){wx.showModal({title:"提示",confirmText:"朕知道了",showCancel:!1,content:e.data.msg,success:function(){t.getOrder(t,r,t.data.type)}})}})}})}),t)); 