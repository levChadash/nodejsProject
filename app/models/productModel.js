var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var category =require('./categoryModel')

var productSchema = new Schema({
	name : String,
	description : String,
	price : Number,
	category : {
	 	type: Schema.Types.ObjectId,
	 	ref: category
	},
	image : String
});

module.exports = mongoose.model('product', productSchema);
