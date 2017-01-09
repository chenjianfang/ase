"use strict";
let Api = require('../src/api.js');

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let dbModel = require('../db/savedb');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/createCM',function(req,res){
	var createName = req.body.creteName;
	var cmName = req.body.cmName;
	let nowTime = new Date();
	let y = nowTime.getFullYear();
	let m = Api.getCompleteTime(nowTime.getMonth()+1);
	let d = Api.getCompleteTime(nowTime.getDate());

	dbModel.community.find().sort({_id:-1}).exec(function(err,data){
		if(err){console.log(err);return}
		console.log(data);
		let len = data.length;
		let createBool = false;
		data.forEach((value,index) => {
			if(cmName === value.cmName){
				createBool = true;
				return;
			}
		});
		if(createBool){
			res.json({"status":"0001","msg":"已经创建了"});
		}else{
			let id = len === 0 ?  0 : parseInt(data[0].id)+1;
			let dbEntity = new dbModel.community({
				'id':id,
				'cmName':cmName,
				'cmCreate_time':`${y}/${m}/${d}`,
				'cmCreate_name':createName,
			});
			dbEntity.save(function(err){
				console.log(err);
			});
			res.json({"status":"0000","msg":"成功"});
		}
		
	});
});

module.exports = app;