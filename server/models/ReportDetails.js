
var mongoose = require('mongoose');

var RPTSchema = {
	_id: mongoose.Schema.Types.String,  // unique uuid
	// date : { type: Date, default: new Date().getTime() },
	type: mongoose.Schema.Types.String,  // 1 - request, 2 - response
	country: mongoose.Schema.Types.String,
	meta: mongoose.Schema.Types.Mixed,
	results: mongoose.Schema.Types.Mixed, // 0 - 500, 1 - error, 2 - 502, 3 - 503, 4 - 404, 5 - ok
	count: mongoose.Schema.Types.Number // total number of rows with the above details 
};

module.exports = mongoose.model("RPTModel", RPTSchema, "rptModel");