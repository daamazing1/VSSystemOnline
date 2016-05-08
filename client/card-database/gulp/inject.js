﻿"use strict";

var gulp = require("gulp");
var paths = gulp.paths;
var $ = require("gulp-load-plugins")();
var wiredep = require("wiredep").stream;
var es = require("event-stream");

gulp.task("inject", ["styles"], function () {
    var injectStyles = gulp.src([
        paths.tmp + "/serve/app/**/*.css",
        "!" + paths.tmp + "/serve/app/vendor.css"
    ], { read: false });

    var injectScripts = gulp.src([
      paths.src + "/app/**/*.js",
      "!" + paths.src + "/app/**/*.spec.js",
      "!" + paths.src + "/app/**/*.mock.js"
    ])
        //.pipe($.debug())
        .pipe($.angularFilesort());

    var injectOptions = {
        ignorePath: [paths.src, paths.tmp + "/serve"],
        addRootSlash: false
    };

    var wiredepOptions = {
        directory: "bower_components"
    };

    return gulp.src(paths.src + "/*.html")
        .pipe($.inject(es.merge(injectStyles, injectScripts), injectOptions))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(paths.tmp + "/serve"));
});