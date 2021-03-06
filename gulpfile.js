var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require('browser-sync').create();
var useref= require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');


gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function(){
    console.log('Hello from sass');
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('app/css'))
    .pipe(browsersync.reload({stream:true}))
});

gulp.task('watch',['browsersync','sass'], function(){
    gulp.watch ('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html',browsersync.reload);
    gulp.watch('app/js/**/*.js', browsersync.reload);
});

gulp.task('browsersync', function(){
browsersync.init({
        server: {
            baseDir : 'app'
        },
    })
});

