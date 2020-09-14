const namespace= (function namespace_iief(){
    "use strict";
    var a= "A";
    var b= "B";
    var c= "C";
    var d= "D";

    function log(){
        return console.log({ a, b, c, d });
    }
    return { log, A: a, B: b, c, d };
})();