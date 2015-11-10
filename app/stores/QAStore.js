
"use strict";

var dispatcher = require('./../dispatcher.js');
var helper = require('./../helpers/RestHelper.js');

function QAStore(){
    

    var data = {
    	feeds: [],
    	ranks: [],
		logs : []
    }

    var listeners = [];

    function getData() {
    	return data;
    }

    function clear() {
    	data.feeds = [];
    	data.ranks = [];
    	data.logs = [];
    }

    function setData() {
    	clear();
    	helper.get("admin/feeds/").then(function (feeds) {
    		var msg = "";
    		for (var i = 0 ; i < feeds.length ; i++) {
    			if (feeds[i].active) {
    				msg += "\nactive feed [" + feeds[i].name + "]";
    				data.feeds.push(feeds[i]);
    			}
    		}
    		helper.get("admin/ranks/").then(function (ranks) {
    			data.ranks = ranks;
    			triggerListeners();
    		});
    	});
    }

    function getNextUrl(){
    	return "https://pref.com4ad.com/offers/https?cntry=us&prdct=coms001&st=xbox&ctgry=games&subid=1&n=10&ip=&callback=window.ctx__.srv.rslt";
    }

    function ping() {

    	window.ctx__ = {
    		srv: {
    			rslt: function (rslts) {
    				if (!rslts) {
    					data.logs.push("data is null");
    				}
    				else if (rslts.length == 0) {
    					data.logs.push("data is empty");
    				}
    				else {
    					data.logs.push(rslts[0].meta.feed + "--" + rslts.length);
    				}
    				triggerListeners();
    			}
    		}
    	};

    	$.ajax({
    		url: getNextUrl(),
    		dataType: 'jsonp',
    		complete: function (jqXHR, textStatus) {
    			data.logs.push("done with status " + textStatus + "--" + jqXHR.status);
    			triggerListeners();
    		}
    	});
    }

   
    function onChange(listener){
        listeners.push(listener);
    }
    
    function triggerListeners(){
    	listeners.forEach(function (listener) {
    		listener(data);
		})
	};
    
    dispatcher.register(function (event) {
        var split = event.type.split(':');
        if (split[0] === 'qa') {
        	switch (split[1]) {
        		case "ping":
        			ping();
        			break;
        	}
        }
    });
    
    return {
    	getData: getData,
    	setData: setData,
    	data: data,
    	ping: ping,
        onChange : onChange
    }

}

module.exports = new QAStore();