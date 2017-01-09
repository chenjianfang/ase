let Api = require('../../utils/api.js');
var app = getApp()
Page({
	data:{
		searchValHolder:"读书",
		searchVal:"",
		inputFocus:true,
		recentSearch:[],
		gussSeach:[]
	},
	onLoad(){
		let that = this;
		wx.getStorage({
			key:'CMSearchRecord',
			success(res){
				that.setData({
					recentSearch:res.data
				})
			}
		});
		/*猜你喜欢的社区，这里只是初始化*/
		Api.fetchGet(Api.initCM,(err,data) => {
		  if(err){return false};
		  that.setData({
		    gussSeach:data
		  });
		});

	},
	inputSearchValue(e){
		this.setData({
			searchVal:e.detail.value
		});
	},
	/*搜索*/
	sublimeLock:true,
	searchSubmit(){
		let that = this;
		if(!this.sublimeLock || !that.data.searchVal){
			return false;
		}
		that.sublimeLock = false;
		let data = {
			cmName:this.data.searchVal
		};

		Api.fetchPost(Api.searchCM,data,function(err,docs){
			that.sublimeLock = true;
			if(docs.result === '0000'){
				let id = docs.id;
				wx.showModal({
					title:'结果',
					content:`是否进入${that.data.searchVal}社区`,
					showCancel:true,
					cancelText:'取消',
					success:function(res){
						if(res.confirm === true){
							let url = `../community-model/community-model?id=${id}`;
							wx.navigateTo({
							  url
							})
						}
					}
				});
				//保存到storage
				wx.getStorage({
					key:'CMSearchRecord',
					success(res){
						let arr = res.data;
						arr.push({'cnName':docs.cmName,'id':docs.id});
						wx.setStorage({
							key:'CMSearchRecord',
							data:arr
						});
					},
					fail(err){
						let arr = [];
						arr.push({'cmName':docs.cmName,'id':docs.id});
						wx.setStorage({
							key:'CMSearchRecord',
							data:arr
						});
					}
				});
				let recentSearch = that.data.recentSearch;
				recentSearch.push({'cmName':docs.cmName,'id':docs.id});
				that.setData({
					'recentSearch': recentSearch
				});
			}else{
				wx.showModal({
					title:'结果',
					content:`${that.data.searchVal}社区还未创建，是否创建`,
					showCancel:true,
					cancelText:'否',
					confirmText:'是',
					success:function(res){
						if(res.confirm === true){
							let url = `../create/create`;
							wx.navigateTo({
							  url
							})
						}
					}
				})
			}
		});
	},
	communityModel(event){
		let url = `../community-model/community-model?id=${event.target.id}`;
		wx.navigateTo({
		  url
		})
	},
	searchGetFocus(){

	},
	recentSeachClear(){
		this.setData({
			recentSearch:[]
		});
		wx.removeStorage({
			key:'CMSearchRecord',
		});
	},
	inputValClear(){
		this.setData({
			searchVal:''
		});
	}
})
