'use strict';

/**
 * スクリプトタスク
 * JSファイルをwebpackを使ってコンパイルして出力する
 */

let gulp = require('gulp'),
	config = require('../config'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	$ = require('./plugins'),
	handleErrors = () => {
		let args = Array.prototype.slice.call(arguments);
		$.notify.onError('<%= error.message %>')
			.apply(this, args);
		this.emit('end');
	};

/*
 * Browserify & Gulp
 */
gulp.task('setWatch', () => {
	global.isWatching = true;
});
gulp.task('browserify', () => {
	let b = browserify(config.browserify.bundleOption)
		.transform('babelify')
		.transform('browserify-shim')
		.transform('debowerify');
	let bundle = () => {
		b.bundle()
			.pipe($.plumber({
				errorHandler: $.notify.onError('<%= error.message %>')
			}))
			.pipe(source(config.browserify.filename))
			.pipe(gulp.dest(config.browserify.output));
	};
	if (global.isWatching) {
		let bundler = watchify(b);
		bundler.on('update', bundle);
	}
	bundle();
});
gulp.task('watchify', ['setWatch', 'browserify']);

/*
 * Precompress JS
 */
gulp.task('preJs', () => {
	gulp.src(config.path.js.src)
		.pipe($.plumber({
			errorHandler: $.notify.onError('<%= error.message %>')
		}))
		.pipe($.sourcemaps.init())
		.pipe($.uglify())
		.pipe($.rename({
			extname: '.min.js'
		}))
		.pipe($.sourcemaps.write(config.js.sourcemaps))
		.pipe(gulp.dest(config.path.js.dest))
		.pipe($.browser.reload({ stream: true }));
})