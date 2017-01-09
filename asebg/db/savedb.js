var express = require('express');
var path = require('path');
var mongoose = require("mongoose");

var app = express();

//创建数据库
mongoose.Promise = global.Promise;
db = mongoose.createConnection('localhost', 'ase');

db.on('error',console.error.bind(console,'连接错误'));

var community = new mongoose.Schema({
	'id':String,
	'cmName':String,
	'cmCreate_time':String,
	'cmCreate_name':String,
	'lists':[{
		'session':String,
		'title':String,
		'content':String,
		'articleModel':String,
		'cover_url':String,

		'name':String,
		'avatar':String,
		'time':String,
		'published_time':String,
		'readings':String,
		'comments_number':String,
		'love_number':String,
		'classify':String,
	}],
});
var login = new mongoose.Schema({
	'session':String,
	'session_key':String,
	'openid':String,
	'attention':[],
});
var community = db.model('community',community);
var login = db.model('login',login);
module.exports = {
	login,
	community,
}
