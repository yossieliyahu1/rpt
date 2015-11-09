
"use strict";

var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function AppStore(){
    

    var app = {

    	pageMin : 0,
    	pageMax: 20,

    	data: []
	};
    
    var listeners = [];

    function getApp() {
    	return app;
    }

    function getData(filter) {
    	app = {

    		pageMin: 0,
    		pageMax: 20,

    		data: []
    	};
    	triggerListeners();

    	helper.get("admin/rpt/", filter).then(function (data) {
    		app.data = data;
    		triggerListeners();
    	});
    }

    function setData(data) {
    	helper.post("admin/rpt/", data).then(function (data) {
    		app.data = data;
    		triggerListeners();
    	});
    }
   
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
		listeners.forEach(function(listener){
			listener(app);
		})
	};
    
    dispatcher.register(function (event) {
        var split = event.type.split(':');
        if (split[0] === 'report-details') {
            switch(split[1]){
                case "get": 
                	getData(event.payload);
                	break;
            	case "set":
            		setData(event.payload);
            		break;
            }
        }
    });
    
    return {
    	getData: getData,
    	setData: setData,
		app : app,
        onChange : onChange
    }

}

module.exports = new AppStore();