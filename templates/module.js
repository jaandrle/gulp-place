module.exports= function(content){
    let _exports= new Set();
    const handleExportReplace= function(match, type, name){
        _exports.add(name);
        return `${type} ${name}`;
    };
    return `
/* global define, self */
(function (root, factory) {
    return function(/* name, ...depends */){
        var depends= Array.prototype.slice.call(arguments);
        var name= depends.shift();
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
            root[name] = factory.apply(root, depends.map(getDep));
        }
    };
}(typeof self !== 'undefined' ? self : this, function (/* ..._dependencies */) {
    var _dependencies= Array.prototype.slice.call(arguments);
${content.replace(/export (function|const|var|let|class) ([^ \=\-\+\(]+)/g, handleExportReplace)}
    return { ${Array.from(_exports).join(", ")} };
}))`;
};