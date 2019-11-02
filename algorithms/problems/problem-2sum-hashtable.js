const fs = require('fs');

// let raw = '-15000\n-8000\n1\n1000'; // expect 3
// let raw = fs.readFileSync('./input/2sum_10.txt', 'utf8'); // expect 2
// let raw = fs.readFileSync('./input/2sum_20.txt', 'utf8'); // expect 5
let raw = fs.readFileSync('./input/2sum_assignment.txt', 'utf8'); // expect 5

let a = raw
	.split('\n')
	.map(p => parseInt(p))
	.filter(p => p);

console.time('runtime');

// convert raw to distinct numbers
let h = new Set();
for (let x of a) {
	h.add(x);
}

let results = new Set();
let tMin = -10000;
let tMax = 10000;

// look for each target
for (let t = tMin; t <= tMax; t++) {
	// for each value in a
	for (let x of a) {
		let y = t - x; // see if y exists
		if (x === y) continue;
		if (h.has(y)) {
			results.add(t); // if it does than we were able to find t
		}
	}
	console.log(t, 'complete');
}
console.timeEnd('runtime');
console.log(results.size);
// console.log(results);
