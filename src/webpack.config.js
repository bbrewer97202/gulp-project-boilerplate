var config = require('./config.js');
var webpack = require('webpack');
var gulputil = require('gulp-util');

module.exports = {
	entry: {
		"app": config.js.app.src,
		"header": config.js.header.src
	},
	output: {
		path: config.paths['dev'] + config.js.dest,
		filename: "[name].js"
	},
	module: {
		preLoaders: [
			{	
				//lint main js file
				test: /js\/*.js$/,
				loader: "jshint-loader"
			},
			{	
				//only lint the modules directory
				test: /js\/modules\/*/,
				loader: "jshint-loader"
			}			
		],
		loaders: [
			//modernizr is not commonJS so this mapping is required
			//TODO: abstract path
			{ 
				test: /js\/header\/modernizr\-2\.8\.3.js/,
				loader: "imports?this=>window!exports?window.Modernizr"
			}
		]
	},
	resolve: {
		modulesDirectories: ['node_modules', config.js.modules.path]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),		
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	],
	jshint: {
		reporter: function(errors) {
			console.log(gulputil.colors.underline.bgRed("jshint: " + this.resourcePath));
			errors.forEach(function(error) {
				console.log(gulputil.colors.cyan("line " + error.line + ": ") + error.reason);
			});
		}
	}
};
