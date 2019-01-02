var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    minifyCSS   = require('gulp-minify-css'),
    htmlmin     = require('gulp-htmlmin'),
    wrap        = require('gulp-wrap'),
    babel       = require("gulp-babel");

var jsDir   = './web/js/', 
    expose = [],
    dependencies = [
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/tom32i-event-emitter.js/dist/event-emitter.min.js'
    ],
    recipes = {
        server: require('./recipes/server.json'),
        client: require('./recipes/client.json')
    }

gulp.task('server', function() {
    return gulp.src(recipes.server.files)
        .pipe(concat(recipes.server.name))
        .pipe(gulp.dest(recipes.server.path));
});

gulp.task('front-full', function() {
    return gulp.src(recipes.client.files)
        .pipe(concat(recipes.client.name))
        .pipe(wrap('(function(){\n<%= contents %>\n})();'))
        .pipe(gulp.dest(recipes.client.path))
});

gulp.task('front-expose', function() {
    return gulp.src(dependencies)
        .pipe(concat('dependencies.js'))
        .pipe(uglify())
        .pipe(gulp.dest(recipes.client.path));
});

gulp.task('views', function() {
    return gulp.src('src/client/views/*/**/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest(jsDir + 'views'));
});

gulp.task('dev', gulp.parallel('server', 'front-full', 'front-expose', 'views'));

gulp.task('watch', gulp.series('dev', function() {
    gulp.watch('src/shared/**/*.js', gulp.parallel('server', 'front-full'));
    gulp.watch('src/client/**/*.js', gulp.parallel('front-full'));
    gulp.watch('src/server/**/*.js', gulp.parallel('server'));
    gulp.watch('src/client/views/*/*.html', gulp.parallel('views'));
}));

gulp.task('default', gulp.parallel('server', 'front-full', 'front-expose', 'views'));