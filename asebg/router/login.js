"use strict";
let request = require('request');
let Api = require('../src/api.js');

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let dbModel = require('../db/savedb');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/session',function(req,res){
	let code = req.body.code;
	request('https://api.weixin.qq.com/sns/jscode2session?appid=wx9aa2072e8423b862&secret=46b3a7f9fd3cb051d068593ba957f366&js_code='+code+'&grant_type=authorization_code',function(error,response,body){
		if(!error && response.statusCode === 200){
			body = JSON.parse(body)
			console.log(body);
			let session = Api.virtalSession();
			let dbEntity = new dbModel.login({
				'session':session,
				'session_key':body['session_key'],
				'openid':body['openid'],
			});
			dbEntity.save(function(err){});
			res.json({'status':'0000','session':session});
		}
	})
});

module.exports = app;