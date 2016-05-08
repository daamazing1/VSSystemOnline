"use strict";

var gulp        = require("gulp");
var browserSync = require("browser-sync").create();

gulp.paths = {
    src: "src",
    dist: "dist",
    tmp: ".tmp"
};

require("require-dir")("./gulp");

gulp.task("default", ["clean"], function () {
    gulp.start("build");
});

gulp.task("serve", ["default"], function(){
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch("src/**/*", ["watch"]);
});

gulp.task("watch", ["default"], browserSync.reload);
