// --------------------------------------------
// EDIT THIS ZONE TO MATCH YOUR PREFERENCES
// --------------------------------------------
var prefer_javascript = 'native';
var prefer_css        = 'less';
// --------------------------------------------


// DO NOT EDIT BELOW THIS LINE
// ============================================
var gulp      = require('gulp');
var sourcemap = require('gulp-sourcemaps');
var coffee    = require('gulp-coffee');
var less      = require('gulp-less');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');
var cssnano   = require('gulp-cssnano');
var del       = require('del');
var sequences = require('run-sequence');

gulp.task('build:clean', function() {
    del.sync('./dist');
});

if (prefer_javascript === 'native') {
    gulp.task('build:js', function () {
        return gulp.src(['./src/js/native/g.r.i.d.js',
                  './src/js/native/*.js'])
            .pipe(concat('g.r.i.d.full.js'))
            .pipe(gulp.dest('./dist/js'));
    });
    gulp.task('build:js:minify', function() {
        return gulp.src(['./src/js/native/g.r.i.d.js',
                  './src/js/native/*.js'])
            .pipe(concat('g.r.i.d.full.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));
    });
}
else if (prefer_javascript === 'coffee') {
    gulp.task('build:js', function () {
        return gulp.src(['./src/js/coffee/g.r.i.d.coffee',
                  './src/js/coffee/*.coffee'])
            .pipe(concat('g.r.i.d.full.js'))
            .pipe(coffee())
            .pipe(gulp.dest('./dist/js'));
    });
    gulp.task('build:js:minify', function () {
        return gulp.src(['./src/js/coffee/g.r.i.d.coffee',
                  './src/js/coffee/*.coffee'])
            .pipe(concat('g.r.i.d.full.min.js'))
            .pipe(coffee())
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));
    });
}

if (prefer_css === 'less') {
    gulp.task('build:css', function () {
        return gulp.src('./src/css/less/g.r.i.d.less')
            .pipe(less())
            .pipe(gulp.dest('./dist/css'));
    });
    gulp.task('build:css:minify', function () {
        return gulp.src('./src/css/less/g.r.i.d.less')
            .pipe(less())
            .pipe(cssnano())
            .pipe(concat('g.r.i.d.min.css'))
            .pipe(gulp.dest('./dist/css'));
    });
}

gulp.task('build:fonts', function () {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build:finish', function () {
    console.log('Sources compiled successfully !');
});

gulp.task('build', function() {
    console.log('Compiling sources... Please wait...');
    sequences('build:clean', 'build:js', 'build:css', 'build:js:minify', 'build:css:minify', 'build:fonts', 'build:finish');
});


// DEVELOPMENT MODE
// ============================================
gulp.task('compile:coffee', function() {
    return gulp.src(['./src/js/coffee/g.r.i.d.coffee',
        './src/js/coffee/*.coffee'])
        .pipe(sourcemap.init())
        .pipe(concat('g.r.i.d.full.js'))
        .pipe(coffee())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dev/js/coffee'));
});

gulp.task('compile:native', function() {
    return gulp.src(['./src/js/native/g.r.i.d.js',
        './src/js/native/*.js'])
        .pipe(sourcemap.init())
        .pipe(concat('g.r.i.d.full.js'))
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dev/js/native'));
});

gulp.task('compile:less', function() {
    return gulp.src('./src/css/less/g.r.i.d.less')
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(sourcemap.write())
        .pipe(gulp.dest('./dev/css/less'));
});

gulp.task('watch:coffee', function() {
    gulp.watch('./src/js/coffee/*.coffee', ['compile:coffee']);
});

gulp.task('watch:native', function() {
    gulp.watch('./src/js/native/*.js', ['compile:native']);
});

gulp.task('watch:less', function() {
    gulp.watch('./src/css/less/*.less', ['compile:less']);
});

gulp.task('watch', function() {
    return sequences(['watch:native', 'watch:coffee', 'watch:less']);
});