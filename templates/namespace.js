module.exports= (name, content, exports)=> `const ${name}= (function ${name}_iief(){
    "use strict";
${content}
    return { ${exports.join(", ")} };
})();`;