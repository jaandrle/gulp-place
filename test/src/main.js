gulp_place("glob/*.*", "glob");/* global A, B */
/* gulp_place("app.name", "variable") */
gulp_place("log.js", "file_once");/* global log */
log({ A, B });