/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
const gulp= require("gulp");
const gulpPlace= require("../index.js");

gulp.task("test", function(cb){
    return gulp.src("./src/main.js")
        .pipe(gulpPlace({ variable_eval: ()=> "var output" })({ folder: "src/", string_wrapper: "~" }))
        .pipe(gulp.dest("./bin"));
});
