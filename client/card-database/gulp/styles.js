"use strict";

var gulp = require("gulp");
var paths = gulp.paths;
var $ = require("gulp-load-plugins")();

gulp.task("styles", function () {
    var sassOptions = {
        style: "expanded",
        includePaths: [
            "bower_components/bootstrap-sass/assets/stylesheets/"
        ],
        errLogToConsole: true,
        sourceMap: true,
        precision: 8
    };


    //var injectFiles = gulp.src([
    //  paths.src + "/{app}/**/*.scss",
    //  "!" + paths.src + "/app/index.scss",
    //  "!" + paths.src + "/app/vendor.scss"
    //], { read: false });
    var injectFiles = gulp.src(
        [
            paths.src + "/assets/stylesheets/_custom.scss",
            paths.src + "/app/**/*.scss",
            "!" + paths.src + "/app/app.scss"
        ],
        { read: false });


    var injectOptions = {
        transform: function (filePath) {
            filePath = filePath.replace(paths.src + "/app/", "");
            return "@import \"" + filePath + "\";";
        },
        starttag: "// injector",
        endtag: "// endinjector",
        addRootSlash: false
    };

    //Filter out the app.scss file, this file is going to be updated with all the injected
    //sass files.  Then it will get compiled to css.
    var indexFilter = $.filter("app.scss", { restore: true });

    return gulp.src([
            paths.src + "/app/app.scss",
            paths.src + "/app/vendor.scss"
        ])
        .pipe(indexFilter)
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(indexFilter.restore)
        .pipe($.sass(sassOptions).on("error", $.sass.logError))
        .pipe($.autoprefixer())
        .on("error", function handleError(err) {
            console.error(err.toString());
            this.emit("end");
        })
        .pipe(gulp.dest(paths.tmp + "/serve/app/"));
});
