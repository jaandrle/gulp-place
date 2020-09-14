module.exports= (name, content, use_strict, exports, depends)=> `/* global self */
(function (root, factory) {
    /* jshint ignore:start */
    var depends= ${JSON.stringify(depends)};
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
        root.${name} = factory.apply(root, depends.map(getDep));
    }
    /* jshint ignore:end */
}(typeof self !== 'undefined' ? self : this, function (/* ..._dependencies */) {${use_strict?'\n    "use strict";':""}
    var _dependencies= Array.prototype.slice.call(arguments);
${content}
    return { ${exports.join(", ")} };
}));`;
