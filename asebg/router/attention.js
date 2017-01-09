"use strict";
let Unit = require('../src/unit');

let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let dbModel = require('../db/savedb');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/set',function(req,res){
	let id = req.body.id;
	let session = req.body.session;
	console.log(id);
	console.log(session);
	dbModel.login.update({session},{$addToSet:{
		'attention':id
	}},function(){
		let cmAtten = new Unit.CMAttentionInit(session,dbModel.login,dbModel.community);
		cmAtten.getAttentionInit(function(result){
			console.log(result);
			res.json({'status':'0000','result':result});
		});
	})
});
app.post('/init',function(req,res){
	let session = req.body.session;
	console.log(session);
	let cmAtten = new Unit.CMAttentionInit(session,dbModel.login,dbModel.community);
	cmAtten.getAttentionInit(function(result){
		console.log(result);
		res.json({'status':'0000','result':result});
	});
});

module.exports = app;