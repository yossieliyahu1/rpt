
"use strict";

var uuid = require('uuid');

module.exports = function (app, RPTModel) {

	function find(filter, callback) {

		RPTModel.find(filter, function (error, model) {

			if (error) {
				callback({ "err": (error || "no doc") }, null);
			}
			else if (!model || model.length == 0) {
				callback(null, null);
			}
			else {
				callback(null, model);
			}
		});
	}

	app.route('/admin/rpt').get(function (req, res) {

		console.log("admin/rpt route");
		var filter = {};
		if (req.query.country) {
			filter.country = req.query.country;
		}

		if (req.query.type) {
			filter.type = req.query.type;
		}

		if (req.query.results) {
			filter.results = req.query.results;
		}

		find(filter, function (error, model) {

			if (error || !model) {
				res.jsonp({ "err": (error || "no doc") });
			}
			else {
				res.jsonp(model);
			}
		});
	})
	.post(function (req, res) {

		var filter = {
			type: req.body.type,
			country: req.body.country,
			meta: req.body.meta,
			results: req.body.results
		}

		find(filter, function (error, model) {
			if (error) {
				res.jsonp({ "err": (error || "no doc") });
			}
			else if (model) {
				model[0].count++;
				model[0].save(function (error) {
					if (error) {
						console.log(error);
					}
				});
			}
			else {
				filter._id = uuid.v1();
				filter.count = 1;
				var rpt = new RPTModel(filter);
				rpt.save(function (error) {
					if (error) {
						console.log(error);
						res.jsonp({ "err": (error || "no doc") });
					}
					else {
						res.jsonp({ "status" : "ok"});
					}
				});
			}
		});

	});

}