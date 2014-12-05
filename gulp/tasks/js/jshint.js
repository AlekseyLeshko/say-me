var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  var paths = [
    'gulpfile.js',
    'gulp/**/*.js',
    'create.js',
    'src/**/*.js',
    'spec/**/*.js',
    'example/**/*.js'
  ];

  return gulp.src(paths)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
