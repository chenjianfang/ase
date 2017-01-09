//index.js
//获取应用实例
var app = getApp()
Page({
	data:{
		"textHeight":34,
		"cursorSpacing":35
	},
	onLoad(option){
		console.log(option.id);
		this.setData({
			textHeight:34
		})
	},
	lineChange(event){
		console.log(event);
		let lineCount = event.detail.lineCount;
		lineCount = lineCount>0?lineCount:1;
		this.setData({
			textHeight:34*lineCount
		})
	},
	onShareAppMessage(){
		return {
			title:"欢迎来到A社",
			desc:"A社同类的聚集地",
			path:'/pages/chat/chat'
		}
	}
})
