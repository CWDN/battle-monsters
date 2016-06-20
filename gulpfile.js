var gulp = require('gulp');
var copy = require('gulp-copy');
var ts = require('gulp-typescript');

gulp.task('default', ['assets', 'game'], function () {
});

var tsProject = ts.createProject('tsconfig.json');
gulp.task('game', function () {
    var tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('build'));
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
