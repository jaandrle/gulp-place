const gulp_replace= require('gulp-replace');
const fs= require('fs');
const path = require('path');
function getFolderName(path){
    const last_slash= path.lastIndexOf("/");
    const folder_start= path.lastIndexOf("/", last_slash-1)+1;
    return path.slice(folder_start, last_slash);
}
function catFile(file, strict){
    try{
        return fs.readFileSync(file, 'utf8');
    }catch(e){
        if(!strict) return "";
        console.error(`File '${e.path}' cannot be found!`);
        return "/* ERROR: NO FILE FOUND!!! */";
    }
}
function parseModuleNamespaceExports(content_candidate, depends){
    let exports= new Set();
    const handleExportReplace= function(match, default_skip, type, name){
        exports.add(name);
        return `${type} ${name}`;
    };
    const content= content_candidate
        .replace(/export (default )?(function|const|var|let|class) ([^ \=\-\+\(]+)/g, handleExportReplace)
        .replace(/import (\* as [^ ]+|{[^}]+}) from "depends:([^"]+)"/g, (match, names, module)=> `const ${names.replace(/ as /g, ": ").replace(/\*: /g, "")}= _dependencies[${depends.indexOf(module)}]`);
    return { content, exports: Array.from(exports) };
}
module.exports= { gulp_replace, fs, path, getFolderName, catFile, parseModuleNamespaceExports };