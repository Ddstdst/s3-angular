var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imgmin = require('gulp-imagemin');
var fse = require('fs-extra');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var config = require("./config.js");


//load assets
gulp.task("assets",function(){
     gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'node_modules/fnui/dist/js/fnui.js',
        'bower_components/iscroll/build/iscroll-probe.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/oclazyload/dist/ocLazyLoad.js'
    ])
        .pipe(concat('angular.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src('node_modules/fnui/dist/fonts/*').pipe(gulp.dest('dist/assets/fonts'));
    gulp.src('node_modules/fnui/dist/css/*').pipe(gulp.dest('dist/assets/styles'));
});

//copy files
gulp.task('copy',function(){
    gulp.src('src/app/templates/*').pipe(gulp.dest('dist/templates'));
    gulp.src('src/app/iconfont/*').pipe(gulp.dest('dist/iconfont'));
    gulp.src('src/app/services/*').pipe(gulp.dest('dist/services'));
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/404.html').pipe(gulp.dest('dist'));
});

//build app
gulp.task('image',function(){
    gulp.src('src/app/images/*')
        .pipe(imgmin())
        .pipe(gulp.dest('dist/images'))
});

//views changed
gulp.task('views',function(){
    config.modules.forEach(function (item) {
        fse.copySync(item.path, 'dist/views/'+item.name);
    })
});

gulp.task('replace',function(){
    config.modules.forEach(function(item) {
        gulp.src(['dist/services/*.js'])
            .pipe(replace(/\/\/TESTSTART[^(//TESTSTART)]+\/\/TESTEND/g, ''))
    })
});

//
gulp.task('client',function(){
    gulp.src(['src/app/*.js','src/app/components/*'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'));

    gulp.src('src/app/*.css')
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/styles'));
});



gulp.task('clean', function () {
    fse.emptyDirSync('dist');
});

gulp.task('build',['clean', 'assets', 'copy', 'image','views','client','replace']);
gulp.task('default',['build']);




// dev enviroment
gulp.task("assets-dev",function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'node_modules/fnui/dist/js/fnui.js',
        'bower_components/iscroll/build/iscroll-probe.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest('dist/assets/js'));

    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/oclazyload/dist/ocLazyLoad.js'
    ])
        .pipe(concat('angular.min.js'))
        .pipe(gulp.dest('dist/assets/js'));

    gulp.src('node_modules/fnui/dist/fonts/*').pipe(gulp.dest('dist/assets/fonts'));
    gulp.src('node_modules/fnui/dist/css/*').pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('client-dev',function(){
    gulp.src(['src/app/*.js','src/app/components/*'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'));

    gulp.src('src/app/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/styles'));
});
gulp.task('dev',['clean', 'assets-dev', 'copy', 'image','views','client-dev']);

gulp.task('watch', function () {
    gulp.watch(['src/index.html','src/app/templates/*','src/app/services/*'], ['copy','reload']);
    gulp.watch(['src/app/*.js','src/app/components/*','src/app/*.css'], ['client-dev','reload']);
    gulp.watch(['src/app/views/**/*.html','src/app/views/**/**/*'], ['views','reload']);
    gulp.watch(['src/index.html'], ['copy','reload']);
    gulp.watch(['src/app/images/*'],['image','reload']);
});

gulp.task('reload',function () {
    gulp.src('dist').pipe(connect.reload())
});
gulp.task('connect',['dev'],function(){
    connect.server({
        root: 'dist',
        livereload:true
    })
});

gulp.task('build-dev',['connect','watch']);


