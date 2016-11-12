'use strict';

let gulp = require('gulp'),
	config = require('../config'),
	$ = require('./plugins');

/*
 * EJS→HTML変換と圧縮
 */
gulp.task('html', () => {
	gulp.src(config.path.ejs.src)
		.pipe($.plumber({
			errorHandler: $.notify.onError('<%= error.message %>')
		}))
		.pipe($.ejs({}, {ext: '.html'}))
		.pipe($.htmlmin(config.ejs.minify))
		.pipe(gulp.dest(config.path.ejs.dest))
		.pipe($.browser.stream());
});