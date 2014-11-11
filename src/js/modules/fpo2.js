"use strict";

var $ = require('jquery');

var fpo2 = (function() {

	/**
	 * initialization
	 */
	function init() {
		console.log("fpo2 init() called");
		$('body').trigger('testevent');
	}

	//public methods
	return {
		init: init
	};

}());

module.exports = fpo2;