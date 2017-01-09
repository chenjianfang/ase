let Api = require('../../utils/api');
let app = getApp();
Page({
	data:{
		'lineCount':1,
		'classChoose':false,
		'animationData':{},
		'chooseImg':'../../images/chooseimg.png',
		'chooseImgBool':false,
		'title-model':[{
			'index':'1',
			'currentModel':'分享'
		},{
			'index':'2',
			'currentModel':'问答'
		}],
		'currentModel':'分享',
		'articleTitle':'',
		'articleContent':'',
	},
	onLoad(option){
		console.log(option.id);
		this.id = option.id;
	},
	onShow(){
		let animation = wx.createAnimation({
			timingFunction: "ease"
		});
		this.animation = animation;
	},
	articleContentChange(event){
		console.log(event.detail);

		let lineCount = event.detail.lineCount;
		lineCount = lineCount > 15 ? 15 : lineCount;
		this.setData({
			lineCount
		});
	},
	contentBlur(event){
		console.log(event);
	},
	classContentChoose(){
		let that = this;
		let temp = this.data.classChoose;
		that.setData({
			'classChoose':!temp
		});
		if(!temp){
			that.animation.translateY(app.dpr*(-45)/2).step({
				duration:200	

			});
			that.setData({
				'animationData':that.animation.export()
			});
		}else{
			that.animation.translateY(0).step({
				duration:200
			});
			that.setData({
				'animationData':that.animation.export()
			});
		}
		
	},
	/*选择文章类型*/
	classChooseWrapper(event){
		console.log(event);
		let that = this;
		let model = event.target.dataset.titleModel;
		that.setData({
			currentModel:model
		});
		let titleModel = that.data['title-model'];
		titleModel.forEach((value) => {
			if(value.index == model){
				that.setData({
					'currentModel': value.currentModel
				});
			}
		});
	},
	handlerInput(event){
		console.log(event);
		this.setData({
			'articleTitle':event.detail.value
		});
	},
	handleText(event){
		console.log(event);
		this.setData({
			'articleContent':event.detail.value
		});
	},
	/*文章发布*/
	publishArticle(){
		if(this.data.articleTitle == '' || this.data.articleContent == ''){
			return false;
		}
		let that = this;
		if(that.data.chooseImgBool){
			wx.uploadFile({
				url:Api.pulishArticleImg,
				filePath:that.data.chooseImg[0],
				name:'file',
				formData:{
					'user':'test'
				},
				success(res){
					console.log(res);
				},
				fail(err){
					console.log(err);
				}
			});
		};

		let session = wx.getStorageSync('session'),
			id = this.id,
			articleModel=that.data.currentModel,
			title = this.data.articleTitle,
			content = this.data.articleContent,
			avatar = app.globalData.userInfo.avatarUrl,
			name = app.globalData.userInfo.nickName;

		let data = {
			session,
			id,
			articleModel,
			title,
			content,
			avatar,
			name,
		}
		Api.fetchPost(Api.pulishArticle,data,(err,docs) => {
			if(err){return false};
			console.log(docs);
			if(docs.status == '0000'){
				wx.navigateBack();
			}
		});
	},
	/*选择图片*/
	chooseImg(){
		let that =this;
		wx.chooseImage({
			count:1,
			success(res){
				let tempFilePath = res.tempFilePaths;
				that.setData({
					chooseImg:tempFilePath,
					chooseImgBool:true,
				});
			}
		})
	}
})
