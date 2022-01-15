import readSquare, { readSquareTotal } from './readsquare.js';

const results = await readSquare();
const total = readSquareTotal();

console.log(results);
console.log("\n");
console.log("TOTAL VALUE: $" + total.toFixed(2));
console.log("\n");
