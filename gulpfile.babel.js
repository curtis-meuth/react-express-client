'use strict';

var gulp = require('gulp');
var open = require('gulp-open');        // Open a URL in a web browser
var browserify = require('browserify');
var babelify = require("babelify");
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var lint = require('gulp-eslint');
var browserSync = require('browser-sync'); //Start local dev server
var historyApiFallback = require('connect-history-api-fallback');
var url = require('url');
var proxy = require('proxy-middleware');

var reload = browserSync.reload;


var config = {
    port: '9005',
    devBaseUrl: 'http://localhost',
    paths:{
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrapdist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.scss',
            './src/**/*.css'

        ],
        customCss: './src/**/*.css',
        dist: './dist',
        mainJs: './src/main.js'
    }
};

// Start local dev server
gulp.task('browserSync', function () {
    var proxyOptions = url.parse('http://localhost:3005/api');
    proxyOptions.route = '/api';
    browserSync({
        server:{
            baseDir: "./dist/",
            middleware: [ historyApiFallback(), proxy(proxyOptions) ]
        },
        port: config.port,
        open: true,
        notify: true
    })
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(reload({stream:true}));
});

gulp.task('js', function () {
    browserify({entries: [config.paths.mainJs]})
        .transform(babelify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(reload({stream:true}));
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(reload({stream:true}));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(reload({stream:true}));

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.customCss, ['css']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'watch', 'browserSync']);


