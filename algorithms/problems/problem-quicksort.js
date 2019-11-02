const fs = require('fs');
const { quickSort } = require('../src/quick-sort');

function readInput() {
	let input = fs.readFileSync('./input/quicksort.txt', 'utf8');
	return input
		.split('\n')
		.map(p => parseInt(p))
		.filter(p => p);
}

let a = readInput();
let [, comparisons] = quickSort(a);

console.log(comparisons);
