"use strict";
class CMBASIC {
	constructor(session){
		this.session = session;
	}
}
class CMAttentionInit extends CMBASIC {
	constructor(session,dbModelLogin,dbModelCommunity){
		super(session);
		this.dbModelLogin = dbModelLogin;
		this.dbModelCommunity = dbModelCommunity;
	}
	getAttentionInit(cb){
		let that = this;
		that.dbModelLogin.find({session:that.session}).select({'_id':0,attention:1}).exec(function(err,data){
			if(err){console.log(err);return false};
			if(data.length === 0){cb(data);return false;};
			let idItem = data[0]['attention'];
			let len = idItem.length;
			let wrapper = [];
			let count = 0;
			idItem.forEach((value)=>{
				that.dbModelCommunity.findOne({'id':value}).select({'_id':0,'id':1,'cmName':1}).exec( (err,data) => {
					if(err){
						console.log(err);
						count++;
						if(count == len){
							cb(wrapper);
						}
					}else{
						wrapper.push(data);
						count++;
						if(count == len){
							cb(wrapper);
						}
					}
				});
			});
		})
	}

}
module.exports = {
	CMAttentionInit,
}






