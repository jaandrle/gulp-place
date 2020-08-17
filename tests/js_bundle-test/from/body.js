/* global _dependencies */
console.log(_dependencies);
const private= "A";
export const test= private+"B";
export function myFunction(params) {
    console.log(test);
}