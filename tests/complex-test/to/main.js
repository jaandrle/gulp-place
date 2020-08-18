const files= {
    main: "path_to_main_file",
    secondary: "path_to_secondary_file"
};
const options= {
    param_0: "value_0",
    param_1: "value_1",
    param_2: "value_2",
    param_3: "value_3",
    param_4: "value_4",
    param_5: "value_5",
    param_6: "value_6"
};
function _onDeviceReady(event){
    
    console.log(event);
}
function isString(string_candidate){
    return typeof string_candidate==="string" || string_candidate instanceof String;
}
const log= console.log.bind(console);
var routers= {};

const namespace= (function namespace_iief(){
    const text= "Exported text";
    
    function a(val){
        return val+text;
    }

    return { text, a };
})();
function doSomething(){
    return "Doing something";
}
routers.page_Home= function(_this){
    log(doSomething());
    log(isString(namespace.text));
    namespace.a(options.param_0);
};


routers.page_Welcome= function(_this){
    log(_this);
    log(namespace);
};