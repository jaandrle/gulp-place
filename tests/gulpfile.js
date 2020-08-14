const gulp= require("gulp");
const gulpPlace= require("../index.js");

const tests= [ "simple-test", "module-test" ];
let task_id= 0;
let task= tests[task_id++];
gulp.task(task, (folder=> function(cb){
    return gulp.src(`./${folder}/src/main.js`)
        .pipe(gulpPlace({ variable_eval: ()=> "var output" })({ folder: `${folder}/src/`, string_wrapper: "~" }))
        .pipe(gulp.dest(`./${folder}/bin`));
})(task));

task= tests[task_id++];
gulp.task(task, (folder=> function(cb){
    return gulp.src(`./${folder}/src/main.js`)
        .pipe(gulpPlace({ variable_eval: ()=> "var output" })({ folder: `${folder}/src/`, string_wrapper: "~" }))
        .pipe(gulp.dest(`./${folder}/bin`));
})(task));

gulp.task("default", gulp.series(...tests));