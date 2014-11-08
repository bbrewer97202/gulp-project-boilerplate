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
			"JS_SRC": "js/app.js",
			"JS_HEADER_SRC": "js/header.js",
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
		app: {
			"src": "./js/app.js" //entry path for main .js file
		},
		modules: {
			"src": "./js/modules/**/*.js", //source of main modules
			"path": "./js/modules" //path to modules directory
		},
		header: {
			"src": "./js/header/header.js" //entry path for header .js file
		},		
		dest: "js", //destination directory inside "dev" and "dist" 
	}
}

module.exports = config;
