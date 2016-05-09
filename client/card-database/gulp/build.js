"use strict";

var gulp = require("gulp");
var paths = gulp.paths;

var $ = require("gulp-load-plugins")({
    pattern: ["gulp-*", "main-bower-files", "uglify-save-license", "del"]
});

gulp.task("partials", function () {
    return gulp.src([
        paths.src + "/app/**/*.html",
        paths.tmp + "/app/**/*.html"
    ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache("templateCacheHtml.js", {
            module: "card"
        }))
        .pipe(gulp.dest(paths.tmp + "/partials/"));
});

gulp.task("html", ["inject", "partials"], function () {
    var partialsInjectFile = gulp.src(paths.tmp + "/partials/templateCacheHtml.js", { read: false });
    var partialsInjectOptions = {
        starttag: "<!-- inject:partials -->",
        ignorePath: paths.tmp + "/partials",
        addRootSlash: false
    };

    var htmlFilter = $.filter("*.html", { restore: true });
    var jsFilter = $.filter("**/*.js", { restore: true });
    var cssFilter = $.filter("**/*.css", { restore: true });
    var assets;

    return gulp.src(paths.tmp + "/serve/*.html")
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      //.pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore)
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      //.pipe($.minifyHtml({
      //    empty: true,
      //    spare: true,
      //    quotes: true
      //}))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(paths.dist + '/'))
      .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task("images", function () {
    return gulp.src(paths.src + "/assets/images/**/*")
      .pipe(gulp.dest(paths.dist + "/assets/images/"));
});

gulp.task("docs", function () {
    return gulp.src(paths.src + "/assets/docs/**/*")
      .pipe(gulp.dest(paths.dist + "/assets/docs/"));
});

gulp.task("data", function () {
    return gulp.src(paths.src + "/app/data/**/*")
      .pipe(gulp.dest(paths.dist + "/data/"));
});

gulp.task("fonts", ["bootstrap-fonts"], function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.debug())
      .pipe($.filter("**/*.{eot,svg,ttf,woff,woff2}"))
      .pipe($.flatten())
      .pipe(gulp.dest(paths.dist + "/fonts/"));
});

gulp.task("bootstrap-fonts", function(){
  return gulp.src("bower_components/bootstrap-sass/assets/fonts/**/*")
    .pipe(gulp.dest(paths.dist + "/fonts/"));
})

gulp.task("misc", function () {
    return gulp.src(paths.src + "/**/*.ico")
      .pipe(gulp.dest(paths.dist + "/"));
});

gulp.task("clean", function (cb) {
    $.del([paths.dist + "/", paths.tmp + "/"]).then(function () {
        cb();
    });
});

gulp.task("build", ["html", "images", "fonts", "misc", "docs", "data"]);
