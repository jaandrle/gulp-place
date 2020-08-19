'use strict';
const { gulp_replace, fs, path, getFolderName, catFile, parseModuleNamespaceExports }= require("./utils");
const /* shared consts */
    gulp_place_regex= /(?<spaces> *)gulp_place\(\s*(\"(?<name_1>[^\"]+)\"|\'(?<name_2>[^\']+)\')(?:\s*,\s*(?:\"|\')(?<type>[^\"\']+)(?:\"|\'))?\s*\)(?<semicol>;?)(?<jshint_global>[^\r\n]*\/\*[^\*]*\*\/)?/g,
    folder_glob_reg= /\*\*\/$/g,
    folder_deep_glob_reg= /\*\*\/\*\*\/$/g;

module.exports= function({ variable_eval= ()=> "", filesCleaner= content=> content, intendantion= "    " }= {}){
    let /* shared vars */
        files_added= new Set(),
        combine_added= new Set();
    const
        processFiles= (replaceHelper, is_once, folder, name, spaces)=> 
            parseGlob(replaceHelper, is_once, folder, ((name)=>[name, name.lastIndexOf("/")+1])(nameVarHandler(name)), spaces);
    
    return function gulp_place({folder= "js/", string_wrapper= '"'}= {}){
        const replaceHelper= (parent, fun)=> function(...args){
            const full_match= args.shift();
            const { spaces= "", name_1= false, name_2= false, type="file", semicol= "", jshint_global= "" }= args.pop();
            return fun({ parent, folder, string_wrapper, full_match, spaces, name: name_1||name_2, type, semicol, jshint_global, replaceHelper });
        };
        
        return gulp_replace(gulp_place_regex, replaceHelper("", parseFileHandler));
    };
    function parseFileHandler({ parent, folder, name, full_match, type, spaces, string_wrapper, semicol, jshint_global, replaceHelper }){
        if(!name) return full_match;
        name= name.replace(/&prime;/g, "'").replace(/&Prime;/g, "\"").replace(/`/g, "'");
        switch (type){
            case "clean":           return parseClean(nameVarHandler(name), spaces+jshint_global);
            case "files":
            case "glob":            return processFiles(replaceHelper, false, folder, fileNameVarHandler(name, parent), spaces);
            case "files_once":
            case "glob_once":       return processFiles(replaceHelper, true, folder, fileNameVarHandler(name, parent), spaces);
            case "file":            return fileHandler(replaceHelper, false, true, folder, fileNameVarHandler(name, parent), spaces);
            case "file_if_exists":  return fileHandler(replaceHelper, false, false, folder, fileNameVarHandler(name, parent), spaces);
            case "file_once":       return fileHandler(replaceHelper, true, true, folder, fileNameVarHandler(name, parent), spaces);
            case "combine":         return parseJSBundle(replaceHelper, parent, folder, nameVarHandler(name), spaces);
            case "variable":        return spaces+string_wrapper+variable_eval(name)+string_wrapper+semicol+jshint_global;
            case "eval":            return (variable_eval(name), spaces+jshint_global);
            case "eval_out":        return spaces+variable_eval(name)+semicol+jshint_global;
        }
    }
    function parseClean(name, out){
        if(name==="all"){
            files_added= new Set();
            combine_added= new Set();
        } else {
            files_added.delete(name);
            combine_added.delete(name);
        }
        return out;
    }
    function parseJSBundle(replaceHelper, parent, folder, options, spaces_candidate){
        let json_object;
        try { json_object= JSON.parse(options) || {}; }
        catch (e){ throw new Error("WRONG JSON format in '"+folder+parent+"':\n"+options+"\n"+e.message); }
        const { glob: glob_candidate, file: file_candidate, name: name_candidate, type= "namespace", depends= {} }= json_object;
        if(!glob_candidate&&!file_candidate) return "";
        let name, content_candidate;
        const is_native= type==="native_module"||type==="module_native";
        const spaces= spaces_candidate+(is_native ? "" : intendantion);
        if(file_candidate){
            let src= fileNameVarHandler(file_candidate, parent);
            name= name_candidate || src.slice(src.lastIndexOf("/")+1, src.indexOf("."));
            content_candidate= fileHandler(replaceHelper, true, true, folder, src, spaces);
        } else {
            let src= fileNameVarHandler(glob_candidate, parent);
            name= name_candidate || getFolderName(src);
            content_candidate= processFiles(replaceHelper, true, folder, src, spaces);
        }
        if(!content_candidate||combine_added.has(name)) return "";
        combine_added.add(name);
        if(is_native){
            return content_candidate.replace(/["']depends:([^"']+)["']/g, (match, module)=> `"${depends[module]}"`);
        }
        const { content, exports }= parseModuleNamespaceExports(content_candidate, Object.keys(depends));
        return require("./templates/"+type)(name, content, exports, Object.values(depends));
    }
    function parseFile(replaceHelper, file_name, file_data){
        const last_slash= file_name.lastIndexOf("/");
        return file_data.replace(gulp_place_regex, replaceHelper(last_slash===-1 ? "" : file_name.slice(0, last_slash), parseFileHandler));
    }
    function fileHandler(replaceHelper, once, strict, folder, file_name, spaces){
        const path= folder+file_name;
        if(once&&files_added.has(path)) return "";
        files_added.add(path);
        return parseFile(replaceHelper, file_name, spaces+filesCleaner(catFile(path, strict)).replace(/\r?\n/gm, "\n"+spaces));
    }
    function parseGlob(replaceHelper, once, main_folder, match, spaces){
        const [ name, last_slash ] = match;
        let [ sub_folder, files ] = [ name.substr(0, last_slash), name.substr(last_slash) ];
        if(!last_slash) return ""; //TODO: Why?
        files= new RegExp(files
            .replace(/[\.\(\)]/g, m=> "\\"+m)
            .replace(/\*/g, ".*")
        );
        let folders= [ main_folder+sub_folder.replace(/\*\*\//g, "") ];
        if(folder_glob_reg.test(sub_folder)) folders= folders.concat(getFolders(main_folder+sub_folder));
        
        return folders.reduce((acc, folder)=> acc+(acc?"\n":"")+parseFolder(folder), "");

        function parseFolder(folder){
            return fs.readdirSync(folder)
                .map(file_name=> folder.replace(main_folder, "")+file_name)
                .filter(file_candidate=> files.test(file_candidate))
                .map(file_name=> fileHandler(replaceHelper, once, false, main_folder, file_name, spaces))
                .join("\n");
        }
        function getFolders(folders_pattern){
            const parent_folder= folders_pattern.replace(/\*\*\//g, "");
            const first_deep= fs.readdirSync(parent_folder).filter(item=> fs.statSync(parent_folder+item).isDirectory()).map(folder_name=> parent_folder+folder_name+"/");
            if(!folder_deep_glob_reg.test(folders_pattern)) return first_deep;
            const subFoldersPattern= folder=> folder+"**/".repeat(folders_pattern.match(/\*\*\//g).length);
            return first_deep.concat(first_deep.reduce((acc, folder)=> acc.concat(getFolders(subFoldersPattern(folder))), []));
        }
    }
    function fileNameVarHandler(str, parent_folder){
        const file_candidate= nameVarHandler(str);
        const [ first_letter ]= file_candidate;
        return first_letter==="." ? path.resolve(parent_folder, file_candidate).replace(/\\/g, "/").replace(path.resolve().replace(/\\/g, "/")+"/", "") : file_candidate;
    }
    function nameVarHandler(str){
        if(typeof str !== "string") throw Error(`Type of '${str}' is not string!`);
        return str.replace(/\$\{([\s]*[^;\s\{\}]+[\s]*)\}/g, (_, match)=> variable_eval(match));
    }
};