
"use strict";

var uuid = require('uuid');
var request = require("request");

function RPT(req, res, RPTModel) {


	this.find = function (filter, idx, callback) {

		var query = RPTModel.find(filter);

		query.limit(1000);
		if (idx) {
			query.skip(idx.from);
		}

		query.exec(function (error, model) {

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

		/*
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
		*/
	};

	this.get = function () {

		console.log("admin/rpt route");
		var filter = {};
		if (req.query.country) {
			filter.country = req.query.country;
		}

		if (req.query.type) {
			filter.type = req.query.type;
		}

		if (req.query.results) {
			filter["results.code"] = Number(req.query.results);
		}

		if (req.query.feed) {
			filter["meta.feed"] = req.query.feed;
		}

		if (req.query.prdct) {
			filter["meta.prdct"] = req.query.prdct;
		}

		if (req.query.date) {
			filter["date"] = { $gt: req.query.date.from, $lt: req.query.date.to }
		}

		var idx = {
			from : req.params.from || 0,
			to : req.params.to || 100
		}

		this.find(filter, idx, function (error, model) {

			if (error || !model) {
				res.jsonp({ "err": (error || "no doc") });
			}
			else {
				res.jsonp(model);
			}
		});
	};

	this.post = function () {

		var filter = {
			type: req.body.type ? Number(req.body.type) : 0,
			country: req.body.country || "NA"
		}

		var meta = "";
		if(req.body.meta){
			meta = JSON.parse(req.body.meta);
			filter["meta.feed"] = meta.feed;
			filter["meta.cntry"] = meta.cntry;
			filter["meta.ctgry"] = meta.ctgry;
			filter["meta.prdct"] = meta.prdct;
		}

		var results = "";
		if(req.body.results){
			results = JSON.parse(req.body.results);
			filter["results.status"] = results.status;
			filter["results.code"] = results.code;
		}

		console.log("FLTR - " + JSON.stringify(filter));

		this.find(filter, null, function (error, model) {
			if (error) {
				console.log(error);
				res.jsonp({ "err": (error || "no doc") });
			}
			else if (model) {
				model[0].count++;
				model[0].save(function (error) {
					if (error) {
						console.log(error);
						res.jsonp({ "err": (error || "no doc") });
					}
					else {
						console.log("record updated");
						res.jsonp({ "status": "ok" });
					}
				});
			}
			else {
				var obj = {
					_id: uuid.v1(),
					type: filter.type,
					country: filter.country,
					meta: meta,
					results : results,
					count: 1
				};

				var rpt = new RPTModel(obj);
				rpt.save(function (error) {
					if (error) {
						console.log(error);
						res.jsonp({ "err": (error || "no doc") });
					}
					else {
						console.log("new record");
						res.jsonp({ "status": "ok" });
					}
				});
			}
		});
	}
}


module.exports = function (app, RPTModel) {

	app.route('/admin/rpt/:from?/:to?').get(function (req, res) {
		new RPT(req, res, RPTModel).get();
	})
	.post(function (req, res) {
		new RPT(req, res, RPTModel).post();
	});

	app.route('/admin/feeds').get(function (req, res) {

		request.get('http://pref.com4ad.com/data/feeds.js', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			}
		});

	});

	app.route('/admin/ranks').get(function (req, res) {

		request.get('http://pref.com4ad.com/data/ranks.js', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			}
		});
	});

}