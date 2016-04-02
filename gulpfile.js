var gulp = require('gulp'),
    // electron = require('gulp-atom-electron'),
    del = require('del'),
    // symdest = require('gulp-symdest'),
    runSeq = require('run-sequence');

gulp.task('clean', function(){
    return del('dist/frontend/**/*', {force:true});
});

gulp.task('copy:vendor', function(){
    return gulp.src([
            "node_modules/es6-shim/es6-shim.min.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/angular2/bundles/angular2-polyfills.js",
            "node_modules/systemjs/dist/system.src.js",
            "node_modules/rxjs/bundles/Rx.js",
            "node_modules/angular2/bundles/angular2.dev.js"
        ])
        .pipe(gulp.dest('./dist/frontend/scripts/vendor'))
})

gulp.task('copy:index', function(){
    return gulp.src('./src/frontend/index.html')
        .pipe(gulp.dest('./dist/frontend'));
});

gulp.task('frontend', function(done){
    return runSeq('clean', ['copy:vendor', 'copy:index'], done);
})

// Electron Tasks
gulp.task('clean-electron', function(){
    return del('dist/electron-package/**/*', {force: true});
});

gulp.task('copy:electron-manifest', function(){
   return gulp.src('./src/assets/package.json')
       .pipe(gulp.dest('./dist/electron-package'))
});

gulp.task('copy:electron-scripts', function(){
    return gulp.src('./src/main/index.js')
        .pipe(gulp.dest('./dist/electron-package'));
});

gulp.task('copy:spa-for-electron', function(){
    return gulp.src("./dist/frontend/**/*")
        .pipe(gulp.dest('dist/electron-package'));
});

gulp.task('electron', function(done){
    return runSeq('clean-electron', ['copy:electron-manifest', 'copy:electron-scripts', 'copy:spa-for-electron'], done);
});
