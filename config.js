'use strict';
/**
 * タスク設定ファイル
 */
module.exports = {
	dest: './customer',
	IS_PRODUCTION: false,
	dist: 'public',
	autoTest: false,
	ejs: {
		minify: {
			collapseWhitespace: true,
			conservativeCollapse: true,
			decodeEntities: true,
			html5: true,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: false,
			preserveLineBreaks: true,
			preventAttributesEscaping: false,
			quoteCharacter: "",
			removeEmptyAttributes: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		},
		ejsOptions: {}
	},
	style: {
		sass: {
			errLogToConsole: true,
			outputStyle: 'compressed',
			sourcemap: true,
			souceComments: 'normal',
			includePaths: [
				'sass',
				'node_modules/foundation-sites/scss'
			]
		},
		autoprefixer: {
			browsers: [
				'last 3 version',
				'ie 10',
				'Android 4.2'
			]
		},
		soucemaps: './maps'
	},
	js: {
		sourcemaps: './maps'
	},
	copy: {
		src: ['./font/*'],
		dest: './customer/assets/font'
	},
	browserify: {
		bundleOption: {
			cache: {},
			packageCache: {},
			fullPaths: false,
			debug: true,
			entries: './js/src/hanamaru-app.js',
			extensions: 'js'
		},
		output: './js',
		filename: 'apps.js'
	},
	server: {
		baseDir: './customer',
		index: 'index.html'
	},
	path: {
		ejs: {
			src: ['ejs/**/*.ejs', '!ejs/**/_*.ejs'],
			watch: 'ejs/**/*',
			dest: './customer'
		},
		style: {
			src: ['sass/**/*.scss', '!sass/**/_*.scss'],
			watch: 'sass/**/*.scss',
			dest: 'customer/assets/css'
		},
		svg: {
			src: 'svg/**/*.svg',
			watch: 'svg/**/*.svg',
			dest: 'customer/assets/svg'
		},
		js: {
			src: ['js/*.js', '!js/src/**/*'],
			watch: 'js/**/*.js',
			dest: 'customer/assets/js'
		},
		image: {
			src: 'img/**/*',
			watch: 'img/**/*',
			dest: 'customer/assets/img/'
		}
	}
};