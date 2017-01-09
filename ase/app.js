let Api = require('./utils/api');
App({
  loginSession(){
    
  },
  onLaunch: function () {
    let that = this;
    let session = wx.getStorageSync('session');
    wx.login({
      success(res){
        if(res.code){
          let data = {
            code: res.code
          }
          //判断用户是否是登录状态
          if(!session){
            Api.fetchPost(Api.loginSession,data,function(err,docs){
              if(err){return false};
              if(docs.status = '0000'){
                wx.setStorageSync('session',docs.session);
              }
            });
          }
        };
        /*获取用户信息*/
        wx.getUserInfo({
          success(res){
            console.log(res.userInfo);
            that.globalData.userInfo = res.userInfo;
          },
          fail(err){
            console.log(err);
          }
        });
      }
    });
  },
  
  globalData:{
    userInfo:null
  },
  dpr:2
})