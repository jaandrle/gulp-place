module.exports= (name, content, use_strict, exports)=> `const ${name}= (function ${name}_iief(){${use_strict?'\n    "use strict";':""}
${content}
    return { ${exports.join(", ")} };
})();`;
