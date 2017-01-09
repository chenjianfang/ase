'use strict';
function getCompleteTime(arg){
	return arg<10 ? "0"+arg : arg;
}
function virtalSession(){
	let str = '0123456789abcdefghijklmnopqrstuvwxyz_-';
	let temp = '';
	for(let i = 0; i < 20; i++){
		temp += str.charAt(Math.floor(Math.random()*39));
	}
	return temp;
}
module.exports = {


	getCompleteTime,
	virtalSession,

}

