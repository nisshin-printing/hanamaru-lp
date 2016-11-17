'use strict';
/*
 * Clean タスク
 * Outputディレクトリ内をクリーンする。
 */
let gulp = require('gulp'),
	config = require('../config'),
	$ = require('./plugins');

gulp.task('clean', $.del.bind(null, [config.dest]));