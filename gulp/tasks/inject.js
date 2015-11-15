var gulp = require('gulp');
var path = require('path');
var cfg = require('../config');
var _ = require('lodash');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var rename = require('gulp-rename');


gulp.task('velocity:build', function (callback) {
    var src = {
        css: path.join(cfg.build, cfg.context, cfg.dir.css, '**', '*' + cfg.pattern.devSuffix + '.css'),
        js: path.join(cfg.build, cfg.context, '**', '*' + cfg.pattern.devSuffix + '.js')
    };

    var vmSrc = {
        css: path.join("gulp", "util", "css.*.vm"),
        js: path.join("gulp", "util", "js.*.vm")
    };
    var destDir = path.join(cfg.task.tomcat.publicUiVmDir, cfg.context);
    var ignorePath = path.join(cfg.build);

    return merge(
        gulp.src(vmSrc.css)
            .pipe(inject(gulp.src(src.css, {read: false}), {
                addRootSlash: true,
                addPrefix: cfg.task.tomcat.publicResourcesContext,
                ignorePath: ignorePath,
                starttag: '<!-- inject:{{ext}} -->'
            }))
            .pipe(rename({basename: cfg.context, prefix: 'css.'}))
            .pipe(gulp.dest(destDir)),

        gulp.src(vmSrc.js)
            .pipe(inject(gulp.src(src.js, {read: false}), {
                addRootSlash: true,
                addPrefix: cfg.task.tomcat.publicResourcesContext,
                ignorePath: ignorePath,
                starttag: '<!-- inject:{{ext}} -->',
                endtag: '<!-- endinject -->',
                transform: function (filepath, file, i, length) {
                    return '<script defer src="' + filepath + '"></script>';
                }
            }))
            .pipe(rename({basename: cfg.context, prefix: 'js.'}))
            .pipe(gulp.dest(destDir))
    );

});

gulp.task('velocity:compile', function (callback) {
    var src = {
        css: path.join(cfg.build, cfg.context, '**', '*' + '[^' + cfg.pattern.devSuffix + ']' + '.css'),
        js: path.join(cfg.build, cfg.context, '**', '*' + '[^' + cfg.pattern.devSuffix + ']' + '.js')
    };

    var vmSrc = {
        css: path.join(cfg.task.tomcat.publicUiVmDir, cfg.context, "css.*.vm"),
        js: path.join(cfg.task.tomcat.publicUiVmDir, cfg.context, "js.*.vm")
    };
    var destDir = path.join(cfg.task.tomcat.publicUiVmDir, cfg.context);
    var ignorePath = path.join(cfg.build);

    return merge(
        gulp.src(vmSrc.css)
            .pipe(inject(gulp.src(src.css, {read: false}), {
                addRootSlash: true,
                addPrefix: cfg.task.tomcat.publicResourcesContext,
                ignorePath: ignorePath,
                starttag: '<!-- inject:min:{{ext}} -->',
                endtag: '<!-- endinject:min -->',

            }))
            .pipe(rename({basename: cfg.context, prefix: 'css.'}))
            .pipe(gulp.dest(destDir)),

        gulp.src(vmSrc.js)
            .pipe(inject(gulp.src(src.js, {read: false}), {
                addRootSlash: true,
                addPrefix: cfg.task.tomcat.publicResourcesContext,
                ignorePath: ignorePath,
                starttag: '<!-- inject:min:{{ext}} -->',
                endtag: '<!-- endinject:min -->',
                transform: function (filepath, file, i, length) {
                    return '<script defer src="' + filepath + '"></script>';
                }
            }))
            .pipe(rename({basename: cfg.context, prefix: 'js.'}))
            .pipe(gulp.dest(destDir))
    );
});
