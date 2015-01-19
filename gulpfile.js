var gulp = require('gulp'),
    server = require('gulp-express');

gulp.task('server', function () {
    return server.run({
        file: 'app.js'
    });
});

gulp.task('default', ['server']);
