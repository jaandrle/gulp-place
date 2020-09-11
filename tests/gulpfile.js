const { series, src, dest }= require("gulp");
const { readFileSync }= require("fs");
const gulpPlace= require("../index.js");
class TestError extends Error{ constructor(tests_statuses){ super("\nTest(s) failed\n"+tests_statuses.join("\n").replace(/^/mg, "  - ")); this.showStack = false; } static create(tests_statuses){ return new TestError(tests_statuses); } }

const tests= [ "simple-test", "glob-test", "combine-test", "exports-test", "complex-test" ];
const tests_export= tests.reduce(registerTestTask, {});
Object.assign(exports, tests_export);
exports.compare= compare;
exports.tests= series(...Object.values(tests_export));
exports.default= series(...Object.values(tests_export), compare);

function compare(cb){
    const destination= "/to/";
    const test= "main.js";
    const referential= "main.referential.js";
    const results= tests.filter(folder=> isDiffFile(...files(folder+destination, test, referential)));
    return results.length ? cb(TestError.create(results)) : cb();
}
function registerTestTask(_exports, task){
    const folder= task;
    _exports[task]= function(cb){
        return src(`./${folder}/from/main.js`)
            .pipe(gulpPlace({ variable_eval: ()=> "var output", filesCleaner: str=> str.replace(/\r?\n?\/\*[^\*]+\*\//g, "") })({ folder: `${folder}/from/`, string_wrapper: "~" }))
            .pipe(dest(`./${folder}/to`));
    };
    _exports[task].displayName= task;
    return _exports;
}
function isDiffFile(test_file, referential_file){
    return test_file.toString('utf8').replace(/\r/g, "")!==referential_file.toString('utf8').replace(/\r/g, "");
}
function files(folder, test_file, referential_file){
    return [ test_file, referential_file ].map(f=> folder+f).map(file=> readFileSync(file, "utf8"));
}