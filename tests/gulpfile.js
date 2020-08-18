const gulp= require("gulp");
const gulpPlace= require("../index.js");

const tests= [ "simple-test", "glob-test", "combine-test" ];
tests.forEach(taskProcess);
gulp.task("default", gulp.series(...tests));

function taskProcess(task){
    return gulp.task(task, (folder=> function(cb){
        return gulp.src(`./${folder}/from/main.js`)
            .pipe(gulpPlace({ variable_eval: ()=> "var output" })({ folder: `${folder}/from/`, string_wrapper: "~" }))
            .pipe(gulp.dest(`./${folder}/to`));
    })(task));
}