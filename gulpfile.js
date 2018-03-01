var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require("run-sequence");
var uglifyjs = require('gulp-uglifyjs');
var htmlmin = require('gulp-htmlmin');

//============================================
// BrowserSync task
//============================================
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

//============================================
// Reload
//============================================
gulp.task('reload', function() {
	browserSync.reload();
});

//============================================
// Clean task
//============================================
gulp.task('clean', function () {
	return gulp.src('./dist', {read: false})
		.pipe(clean());
});

//============================================
// Copy task
//============================================
gulp.task('copy', function () {
	return gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./dist/images/'));
});

//============================================
// FileInclude task
//============================================
gulp.task('fileinclude', function() {
	gulp.src(['./src/index.html'])
		.pipe(htmlmin({
			collapseWhitespace: true,
			collapseInlineTagWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('./dist/'));
});

//============================================
// Sass task
//============================================
gulp.task('sass', () => {
	return gulp.src('./src/scss/main.scss')
		.pipe(wait(1000))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed' // nested | expanded | compact | compressed
		}))
		.pipe(autoprefixer({
			browsers: ["> 1%", "last 5 versions"]
		}))
		.pipe(rename('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//============================================
// JS task
//============================================    
gulp.task('js', function() {
	return gulp.src(['./src/js/jquery.min.js', './src/js/bootstrap.min.js', './src/js/showmanyslideonecarousel.min.js', './src/js/scripts.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(uglifyjs())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(browserSync.stream({
			match: '**/*.js'
		}))

});

//============================================
// Watch task
//============================================
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch("./src/**/*.html", ['fileinclude']).on('change', browserSync.reload);
	gulp.watch("./src/images/**/*", ['copy']).on('change', browserSync.reload);
});


//============================================
// Default task
//============================================
gulp.task('default', runSequence('clean', 'copy', 'fileinclude', 'sass', 'js', 'browserSync', 'watch'));