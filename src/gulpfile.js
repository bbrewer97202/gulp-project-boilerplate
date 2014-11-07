var gulp = require('gulp'),
	browsersync = require('browser-sync'),
	changed = require('gulp-changed'),
	concat = require('gulp-concat'),
	del = require('del'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	jshint = require('gulp-jshint'),
	minifyCSS = require('gulp-minify-css'),
	minimist = require('minimist'),
	pngcrush = require('imagemin-pngcrush'),
	preprocess = require('gulp-preprocess'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify');

//config file is required
var config = require('./gulp-config.js');

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
		// .pipe(gulpif(isProduction, imagemin(config.images.imagemin))) //not working correctly
		.pipe(gulp.dest(config.paths[target] + config.images.dest));
});

//sass
gulp.task('sass', function() {
	gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(gulpif(isProduction, sass(), sass(config.sass.config)))
		.pipe(sourcemaps.write())
		.pipe(gulpif(isProduction, minifyCSS()))
		.pipe(gulp.dest(config.paths[target] + config.css.dest));
});

//JavaScript
gulp.task('js', function() {

	/**
	 * "app" source js compiled into one file with:
	 *   1) "main" file as first entry
	 *   2) all javascript modules 
	 *   3) init file as last entry
	 */
	gulp.src([
			config.js.app.src, 
			config.js.app.modules.src,
			config.js.app.init.src,
		])
		.pipe(concat(config.js.app.dest))
		.pipe(gulpif(!isProduction, jshint('.jshintrc')))	
		.pipe(gulpif(!isProduction, jshint.reporter('jshint-stylish')))
		.pipe(gulpif(isProduction, uglify()))
		.pipe(gulp.dest(config.paths[target] + config.js.dest));

	//vendor js compiled into one file
	gulp.src(config.js.vendor.src)
		.pipe(concat(config.js.vendor.dest))
		.pipe(gulp.dest(config.paths[target] + config.js.dest));

	//header js compiled into one file
	gulp.src(config.js.header.src)
		.pipe(concat(config.js.header.dest))
		.pipe(gulp.dest(config.paths[target] + config.js.dest));

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
		config.js.app.modules.src,
		config.js.app.init.src,
	], ['js', browsersync.reload]);
	gulp.watch(config.images.src, ['images', browsersync.reload]);
});
	
//default
//invoke gulp with "--env production" or "--env dist" to run production build
gulp.task('default', ['build']);


