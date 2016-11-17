'use strict';
/**
 * プラグイン読み込み
 * 指定したパターンのプラグインを自動的に読み込む
 */
let loader = require('gulp-load-plugins'),
	browser = require('browser-sync'),
	del = require('del');

let $ = loader({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});
$.browser = browser;
$.del = del;
module.exports = $;