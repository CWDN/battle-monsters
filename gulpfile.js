var gulp = require('gulp');
var copy = require('gulp-copy');

gulp.task('default', ['assets'], function () {});

gulp.task('assets', function () {
    return gulp.src([
        './assets/textures/character.png',
        './assets/textures/tileset.png',
        './assets/textures/selector.png',
        './assets/maps/arena.json'
    ])
    .pipe(copy('./build', {prefix: 1}));
});
