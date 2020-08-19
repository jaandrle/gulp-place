import * as testExternalModule from "depends:Test";
const _private= "A";
export const test= _private+"B";
export default function myFunction(params) {
    console.log(test);
}