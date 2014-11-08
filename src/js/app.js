"use strict";

var fpo = require('fpo');

var app = (function() {

	/**
	 * initialization
	 */
	function init() {
		console.log("app init() called");
		fpo.init();
	}

	//public methods
	return {
		init: init
	};

}());

app.init();