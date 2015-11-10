
"use strict";

var dispatcher = require('./../dispatcher.js');

module.exports = {

    getData:function(item){
        dispatcher.dispatch({
            payload:item,
            type:"report-details:get"
        })
    },

    setData:function(item){
    	dispatcher.dispatch({
    		payload:item,
    		type:"report-details:set"
    	})
    },

    ping: function () {
    	dispatcher.dispatch({
    		payload: null,
    		type: "qa:ping"
    	})
    }
}