
const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

//path

let path = {
    sass: 'src/sass/*.scss',
    sassWatch: 'src/sass/**/*.scss',
    styleDist: 'build/css/', // dist compile sass/css file
    pug: 'src/pug/*.pug',
    pugWatch: 'src/pug/**/*.pug',
    pugDist: 'build/', // dist compile pug/html file
    htmlWatch: './build/*.html',
    serveDir: './build/'//for server html look
};
gulp.task('minify-image', () =>
    gulp.src('src/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 4})
        ]))
        .pipe(gulp.dest('build/images'))
);

gulp.task('pug', function () {
    gulp.src(path.pug)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.pugDist))
});


gulp.task('sass', function () {
    gulp.src(path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.styleDist))
        .pipe(browserSync.reload({stream: true}));
});

//server task
gulp.task('serve', function () {
    browserSync.init({
        server: "build/"
    });
});
//watcher

gulp.task('watch', function () {
    gulp.watch(path.pugWatch, ['pug']);
    // gulp.watch(path.styleDist + '*.css', ['min-css']);
    gulp.watch(path.sassWatch, ['sass']);
    // gulp.watch(path.jsWatch, ['compress']);
    gulp.watch(path.htmlWatch).on('change', browserSync.reload);
});

gulp.task('default', ['pug', 'watch', 'sass', 'minify-image', 'serve']);
