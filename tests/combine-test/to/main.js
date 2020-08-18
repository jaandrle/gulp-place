/* global define, self */
(function (root, factory) {
    var depends= ["ExternalModule"];
    var getDep;
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(depends, factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        getDep= function(name){ return require(name); };
        module.exports = factory.apply(root, depends.map(getDep));
    } else {
        // Browser globals (root is window)
        getDep= function(name){ return root[name]; };
        root.MyModule = factory.apply(root, depends.map(getDep));
    }
}(typeof self !== 'undefined' ? self : this, function (/* ..._dependencies */) {
    var _dependencies= Array.prototype.slice.call(arguments);
    const testExternalModule= _dependencies[0];
    const private= "A";
    const test= private+"B";
    function myFunction(params) {
        console.log(test);
    }
    return { test, myFunction };
}));
const namespace= (function namespace_iief(){
    function aloha(){
        return console.log("aloha!");
    }
    const letter_a= "A";
    function log(){
        return console.log(letter_a);
    }

    return { aloha, log };
})();