
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

    var sts = ["xbox", "ipad"];

    var log = {
    	from: "",
    	to: "",
		msg:""
    }

    var currentQA = {
		feedIdx : 0,
		countryIdx : 0,
		stIdx : 0 
	}

	function getNextUrl() {

		if (currentQA.feedIdx < 0) {
			currentQA = {
				feedIdx: 0,
				countryIdx: 0,
				stIdx: 0
			}
		}

		var feed = data.feeds[currentQA.feedIdx];
		var country = feed.coverage.cntry.values[currentQA.countryIdx];
		var st = sts[currentQA.stIdx];

		if (++currentQA.stIdx == sts.length) {
			currentQA.stIdx = 0;
			if (++currentQA.countryIdx == feed.coverage.cntry.values.length) {
				currentQA.countryIdx = 0;
				// goto the next feed
				if (++currentQA.feedIdx == data.feeds.length) {
					currentQA.feedIdx = -1;
				}
			}
		}

		log.msg += "Request [" + feed.name + "][" + country + "][" + st + "] ...  ";
		return "http://pref.com4ad.com/offers/" + feed + "?cntry=" + country + "&prdct=coms001&st=" + st + "&ctgry=mobile&subid=1&n=10&callback=window.ctx__.srv.rslt";
    }

    function ping() {

    	log = {
    		from: "",
    		to: "",
    		msg: ""
    	}

    	window.ctx__ = {
    		srv: {
    			rslt: function (rslts) {
    				if (!rslts) {
    					log.msg += "data is null! ";
    				}
    				else if (rslts.length == 0) {
    					log.msg += "data is empty! ";
    				}
    				else {
    					log.msg += rslts.length + " Results ... ";
    				}
    				triggerListeners();
    			}
    		}
    	};

    	log.from = new Date().getTime();
    	$.ajax({
    		url: getNextUrl(),
    		dataType: 'jsonp',
    		contentType: "application/json",
    		complete: function (jqXHR, textStatus) {
    			log.to = new Date().getTime();
    			log.msg += "Done with [" + jqXHR.status + "] In " + (log.to - log.from);
    			data.logs.push(log.msg);
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