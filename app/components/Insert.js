
"use strict";

var React = require('react/addons');
var action = require('./../actions/AppActionCreator.js')

var AppStore = require('../stores/AppStore');

/*

{
	_id: mongoose.Schema.ObjectId,  // unique uuid
	type: mongoose.Schema.Types.String,  // 1 - request, 2 - response
	country: mongoose.Schema.Types.String,
	meta: mongoose.Schema.Types.Mixed,
	results: mongoose.Schema.Types.Mixed,
	count: mongoose.Schema.Types.Number // total number of rows with the above details 
};

*/


module.exports = React.createClass({
    
	getInitialState : function(){
		return {
			_id: "",
			type: "",
			country: "",
			meta: "",
			results: "",
			count :""
		}
	},

	processRequest : function(event){
        event.preventDefault();
        action.setData(this.state);
    },

	handleInputChange : function(){
		var state = this.state;
		state[event.target.name] = event.target.value;
		this.setState(state);
	},

    render:function(){
    	return (
			<div id="user-details" className="row">
				<div className="col-md-offset-2 col-md-8">
					<form onSubmit={this.processRequest}>
						<div className="row input-top-margin">
							<div className="col-md-5">
								<input type="text" name="type" className="form-control" placeholder="Report Type" value={this.state.type} onChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<input type="text" name="country" className="form-control" placeholder="Country" value={this.state.country} onChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<input type="text" name="meta" className="form-control" placeholder="Meta" value={this.state.mate} onChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="col-md-5">
								<input type="text" name="results" className="form-control" placeholder="Results" value={this.state.results} onChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row input-top-margin">
							<div className="col-md-1">
								<button type="submit" className="btn btn-primary">Post</button>
							</div>
						</div>

    				</form>
				</div>
			</div>
        )
    }
})