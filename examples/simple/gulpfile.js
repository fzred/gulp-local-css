const gulp = require('gulp')
const localCss = require('gulp-local-css')

gulp.task('css', function () {
    gulp.src('src/pages/**/*.css', { base: 'src' })
        .pipe(localCss.styleRewrite())
        .pipe(gulp.dest('dist'))
})
gulp.task('html', function () {
    gulp.src('src/pages/**/*.html', { base: 'src' })
        .pipe(localCss.htmlRewrite())
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['css', 'html'])
