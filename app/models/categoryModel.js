var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const categorySchema = new Schema({
	name : String
});

module.exports = mongoose.model('Category', categorySchema);
