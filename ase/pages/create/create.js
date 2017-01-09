//获取应用实例
let app = getApp();
let Api = require('../../utils/api');
Page({
	data:{
		CMName:"",
		createName:"",
	},
	onLoad(option){
		console.log(option.id);
	},
	bindCMName(e){
		this.setData({
			CMName:e.detail.value
		});
	},
	createName(e){
		this.setData({
			createName:e.detail.value
		});
	},
	createCM(){
		let that = this;
		if(that.data.CMName.trim().length>0 && that.data.createName.trim().length>0){
			let xhrData = {
				creteName:that.data.createName,
				cmName:that.data.CMName
			}
			Api.fetchPost(Api.createCM,xhrData,function(err,docs){
				if(err){return false}
				console.log(docs);
				if(docs.status === '0000'){
					wx.switchTab({
						url:'../index/index',
						succuss(){
							console.log("成功")
						},
						fail(err){
							console.log(err)
						}
					})
				}else{
					wx.showModal({
						title:'提示',
						content:docs.msg,
						showCancel:false,
						success(cfm){
							console.log(cfm);
							that.setData({
								CMName:"",
								createName:""
							});
						}
					})
				}
			});
		}
	}
})
