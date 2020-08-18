/* consts *//* global options */
/* atoms *//* global log, isString */
/* global routers */
gulp_place('{ "glob": "molecules/namespace/*.js" }', "combine");/* global namespace */
gulp_place("molecules/doSomething.js", "file");/* global doSomething */
routers.page_Home= function(_this){
    log(doSomething());
    log(isString(namespace.text));
    namespace.a(options.param_0);
};