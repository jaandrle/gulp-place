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
    const handleExportReplace= fun=> function(...args){
        const reg_found= args.pop();
        let { name, names }=reg_found;
        if(name) exports.add(name);
        if(names) names.split(/ ?, ?/).map(t=> t.replace(/(\w+) as (\w+)/, (_m, internal, name)=> `${name}: ${internal}`)).forEach(name=> exports.add(name.trim()));
        return fun(reg_found);
    };
    const content= content_candidate
        .replace(/export (default )?(?<type>function|function\*|const|var|let|class) (?<name>[^ \=\-\+\(\{}]+)/g, handleExportReplace(({ name, type })=> `${type} ${name}`))
        .replace(/\r?\n?\s*export \{\s*(?<names>[^\}]+)\s*\};/mg, handleExportReplace(()=> ""))
        .replace(/import (\* as [^ ]+|{[^}]+}) from "depends:([^"]+)"/g, (match, names, module)=> `const ${names.replace(/ as /g, ": ").replace(/\*: /g, "")}= _dependencies[${depends.indexOf(module)}]`);
    return { content, exports: Array.from(exports) };
}
module.exports= { gulp_replace, fs, path, getFolderName, catFile, parseModuleNamespaceExports };