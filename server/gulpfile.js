/*eslint-env node*/
var gulp = require("gulp");
var server = require("gulp-develop-server");
var shell = require("gulp-shell");
var path = require("path");

gulp.task("server:start", function(){
    "use strict";
    server.listen({ path: "./src/app.js" });
});

gulp.task("server:restart", ["server:start"], function(){
    "use strict";
    gulp.watch([ "./src/app.js" ], server.restart);
});

gulp.task("run:tests", shell.task(["intern-client config=tests/intern"]));

gulp.task("copy", function(){
    "use strict";
    gulp.src([
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/bootstrap/dist/js/bootstrap.min.js"])
        .pipe(gulp.dest(path.join(__dirname, "dist", "public", "assets", "js")))
        .pipe(gulp.dest(path.join(__dirname, "src", "public", "assets", "js")));
    gulp.src([
        "./bower_components/bootstrap/dist/css/bootstrap.min.css",
        "./bower_components/bootstrap/dist/css/bootstrap-theme.min.css"])
        .pipe(gulp.dest(path.join(__dirname, "dist", "public", "assets", "css")))
        .pipe(gulp.dest(path.join(__dirname, "src", "public", "assets", "css")));
    gulp.src(["./bower_components/bootstrap/dist/fonts/*.*"])
        .pipe(gulp.dest(path.join(__dirname, "dist", "public", "assets", "fonts")))
        .pipe(gulp.dest(path.join(__dirname, "src", "public", "assets", "fonts")));
});
