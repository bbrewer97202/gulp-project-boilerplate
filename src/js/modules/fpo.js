"use strict";

var fpo2 = require('fpo2');

var fpo = (function() {

	/**
	 * initialization
	 */
	function init() {
		console.log("fpo init() called");
		$('body').on('adsasdsadsa', function() {
			console.log("fpo saw event broadcast via jquery from fpo2");
		});
		fpo2.init();
	}

	//public methods
	return {
		init: init
	};

}());

module.exports = fpo;