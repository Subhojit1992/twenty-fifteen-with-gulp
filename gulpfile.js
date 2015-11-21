
// Author: subhojit1992.mondal@gmail.com

var gulp        = require('gulp');
var babel       = require('gulp-babel');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var cssmin      = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var changed     = require('gulp-changed');
var browserSync = require('browser-sync').create();
var plumber     = require('gulp-plumber');
var eslint      = require('gulp-eslint');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var notify      = require('gulp-notify');
var notifier    = require('node-notifier');

var readyNotifier = {
    title: 'Gulp',
    message: 'Ready to Rock & Role!',
    time: 2000
};

var paths = {
    //source paths
    scss: [
        'src/scss/main.scss'
    ],
    js: [
        'src/js/jquery.min.js',
        // vendor plugin
        'src/js/vendor/plugin.js',
        'src/js/main.js'        
    ],
    img: 'src/images/*',

    //distribution paths
    cssDst: 'dist/css/',
    jsDst: 'dist/js/',
    imgDst: 'dist/images/'
};

gulp.task('styles', function() {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(gulp.dest(paths.cssDst))
        .pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.cssDst + 'min/'))
        .pipe(notify('Generated CSS: <%= file.relative %>'))
        .pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsDst))
        .pipe(notify('Generated JS: <%= file.relative %>'))
        .pipe(browserSync.stream());
});
gulp.task('images', function() {
    return gulp.src(paths.img)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.imgDst))
        .pipe(notify('Images compressed.'))
        .pipe(browserSync.stream());
});
gulp.task('jslint', function() {
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .on('error', notify.onError({ message: 'eslint failed.' }));
});

// Default
gulp.task('default', ['js', 'styles', 'images'], function() {
    notifier.notify(readyNotifier);
});
// Watch
gulp.task('watch', function() {
    notifier.notify(readyNotifier);
    //source paths
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.img, ['images']);
    //distribution paths
    gulp.watch(paths.jsDst, ['jslint']);
});
// Browsersync server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: '127.0.0.1'
    });
});
// Autorefresh
gulp.task('autorefresh', function() {
    gulp.run('browser-sync');
    //source paths
    gulp.watch(paths.js, ['js', 'jslint']);
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.img, ['images']);
    //distribution paths
    gulp.watch(paths.jsDst, ['jslint']);
    // browsersync injection
    gulp.watch("./").on('change', browserSync.reload);
    // gulp is ready
    notifier.notify(readyNotifier);
});
