
"use strict";


// https://datatables.net/examples/data_sources/js_array.html


var React = require('react/addons');
var helper = require('./../helpers/RestHelper.js');

var Filter = require('./Filter');
var AppStore = require('../stores/AppStore');

module.exports = React.createClass({

	getInitialState : function (){
		return {
			app : {
				pageMin : 0,
				pageMax: 20,

				data: []
			}
		}
	},

	componentWillMount : function (){

		this.setState({ app : AppStore.app});

		var that = this;
		AppStore.onChange(function(app){
			that.setState({ app : app });
		})
	},

	render:function(){
		return (<div>
			<div className="row">
						<div className="col-md-12">
							<Filter />
				</div>
			</div>
            <div className="row">
						<div className="col-md-12">
							<hr />
							 <div className="table-responsive">
								<table className="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th>ID</th>
												<th>Type</th>
												<th>Country</th>
												<th>Meta</th>
												<th>Results</th>
												<th>Count</th>
											</tr>
										</thead>
										<tbody>
											{
                    							this.state.app.data.map(function(row, index){
                    								return (<tr><td>{row._id}</td><td>{row.type}</td><td>{row.country}</td><td>{JSON.stringify(row.meta)}</td><td>{JSON.stringify(row.results)}</td><td>{row.count}</td></tr>)
												})                       
											}	
										</tbody>
								</table>
							</div>
				</div>
			</div>
			</div>
        )
    }
})