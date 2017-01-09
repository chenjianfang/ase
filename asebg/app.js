"use strict";
let Api = require('./src/api.js');

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let dbModel = require('./db/savedb');
let createCM = require('./router/createCM');
let cmInit = require('./router/init');
let login = require('./router/login');
let attention = require('./router/attention');
let article = require('./router/article');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/new',createCM);
app.use('/CM',cmInit);
app.use('/login',login);
app.use('/attention',attention);
app.use('/article',article);

app.get('/saveData',function(req,res){
	dbModel.community.update({'id':'0001'},{$push:{
		'lists':
			{
				'id':'21',
				'name':'我是作者',
				'avatar':'url about logo',
				'cover_url':'url about articel logo',
				'title':'我是标题',
				'published_time':'2016-12-23',
				'readings':'900',
				'comments_number':'400',
				'love_number':'400',
				'classify':'2',
				'content':'这里写了一大堆内容包括文字图片',
			}
		}
	},{upsert:true},function(err){
		console.log(err);
	});
	res.json({"status":"0000","msg":"成功"});
});

app.listen(3000);
console.log("location:3000")