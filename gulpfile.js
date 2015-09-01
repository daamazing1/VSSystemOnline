/*eslint-env node*/
var gulp = require("gulp");
var server = require("gulp-develop-server");

gulp.task("server:start", function(){
    "use strict";
    server.listen({ path: "./app.js" });
});

gulp.task("server:restart", ["server:start"], function(){
    "use strict";
    gulp.watch([ "./app.js" ], server.restart);
});

