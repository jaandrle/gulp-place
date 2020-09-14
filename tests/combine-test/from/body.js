import * as testExternalModule from "depends:./Test";
gulp_place('{ "glob": "MyModule_namespace/*.*", "use_strict": false }', "combine");/* global MyModule_namespace */
export { MyModule_namespace as namespace };
const _private= "A";
export const test= _private+"B";
export default function myFunction(params) {
    console.log(test);
}