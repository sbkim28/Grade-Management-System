const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const gradeVO = mongoose.Schema({
	intNum:{
		type:Number,
		min:1,
		required:true
	},
	strName:{
		type:String,
		required:true
	},
	intKor:{
		type:Number,
		min:0,
		max:100,
		required:true
	},
	intMath:{
		type:Number,
		min:0,
		max:100,
		required:true
	},
	intEng:{
		type:Number,
		min:0,
		max:100,
		required:true
	},
});
gradeVO.methods.getTotal = function(){
	let total = this.intKor+this.intMath+this.intEng;
	return total;
};
gradeVO.methods.getAvg = function(){
	let avg = this.intKor +this.intMath+this.intEng;
	avg = Math.round(avg/3*1000);
	return avg/1000;
};
module.exports = mongoose.model('grade',gradeVO);