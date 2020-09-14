gulp_place("./abcd.js", "file_once");/* global a, b, c, d */
export function log(){
    return console.log({ a, b, c, d });
}