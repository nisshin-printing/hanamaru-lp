var gulp        = require('gulp'),
	$           = require('gulp-load-plugins')(),
	browserSync = require('browser-sync');
var dir = {
	home: 'www/wordpress/lp/',
}
var path = {
	css: dir.home + 'assets/css/',
	sass: dir.home + 'assets/sass/',
	js: dir.home + 'assets/js/',
	src: dir.home + 'assets/js/src/',
	precom: dir.home + 'assets/js/pre-compress/',
	img: dir.home + 'assets/img/',
	svg: dir.home + 'assets/svg/',
	svgIcons: dir.home + 'assets/svg/icons/',
}
/* =========================================  タスク  ================================ */

// EJS
gulp.task( 'ejs', function() {
	gulp.src( [ dir.home + '/**/*.ejs', '!' + dir.home + '/**/_*.ejs' ] )
		.pipe( $.ejs() )
		.pipe( gulp.dest( 'dir.home' ) )
})
// COMPASS
gulp.task('style', function() {
	gulp.src( [ path.sass + '/**/*.scss', '!' + path.sass + '_*.scss'] )
		.pipe( $.plumber({
			errorHandler: function(error) {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.compass({
			config_file: './config.rb',
			css: path.css,
			sass: path.sass,
			image: path.img,
			javascript: path.js,
			comments: false
		}))
		.pipe($.filter('**/*.css'))
		.pipe($.autoprefixer('last 3 version'))
		.pipe($.cssmin())
		.pipe(gulp.dest( path.css ))
		.pipe(browserSync.reload({ stream: true }));
});

// SVG Icons & Images
// SVG
gulp.task('svg', function() {
	gulp.src( path.svgIcons + '/**/*.svg')
		.pipe( $.plumber({
			errorHandler: function(error) {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.svgmin())
		.pipe($.svgstore({ inlineSvg: true }))
		.pipe($.cheerio({
			run: function ($, file) {
				$('svg').addClass('di');
				$('[fill]').removeAttr('fill');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(gulp.dest(path.svg))
		.pipe(browserSync.reload({ stream: true }));
});
gulp.task('svg2png', function() {
	gulp.src(path.svgIcons + '/**/*.svg')
		.pipe( $.plumber({
			errorHandler: function(error) {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.svg2png(3))
		.pipe($.rename({
			prefix: 'di.svg.'
		}))
		.pipe(gulp.dest(path.svg))
		.pipe(browserSync.reload({ stream: true }));
});



// JAVASCRIPT
// For inline scripts
gulp.task('precom-scripts', function() {
	gulp.src( path.precom + '*.js')
		.pipe( $.plumber({
			errorHandler: function(error) {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.uglify())
		.pipe($.rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest( path.js ))
		.pipe(browserSync.reload({ stream: true }));
});
// Main theme App Javascript
gulp.task('src-js', function() {
	gulp.src( path.src + '*.js')
		.pipe($.concat('hanamaru-app.js'))
		.pipe( $.plumber({
			errorHandler: function(error) {
				console.log(error.messageFormatted);
				this.emit('end');
			}
		}))
		.pipe($.uglify())
		.pipe($.rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest( path.js ))
		.pipe(browserSync.reload({ stream: true }));
});


// Browser Sync
gulp.task('server', function() {
	browserSync({
		proxy: 'hanamaru-souzoku.dev/'
	});
});
gulp.task('bs-reload', function() {
	browserSync.reload();
})



/* =========================================  WATCH  ================================ */
gulp.task('watch', [ 'ejs', 'style', 'precom-scripts', 'src-js', 'svg', 'svg2png', 'server' ], function(event) {
	gulp.watch( dir.home + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.ejs', ['ejs'] );
	gulp.watch( path.sass + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.scss', ['style'] );
	gulp.watch( path.precom + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.js', ['precom-scripts'] );
	gulp.watch( path.src + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.js', ['src-js'] );
	gulp.watch( path.svgIcons + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.svg', ['svg', 'svg2png'] );
	gulp.watch( dir.home + '{,/**/}{,/**/}{,/**/}{,/**/}{,/**/}*.html', ['bs-reload'] );
});
gulp.task('default', ['watch']);
