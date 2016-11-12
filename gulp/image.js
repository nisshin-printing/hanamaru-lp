'use strict';

/**
 * Image圧縮
 */
let gulp = require('gulp'),
	config = require('../config'),
	$ = require('./plugins');

gulp.task('image', () => {
	return gulp.src(config.path.image.src)
		.pipe($.plumber({
			errorHandler: $.notify.onError('<%= error.message %>')
		}))
		.pipe($.imagemin())
		.pipe(gulp.dest(config.path.image.dest))
		.pipe($.browser.stream());
});