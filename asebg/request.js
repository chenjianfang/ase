"use strict";
let Api = require('./src/api.js');

let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let path = require('path');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let count = 50;
let st = setInterval(() => {
	console.log(count);
	request('http://res.dingdanglaila.com/wechat/dingwei/index.html', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Show the HTML for the Google homepage. 
	  }
	})
},1);



app.listen(3000);
console.log("location:3000")