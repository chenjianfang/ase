let Api = require('../../utils/api');
//获取应用实例
var app = getApp();
Page({
  data:{
    cminit:[],
    attention:[]
  },
  onShow(){
    let that = this;
    //广场所有社区
    console.log('onShow--------');
    Api.fetchGet(Api.initCM,(err,data) => {
      if(err){return false};
      console.log(data);
      that.setData({
        cminit:data
      });
    });
  },
  onRead(){

  },
  onLoad(){
    let that = this;
    that.session = wx.getStorageSync('session');
    Api.fetchPost(Api.initAttention,{session:that.session},(err,data) => {
      if(err){return false};
      that.setData({
        attention:data.result
      });
    });
  },
  communityModel(event){
    console.log(event);
    let url = `../community-model/community-model?id=${event.target.id}`;
    wx.navigateTo({
      url
    })
  },
  roomSearch(event){
    let url = `../room-search/room-search`;
    wx.navigateTo({
      url
    })
  },
  createCM(){
    let url = `../create/create`;
    wx.navigateTo({
      url
    });
  },
  /*关注*/
  attentionOperate(event){
    let that = this;
    let session = wx.getStorageSync('session');
    if(event.target.dataset.attention == 'true'){
      let url = Api.setAttention;
      let id = event.currentTarget.id;
      Api.fetchPost(url,{id,session},function(err,docs){
        if(err){return false};
        if(docs.status === '0000'){
          that.setData({
            attention:docs.result
          });
        }
      })
    }else{
      that.communityModel(event);
    }
    
  },
  /*分享*/
  onShareAppMessage:function(){
    return {
      title:'A社',
      desc:'分享你的社圈',
      path:'/pages/index/index'
    }
  }
})
