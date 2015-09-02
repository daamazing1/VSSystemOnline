/*eslint-env node*/
var gulp = require("gulp");
var server = require("gulp-develop-server");
var intern = require("gulp-intern");
var shell = require("gulp-shell");

gulp.task("server:start", function(){
    "use strict";
    server.listen({ path: "./app.js" });
});

gulp.task("server:restart", ["server:start"], function(){
    "use strict";
    gulp.watch([ "./app.js" ], server.restart);
});

gulp.task("run:tests", shell.task(["intern-client config=tests/intern"]));