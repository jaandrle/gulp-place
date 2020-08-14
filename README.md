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
- `gulp_place('file_path') === gulp_place('file_path', 'file')`: replaced by 'file_path' content
- `gulp_place('file_path${some_var_inside_gulp}') === gulp_place('file_path${some_var_inside_gulp}', 'file')`: replaced by 'file_path'+some_var_inside_gulp' content
- `gulp_place('files_subfolder/*.js', 'files') === gulp_place('files_subfolder/*.js', 'blob')`: replaced by js files content on 'files_subfolder
- `gulp_place('some_var_inside_gulp', 'variable')`: replaced by value of 'some_var_inside_gulp
- `gulp_place('file_path', 'file_once')`: only first match will be replaced by file content