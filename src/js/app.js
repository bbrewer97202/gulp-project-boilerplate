var app = (function() {

	"use strict";

	/**
	 * initialization
	 */
	function init() {
		console.log("app init() called");
		app.fpo.init();
	}

	//public methods
	return {
		init: init
	};

}());
