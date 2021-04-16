/**
 * @typedef build_time_string
 * @type {string}
 */
/**
 * PHP require like concating syntax for gulp (primary for JavaScript files).
 * 
 * …see [jaandrle/gulp-place](https://github.com/jaandrle/gulp-place)
 * @method gulp_place
 * @param {string} target Based on `type` use as file/folder path vars eval or JSON config, e.g. `some_folder/${file_var}`|`${folder_var}/some_file` (`${}` handled by `variable_eval` viz corresponding gulp task).
 * @param {gulp_place_file | gulp_place_files | gulp_place_variable | gulp_place_clean | gulp_place_combine} [type='file'] By default `file` (⇒ include file)
 * @returns {build_time_string} Paste file(s)/vars content
 */
function gulp_place(target, type){}
/**
 * File content (`target` is file path)
 * - `file`: place file content
 * - `file_if_exists`: skips silently non-existing files (typically used in combination `${}`)
 * - `file_once`: similary to `file`, ensures placed only onetime till `gulp_place(…, "clean")`
 * @typedef {"file"|"file_once"|"file_if_exists"} gulp_place_file
 */
/**
 * Places content of files based on glob pattern
 * - `files_once`: similary to `file`, ensures placed only onetime till `gulp_place(…, "clean")`
 * @typedef {"files"|"files_once"|"glob"} gulp_place_files
 */
/**
 * Vloží obsah proměnné při buildu (viz parametr `variable_eval` v příslušném gulp tasku). V případě `eval*` lze proměnnou i měnit dynamicky (střídmě používat naříklad pro šablony)
 * Places build-time variable content (see `variable_eval` in corresponding gulp task). In case `eval*` it is possible to change its value (still `gulp_place` should’t be uses as template engine)
 * @typedef {"variable"|"eval"|"eval_out"} gulp_place_variable
 */
/**
 * Resets internal cache (typically for `*_once`)
 * 
 * Example: `gulp_place("all", "clean")`
 * @typedef {"clean"} gulp_place_clean
 */
/**
 * As `target` use JSON (e.g. `gulp_place('{ "file": "path_to_file" }', 'combine')…`) in the form `{ glob, file, name, type, depends }`.
 * 
 * Targeted file(s) interprets as module/namespace
 * 
 * - One of `file`/`glob` must be filled. Works as `*_once`.
 *      - In targerted file "import"/"export" are key words. In case `module_native`⇒ nothing to do
 *      - `/export (default )?(function|const|let|var|class) (?<name>…)…/g`: translated as IIFE→ `const name= (()=> { return EXPORTED; })();`
 *      - `/import (\* as [^ ]+|{[^}]+}) from "depends:([^"]+)"/g`: translate `depends` based on module type
 * - `name`: e.g. `const name= (()=>{ … })();`
 * - `type` {"namespace"|"module"|"module_native"}: "namespace" is default
 * - `use_strict` {boolean}: includes `"use strict";` if true (by default)
 * - Example(s): [gulp-place/tests/combine-test at master · jaandrle/gulp-place](https://github.com/jaandrle/gulp-place/tree/master/tests/combine-test)
 * @typedef {"combine"} gulp_place_combine
 */