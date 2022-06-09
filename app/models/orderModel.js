var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const product=require('./productModel')
const user=require('./userModel')
var productOrderSchema = new Schema({
	product : {
		type: Schema.Types.ObjectId,
		ref: product
   },
   quantity:Number	
})

var orderSchema = new Schema({
	user : {
	 	type: Schema.Types.ObjectId,
	 	ref: user
	},
	products : [productOrderSchema],
	sum : Number,
	date : Date
},{timestamps:true});

module.exports = mongoose.model('order', orderSchema);
