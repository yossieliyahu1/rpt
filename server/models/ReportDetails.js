
var mongoose = require('mongoose');

var RPTSchema = {
	_id: mongoose.Schema.Types.String,  // unique uuid
	type: mongoose.Schema.Types.String,  // 1 - request, 2 - response
	country: mongoose.Schema.Types.String,
	meta: mongoose.Schema.Types.Mixed,
	results: mongoose.Schema.Types.Number, // 0 - 500, 1 - error, 2 - 502, 3 - 503, 4 - 404, 5 - ok
	count: mongoose.Schema.Types.Number // total number of rows with the above details 
};

// documents in db: about 10K
// (type - 2, country - 10, meta - 0, results - 6) -> total: 120 possibilities for the filter

/*
results = {
	type : ""  // 0 - 500, 1 - error, 2 - 502, 3 - 503, 4 - 404, 5 - ok
	// msg : ""    // error message is type == 1  (add in the future)
}

results = {} if type == request
*/

module.exports = mongoose.model("RPTModel", RPTSchema, "rptModel");