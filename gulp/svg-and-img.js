'use strict';

/**
 * Imageタスク&SVGタスク
 */
let gulp = require('gulp'),
	config = require('../config'),
	$ = require('./plugins');

gulp.task('svg', () => {
	return gulp.src(config.path.svg.src)
		.pipe($.plumber({
			errorHandler: (error) => {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.imagemin())
		.pipe($.svgstore({ inlineSvg: true }))
		.pipe($.cheerio({
			run: ($) => {
				$('[fill]').removeAttr('fill');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(gulp.dest(config.path.svg.dest))
		.pipe($.browser.stream());
});

gulp.task('svg2png', () => {
	return gulp.src(config.path.svg.src)
		.pipe($.plumber({
			errorHandler: (error) => {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.svg2png())
		.pipe($.rename({
			prefix: 'icons.svg.'
		}))
		.pipe($.imagemin())
		.pipe(gulp.dest(config.path.svg.dest))
		.pipe($.browser.stream());
});