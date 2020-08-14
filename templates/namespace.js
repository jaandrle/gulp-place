module.exports= function(name, content){
    let _exports= new Set();
    const handleExportReplace= function(match, type, name){
        _exports.add(name);
        return `${type} ${name}`;
    };
    return `
const ${name}= (function ${name}_iief(){
${content.replace(/export (function|const|var|let|class) ([^ \=\-\+\(]+)/g, handleExportReplace)}
    return { ${Array.from(_exports).join(", ")} };
})();`;
};