"use strict";
let Api = require('../src/api.js');

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let dbModel = require('../db/savedb');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//社区初始化
app.get('/init',function(req,res){
	dbModel.community.find().select({'id':true,'cmName':true,'_id':false}).exec(function(err,data){
		if(err){console.log(err);return};
		res.send(data);
	});
});
//社区搜索
app.post('/search',function(req,res){
	let cmName = req.body.cmName;
	console.log(cmName);
	dbModel.community.find({cmName}).select({'id':true,'cmName':true,'_id':false}).exec(function(err,data){
		if(err){console.log(err);return};
		console.log(data);
		if(data.length === 0){
			res.json({'result':'0002','msg':'没有搜索到该社区'});
		}else{
			res.json({'result':'0000',id:data[0].id,cmName:data[0].cmName});
		}
	});
});
// 单元社区内容结果
app.post('/showContent',function(req,res){
	let id = req.body.id;
	dbModel.community.find({id}).select({'lists':true,'_id':false}).exec(function(err,data){
		if(err){console.log(err);return};
		res.send(data);
	});
});
module.exports = app;