var gulp = require('gulp');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var ts = require('gulp-typescript');

gulp.task('default', ['scripts', 'assets', 'game'], function () {
});

gulp.task('scripts', function () {
    return gulp.src([
      './bower_components/excalibur/dist/Excalibur.js',
      './bower_components/excalibur-tiled/dist/excalibur-tiled.js',
      './bower_components/easystar-0.2.3.js'
    ])
      .pipe(concat('Excalibur.js'))
      .pipe(gulp.dest('./build/'));
});


var tsProject = ts.createProject('tsconfig.json');
gulp.task('game', function () {
    var tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest(''));
});


gulp.task('assets', function () {
    return gulp.src([
        './assets/textures/character.png',
        './assets/textures/tileset.png',
        './assets/textures/selector.png',
        './assets/maps/arena.json'
    ])
      .pipe(copy('./build', {prefix: 1}));
});
