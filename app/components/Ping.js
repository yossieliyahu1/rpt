
"use strict";

var React = require('react/addons');
var action = require('./../actions/AppActionCreator.js')

var QAStore = require('../stores/QAStore');

module.exports = React.createClass({
    
	getInitialState : function (){
		return {
			data : {
				feeds: [],
				ranks: [],
				logs : []
			}
		}
	},

	componentWillMount : function (){

		this.setState({ data : QAStore.data});

		QAStore.setData();

		var that = this;
		QAStore.onChange(function(newData){
			that.setState({ data : newData });
		})

		setInterval(function (){
			action.ping();
		}, 1000);
	},

    render:function(){
    	return (
			<div className="row">
				<div className="col-md-8">
					{
						this.state.data.logs.map(function(row, index){
							return (<div>{row}</div>)
						})                       
					}	
				</div>
			</div>
        )
    }
})