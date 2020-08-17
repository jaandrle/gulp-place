# gulp-place
PHP require like concating syntax for gulp (primary for JavaScript files).

## General Info
Library is tested very vell also in production enviroment, but till now I haven't specific place for focusing only to this library.

## Approach
1. `npm install git+https://github.com/jaandrle/gulp-place.git`
1. In 'gulpfile.js': `const gulpPlace= require("gulp-place");`
1. In gulp task: `const localPlace= gulpPlace({ variable_eval: function, filesCleaner: function })`→ define function for evaluating variables (`eval`) and function for cleaning e.g. jshint comments
1. In '.pipe': `.pipe(localPlace({ folder: string, string_wrapper: string }))`→ define root folder (against gulps cwd) and string quotes (default ")
1. In files: see [Usage examples](#usage-examples)

## TODO
- [ ] Refactoring + test
- [ ] Code documentation + ReadMe + Usage Doc

## Usage examples
It simulates function calling:
```JavaScipt
gulp_place(target: string, type: string): string;
```
- `type`:
    - "files", "glob": Places all files matching `target` pattern (e.g. `some_folder/*.*` – all files in `some_folder`).
    - "file": Places file content based on `target`.
    - "file_if_exists": Places file content based on `target`. Silently skips non-founded file.
    - "files_once", "glob_once": Ensure loading file once per whole initiation (means 2nd point in [Approach](#approach)).
    - "file_once": Ensure loading file once per whole initiation (means 2nd point in [Approach](#approach)).
    - "clean": Resets all `*_once`.
    - "js_bundle" (`target` in form: `{ glob, file, name, type, depends }`): One of `glob/file` must be defined (`file` has priority) and correspodns to `glob_once/file_once`. Create [module](./templates/module.js)/[namespace](./templates/namespace.js) pattern based on `type` (namespace is default). `name` sets namespace/module name (default is file/folder name). `depend` is array of names (in case of `type='module'`).
    - "variable": Evaluate `target` with `variable_eval` and return result surrounded by `string_wrapper`.
    - "eval": Evaluate `target` with `variable_eval`. It can be used for dynamic behaviour in building process.
    - "eval_out": Evaluate `target` with `variable_eval` and return result without `string_wrapper`.
- `target`:
    - see `type`
    - In case of file(s) can be used also variable pattern `some_folder/${file_var}`|`${folder_var}/some_file` (`${}` is evaluated by `variable_eval`).