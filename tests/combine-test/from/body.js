import * as testExternalModule from "depends:Test";
const private= "A";
export const test= private+"B";
export default function myFunction(params) {
    console.log(test);
}