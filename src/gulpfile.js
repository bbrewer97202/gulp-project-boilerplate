var gulp = require('gulp'),
	browsersync = require('browser-sync'),
	del = require('del'),
	gulpif = require('gulp-if'),
	gulputil = require('gulp-util'),
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'),
	map = require('map-stream'),
	minifyCSS = require('gulp-minify-css'),
	minimist = require('minimist'),
	notify = require('gulp-notify'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	pngcrush = require('imagemin-pngcrush'),
	preprocess = require('gulp-preprocess'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack');

//required config files 
var config = require('./config.js');
var webpackConfig = require('./webpack.config.js');

//default to development build
var isProduction = false;
var target = 'dev';

//invoke gulp with "--env production" or "--env dist" to run production build
var argv = minimist(process.argv.slice(2));
if ((argv.env === 'production') || (argv.env === 'dist')) {
	isProduction = true;
	target = 'dist';
	console.log("Running production tasks");
} else {
	console.log("Running development tasks");
}

//clean
gulp.task('clean', function() {
	del([config.paths.dev], {force: true});
	del([config.paths.dist], {force: true});
});

//html
gulp.task('html', function() {
	return gulp.src(config.html.src)
		.pipe(preprocess({context: config.html.variables}))
		.pipe(gulp.dest(config.paths[target] + config.html.dest));
});

//images
gulp.task('images', function() {

	var options = config.images.imagemin;
	options.use = [pngcrush()];

	return gulp.src(config.images.src)
		.pipe(plumber())
		// .pipe(gulpif(isProduction, imagemin(config.images.imagemin))) //not working correctly
		.pipe(gulp.dest(config.paths[target] + config.images.dest));
});

//sass
gulp.task('sass', function() {

	//TODO: add autoprefixer
	gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(gulpif(isProduction, sass(), sass(config.sass.config)))
		.pipe(sourcemaps.write())
		.pipe(gulpif(isProduction, minifyCSS()))
		.pipe(gulp.dest(config.paths[target] + config.css.dest));
});

//javascript linting
gulp.task('jshint', function() {
	return gulp.src([
			config.js.app.src, 
			config.js.modules.src
		])
		.pipe(plumber())
		.pipe(gulpif(!isProduction, jshint('.jshintrc')))	
		.pipe(gulpif(!isProduction, notify(function (file) {
			if (file.jshint.success) {
				return false;
			}
			notify.logLevel(0);

			var errors = file.jshint.results.map(function(data) {
				if (data.error) {
					return 'Line ' + data.error.line +'\n' + ': ' + data.error.reason + '\n';
				}
			}).join("\n");

			return path.basename(file.path) + " (" + file.jshint.results.length + " errors)\n" + errors + "\n";
		})))
		.pipe(gulpif(!isProduction, jshint.reporter('jshint-stylish')));
});

//javascript
gulp.task('js', ['jshint', 'webpack']);
// gulp.task('js', ['webpack']);

//webpack
gulp.task('webpack', function() {

	//configuration extends base configuration to handle dev/dist targets
	var envConfig = Object.create(webpackConfig);
	envConfig.output.path = config.paths[target] + config.js.dest;

	//production settings
	if (isProduction) {
		envConfig.plugins = envConfig.plugins.concat([
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin()			
		]);
	}

	webpack(envConfig, function(err, stats) {
        if (err) {
        	//TODO: enable notify here
        	notify("error:" + err.message);
        	throw new gulputil.PluginError("webpack", err);
        }

        //TODO: enable logging
		// gulputil.log("[webpack]", stats.toString({
		// 	colors: true
		// }));
    });
});

//browsersync
gulp.task('browsersync', function() {
	browsersync({
		server: {
			baseDir: config.paths.dev
		}
	});
});

//build
gulp.task('build', ['html', 'images', 'sass', 'js']);

//watch
gulp.task('watch', ['browsersync', 'build'], function() {
	gulp.watch(config.html.src, ['html', browsersync.reload]);
	gulp.watch(config.sass.src, ['sass', browsersync.reload]);
	gulp.watch([
		config.js.app.src, 
		config.js.modules.src
	], ['js', browsersync.reload]);
	gulp.watch(config.images.src, ['images', browsersync.reload]);
});
	
//default
//invoke gulp with "--env production" or "--env dist" to run production build
gulp.task('default', ['build']);


