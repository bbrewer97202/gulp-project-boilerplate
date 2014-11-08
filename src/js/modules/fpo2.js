"use strict";

var jquery = require('jquery');

var fpo2 = (function() {

	/**
	 * initialization
	 */
	function init() {
		console.log("fpo2 init() called");
		$('body').trigger('adsasdsadsa');
	}

	//public methods
	return {
		init: init
	};

}());

module.exports = fpo2;