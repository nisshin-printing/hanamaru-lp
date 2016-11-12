'use strict';
/**
 * サーバ起動タスク
 */
let gulp = require('gulp'),
	config = require('../config'),
	$ = require('./plugins');

gulp.task('server', () => {
	$.browser.init({
		server: config.server
	});
});
gulp.task('reload', () => {
	$.browser.reload();
});