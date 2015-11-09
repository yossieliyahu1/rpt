
"use strict";

module.exports = function (app) {

	var ReportDetails = require('./models/ReportDetails');

	require("./routes/admin")(app, ReportDetails);
}