const fs = require('fs');

// const file = './input/heap_10.txt'; // expect 53
// const file = './input/heap_20.txt'; // expect 168
const file = './input/heap_assignment.txt'; // expect 46831213 - 1213

const rows = fs.readFileSync(file, 'utf8');
const vals = rows
	.split('\n')
	.map(p => parseInt(p))
	.filter(p => p);

// HEAP
const { MedianHeap } = require('../src/heap-median');
const h = new MedianHeap();

// BST
// const { BstMedian } = require('./src/bst-median');
// const h = new BstMedian();

console.time('execution');
let total = 0;
for (let val of vals) {
	h.insert(val);
	total += h.findMedian();
}
console.timeEnd('execution');
console.log(total);
console.log(total % 10000);
