/* atoms *//* global log */
/* global routers */
gulp_place('{ "glob": "molecules/namespace/*.js" }', "combine");/* global namespace */
routers.page_Welcome= function(_this){
    log(_this);
    log(namespace);
};