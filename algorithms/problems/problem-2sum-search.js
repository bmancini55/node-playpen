const fs = require('fs');
const { lowerBound } = require('../src/binary-search');
const { upperBound } = require('../src/binary-search');

// let raw = '-15000\n-8000\n1\n1000'; // expect 3
// let raw = fs.readFileSync('./input/2sum_10.txt', 'utf8'); // expect 2
// let raw = fs.readFileSync('./input/2sum_20.txt', 'utf8'); // expect 5
let raw = fs.readFileSync('./input/2sum_assignment.txt', 'utf8'); // expect 427

let a = raw
	.split('\n')
	.map(p => parseInt(p))
	.filter(p => p);

console.time('runtime');

// sort
a.sort((a, b) => {
	if (a > b) return 1;
	if (a < b) return -1;
	return 0;
});

// dedupe array
a = Array.from(new Set(a));

let tMin = -10000;
let tMax = 10000;
let results = new Set();

for (let i = 0; i < a.length; i++) {
	let x = a[i];
	let minVal = tMin - x;
	let maxVal = tMax - x;

	let i1 = lowerBound(a, 0, a.length, minVal);
	let i2 = upperBound(a, 0, a.length, maxVal);

	// console.log(x, minVal, maxVal, i1, i2);

	if (i1 === -1) continue;
	if (i2 === -1) continue;

	for (let i = i1; i <= i2; i++) {
		if (x == a[i]) continue;
		let t = x + a[i];
		results.add(t);
		// console.log('x', x, 'y', a[i], 't', t);
	}
}

console.timeEnd('runtime');
console.log(results.size);
// console.log(results);
