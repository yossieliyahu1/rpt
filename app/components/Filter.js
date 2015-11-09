
"use strict";

var React = require('react/addons');
var action = require('./../actions/AppActionCreator.js')

var AppStore = require('../stores/AppStore');

module.exports = React.createClass({
    
	getInitialState : function(){
		return {
			country : "",
			type : "",
			feed : "",
			results : ""
		}	
	},

	processRequest : function(event){
        event.preventDefault();
        action.getData(this.state);
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
								<input type="text" name="type" className="form-control" placeholder="Report Type (1 - for Request, 2 - for Response)" value={this.state.type} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="country" className="form-control" placeholder="Country" value={this.state.country} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="results" className="form-control" placeholder="Results (0-500, 1-error, 2-502, 3-503, 4-404, 5-ok)" value={this.state.results} onChange={this.handleInputChange} />
							</div>
						</div>
						
						<div className="row input-top-margin">
							<div className="col-md-1">
								<button type="submit" className="btn btn-primary">GET</button>
							</div>
						</div>

    				</form>
				</div>
			</div>
        )
    }
})