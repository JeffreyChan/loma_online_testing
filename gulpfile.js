const gulp = require("gulp");
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');

const nodemon = require("gulp-nodemon");

gulp.task("default", ["compile","watch", "nodemon"]);

// clean the contents of the distribution directory
gulp.task("clean", function () {
  return del('dist/**/*');
});

gulp.task("watch", function () {
  return gulp.watch("src/**/*.*", ["compile"]);
});

gulp.task("compile", function () {
  return gulp
    .src("src/**/*.ts")
    .pipe(sourcemaps.init())          // <--- sourcemaps
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write("."))      // <--- sourcemaps
    .pipe(gulp.dest("dist"));
});

gulp.task("nodemon", function () {
  nodemon({ script: "dist/index.js" });
});

// linting
gulp.task('tslint', function() {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});