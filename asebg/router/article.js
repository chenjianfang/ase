"use strict";
let Api = require('../src/api');
let express = require('express');
let bodyParser = require('body-parser');
let multiparty = require('multiparty');
let util = require('util');
let path = require('path');
const fs = require('fs');

let dbModel = require('../db/savedb');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/publish',(req,res) => {
	let session = req.body.session,
		id = req.body.id,
		articleModel = req.body.articleModel,
		title = req.body.title,
		content = req.body.content,
		avatar = req.body.avatar,
		name = req.body.name;
	//创建时间
	let nowDate = new Date();
	let yy = nowDate.getFullYear();
	let mm = Api.getCompleteTime(nowDate.getMonth()+1);
	let dd = Api.getCompleteTime(nowDate.getDate());
	let hh = Api.getCompleteTime(nowDate.getHours());
	let min = Api.getCompleteTime(nowDate.getMinutes());

	let nowTime = `${yy}/${mm}/${dd} ${hh}:${min}`;
	console.log(nowTime);

	dbModel.community.update({id},{$push:{
		'lists':{
			session,
			articleModel,
			title,
			content,
			avatar,
			name,
			time:nowTime
		}
	}},{upsert:true},function(err){
		if(err){console.log(err);return false};
		res.json({"status":"0000","msg":"发表成功"});
	});
});
//文章图片上传
app.post('/publishImg',(req,res) => {
	var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
    	if(err){console.log(err);return false};
    	console.log(files.file[0]);
      	fs.createReadStream(files.file[0].path).pipe(fs.createWriteStream('lib/article/'+files.file[0].originalFilename+''));
      	res.json({'status':'0000'})
    });
});
module.exports = app;