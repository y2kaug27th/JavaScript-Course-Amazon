import { formatCurrency } from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency');

//Basic test case
console.log('formatCurrency(2095)');
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

//Edge test case
console.log('formatCurrency(0)');
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

//Edge test case
console.log('formatCurrency(2000.5)');
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}