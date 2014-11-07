/******************************************************************************
 * configuration
 ******************************************************************************/
var config = {

	paths: {
		"src": "src", //name of the source directory
		"dev": "../dev/", //name of the development directory, relative to srcPath
		"dist": "../dist/", //name of the production directory, relative to srcPath
	},

	sass: {
		"src": "./sass/**/*.scss", //location of SASS source files
		"config": { //SASS compile configuration (for development)
			sourceComments: 'map', 
			sourceMap: 'sass',
			errLogToConsole: true,
			outputStyle: 'nested'
		} 
	},

	html: {
		"src": "./html/**/*.html", //location of source HTML files
		"dest": "", //destination directory
		"variables": { //values pre-processed into HTML at compile time
			"JS_SRC": "js/scripts.js",
			"JS_HEADER_SRC": "js/header.js",
			"JS_VENDOR_SRC": "js/vendor.js"
		}		
	},

	images: {
		"src": "./images/**/*", //location of source image files
		"dest": "images", //destination directory
		"imagemin": { //imagemin configuration 
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]			
		} 
	},

	css: {
		"dest": "css", //destination directory
	},

	js: {
		"dest": "js", //destination directory
		"app": {
			"src": "./js/app.js", //source "main" JS (first JS to appear in js.app.dest file)			
			"dest": "scripts.js", //target name for source JavaScript file
			"init": {
				"src": "./js/init.js", //init JavaScript code (last JS to appear in js.app.dest file)
			},
			"modules": {
				"src": "./js/modules/**/*.js", //location of JavaScript module source files
			},			
		},
		"vendor": {
			"src": "./js/vendor/**/*.js", //location of vendor JavaScript source files
			"dest": "vendor.js" //target name for vendor JavaScript file
		},
		"header": {
			"src": "./js/header/**/*.js", //location of header JavaScript source files
			"dest": "header.js" //target name for header JavaScript file
		}			
	}
}

module.exports = config;
