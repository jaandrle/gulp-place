gulp_place("consts/*.js", "glob_once");
function _onDeviceReady(event){
    gulp_place("device_ready/*.js", "glob_once");
}
gulp_place("atoms/**/*.js", "glob_once");
var routers= {};
gulp_place("organisms/**/*.js", "glob_once");