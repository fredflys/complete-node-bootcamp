// const calc = require("./modules/class-calculator");

const calculator = require("./modules/class-calculator");
const { add } = require("./modules/func-calculator");
console.log(new calculator().add(2, 3));
console.log(add(2, 3));

require("./modules/execution-demo")();
require("./modules/execution-demo")();
// console.log(calc.add(1, 2));
