var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('default',function () {

})
gulp.task('server',function () {
    browserSync.init({
      server: {
          proxy: 'http://localhost:3000/',
          baseDir: 'public/'
      }
    });
    gulp.watch('public/**/*').on('change', browserSync.reload);
})
