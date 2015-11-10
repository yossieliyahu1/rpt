
"use strict";

var React = require('react/addons');
var Router = require('react-router');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var ReportTable = require('./components/ReportTable');
var Insert = require('./components/Insert');
var AutoReport = require('./components/AutoReport');
var Ping = require('./components/Ping');

var App = React.createClass({

	render : function () {

		return <div className="container-fluid">
					<div className="row">
						<div className="col-md-12">
							<RouteHandler />
						</div>
					</div>
				</div>
	}
});



var routes = (
	<Route name="home" path="/" handler={App}>
		<Route name="rpt" path="rpt" handler={ReportTable} />
		<Route name="insert" path="insert" handler={Insert} />
		<Route name="run" path="run" handler={AutoReport} />
		<Route name="ping" path="ping" handler={Ping} />
	</Route>
);


Router.run(routes, function (Root, state) {
	React.render(<Root/>, app);
});