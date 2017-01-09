let Api = require('../../utils/api');
var app = getApp();
Page({
	data:{
		"hideBool":false,
		"CMContent":[],
		"searchValue":"",
		"classifi":"0",
	},
	onLoad(option){
		this.id = option.id;
		this.getContent(this.id);
	},
	onShow(){
		this.getContent(this.id);
	},
	getContent(id){
		let that = this;
		let data = {
			id
		}
		Api.fetchPost(Api.contentArticleCM,data,function(err,docs){
			let CMContent = docs[0].lists;
			console.log(CMContent);
			that.setData({
				CMContent
			});
		});
	},
	goChatRoom(){
		let url = `../chat/chat?id=${this.id}`;
		wx.navigateTo({
			url
		});
	},
	jsCommunitySearch(){
		this.setData({
			"hideBool":true,
		});
	},
	/*搜索背景隐藏*/
	shadowBgOperate(){
		this.setData({
			"hideBool":false,
		});
	},
	goEdit(){
		let url = `../send-article/send-article?id=${this.id}`;
		wx.navigateTo({
			url
		});
	},
	inputSearchValue(event){
		this.setData({
			searchValue:event.detail.value
		});
	},
	//搜索结果清除
	inputValueClear(){
		this.setData({
			searchValue:""
		});
	},
	//类型选择
	classificationSelect(event){
		let classifi = event.target.dataset.classifi;
		if(classifi){
			this.setData({
				classifi:event.target.dataset.classifi
			});
		}
	}
})
