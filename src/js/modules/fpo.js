app.fpo = (function() {

	"use strict";

	/**
	 * initialization
	 */
	function init() {
		console.log("fpo init() called");
		app.fpo2.init();
	}

	//public methods
	return {
		init: init
	};

}());