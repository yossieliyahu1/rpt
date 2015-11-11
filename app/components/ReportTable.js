
"use strict";


var React = require('react/addons');
var helper = require('./../helpers/RestHelper.js');

var Filter = require('./Filter');
var Table = require('./Table');
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

	columns : [
		{ title: 'Date', prop: 'date', width : 150  },
		{ title: 'ID', prop: '_id', width : 350  },
		{ title: 'Type', prop: 'type', width : 150 },
		{ title: 'Country', prop: 'country', width : 150 },
		{ title: 'Meta', prop: 'meta' },
		{ title: 'Results', prop: 'results' },
		{ title: 'Count', prop: 'count', width : 150 }
	],

	componentWillMount : function (){

		this.setState({ app : AppStore.app});

		var that = this;
		AppStore.onChange(function(app){
			that.setState({ app : app });
		});
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
					<Table cols={this.columns} rows={this.state.app.data} />
				</div>
		    </div>


            
			</div>
        )
    }
})