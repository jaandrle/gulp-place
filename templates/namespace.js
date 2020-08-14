module.exports= (name, content, exports)=> `
const ${name}= (function ${name}_iief(){
${content}
    return { ${exports.join(", ")} };
})();`;