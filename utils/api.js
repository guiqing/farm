/**
 * 小程序常用api方法
 * 2019/3/6
 * @author 帅小黑x
 */
let siteinfo =  require("../siteinfo.js");

var x={};

x.dev=false;

/**
 * set缓存
 */
 x.setStorage=function(key,value){
     wx.setStorageSync(key,value);
 };
 
/**
 * get缓存
 */
 x.getStorage=function(key){
     return wx.getStorageSync(key);
 };

 /**
  * alert
  */
 x.alert=function(msg,title,cb){
    title= title || '友情提示'
    wx.showModal({
        title: title,
        content: msg,
        showCancel: false,
        success(res) {
            if (res.confirm) {
                cb && cb();
            }
        }
    })
 };

 /**
  * confirm
  */
 x.confirm=function(msg,title,cb,cancelText,confirmText){
    title= title || '提示';
    cancelText= cancelText || '取消';
    confirmText=confirmText||'确定';
    wx.showModal({
        title: title,
        content: msg,
        success(res) {
            if (res.confirm) {
                cb && cb("yes");
            }else if(res.cancel){
                cb && cb("no");
            }
        }
    })
 }

 /**
  * toast
  */
 x.toast=function(msg,icon,duration){
    icon= icon || 'none';
    duration= duration || 1500;
    wx.showToast({
        title:msg,
        icon:icon,
        duration:duration
    });
 };

 /**
  * 获取元素高度
  */
 x.getHeight=function(id,cb){
    let query=wx.createSelectorQuery();
    query.selectAll('#'+id).boundingClientRect(function(res){
      let top_h=res[0].height;
      cb && cb(top_h);
    }).exec(); 
 }

 /**
  * 返回scroll-view的高度
  */
 x.getScroll_h=function(id,cb){
    x.getHeight(id,function(top_h){
        let sys = wx.getSystemInfoSync(),
            frmHeight = sys.windowHeight;
        let scrollHeight = frmHeight - top_h;
        cb && cb(scrollHeight);
    });
 }

 /**
  * request
  */
 x.ajax=function(url,data,success,fail,complete,method){
    data.uniacid=siteinfo.uniacid;
    data.version=siteinfo.version;
    data.acid=siteinfo.acid;
    data.uid = x.getStorage("kejia_farm_uid");
    wx.showNavigationBarLoading();
    method=method=='post' || method=='POST' ? 'POST' : 'GET';
    wx.request({
        url:siteinfo.siteroot2+url,
        method:method,
        header: method=='post'|| method=='POST' ? {
            'content-type': 'application/x-www-form-urlencoded'
        } : {
            'content-type': 'application/json'
        },
        data:data,
        success:function(res){
            var ret=res.data;
           // console.log(ret);
           // console.log(ret.state);
            if(ret.state==200){
                'function'==typeof success && success(ret);
            }else if(ret.state==400){
                //x.toast(ret.info);
                console.log(ret.info)
            }else{
                //  x.toast("请求异常，请稍后再试");
                 console.log("请求异常，请稍后再试");
            }
        },
        fail:function(err){
            x.dev && console.log(err);         
            'function'==typeof fail ? fail(err) :  console.log("请求异常");
        },
        complete:function(res){
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            wx.hideLoading();
            if(x.dev){
                console.log(method+"请求地址:"+siteinfo.siteroot2+url);
                console.log("请求的参数:");
                console.log(data);
                console.log(res);
            }
            'function'==typeof complete && complete(res);
        }
    });
 }

module.exports = x;