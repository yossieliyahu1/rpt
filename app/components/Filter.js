
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
			prdct : "",
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
				<div className="col-md-offset-1 col-md-8">
					<form onSubmit={this.processRequest}>

						<div className="row input-top-margin">
							<div className="col-md-5">
								<input type="text" name="type" className="form-control" placeholder="Report Type (1 - Request, 2 - Response)" value={this.state.type} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="country" className="form-control" placeholder="Country" value={this.state.country} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="results" className="form-control" placeholder="Result code (200, " value={this.state.results} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="feed" className="form-control" placeholder="Feed (becm, shpzl, " value={this.state.feed} onChange={this.handleInputChange} />
							</div>
						</div>

						<div className="row">
							<div className="col-md-5">
								<input type="text" name="prdct" className="form-control" placeholder="Product" value={this.state.prdct} onChange={this.handleInputChange} />
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