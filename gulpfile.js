var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    minifycss    = require('gulp-minify-css'),
    imagemin     = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    pngquant = require('imagemin-pngquant'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();


gulp.task('script', function () {
        gulp.src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./src/build/js"));
});

gulp.task('style', function () {
    gulp.src("src/scss/**/style.scss")
    .pipe(sourcemaps.init())
     .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
     .pipe(minifycss(''))
        .pipe(gulp.dest("./src/build/css"));
    });

gulp.task('imgs', function() {
  return gulp.src("src/img/**/*.*")
  .pipe(imagemin())
  .pipe(gulp.dest("./src/build/img"));
});


gulp.task('server', ['script', 'style', 'imgs'], function() {
        browserSync.init({
                server: {
                        baseDir: "./src"
                },
                browser: ["chrome"],
                notify: false,
                files: ['./src/**/*.html', './src/build/js/*.js', './src/build/css/*.css']
        });
});

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['style']);
    gulp.watch('src/js/**/*.js', ['script']);
    gulp.watch('src/img/**/*.*', ['imgs']);
});


gulp.task('default', ['watch', 'server']);