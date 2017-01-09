'use strict';
// api 路径
let HOST = 'http://192.168.9.105:3000';
// let HOST = 'http://120.27.121.240:3000';
// post 创建社区
let createCM = HOST + '/new/createCM';
// get 社区初始化
let initCM = HOST + '/CM/init';
// post 登录态
let loginSession = HOST + '/login/session';
// 关注某社
let setAttention = HOST + '/attention/set';
// 初始关注某社
let initAttention = HOST + '/attention/init';
// post 发布文章
let pulishArticle = HOST + '/article/publish';
// post 上传图片
let pulishArticleImg = HOST + '/article/publishImg';
// post 搜索社区
let searchCM = HOST + '/CM/search';
// post 单元社区内容
let contentArticleCM = HOST + '/CM/showContent'
function fetchGet(url, callback) {
  wx.request({
    url: url,
    header: { 'Content-Type': 'application/json' },
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    url: url,
    data: data,
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.error(e)
      callback(e)
    }
  })
}

module.exports = {
  // API
  createCM,
  initCM,
  loginSession,
  setAttention,
  initAttention,
  pulishArticle,
  pulishArticleImg,
  searchCM,
  contentArticleCM,
  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost


}
