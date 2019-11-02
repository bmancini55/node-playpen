const fs = require('fs');
const { UnionFind } = require('../src/union-find-weighted');
// const { UnionFind } = require('../src/union-find-weighted-path-compression');

// const raw = fs.readFileSync('./input/clustering2_4_8.txt', 'utf8'); // 3
// const raw = fs.readFileSync('./input/clustering2_4_14.txt', 'utf8'); // 3
// const raw = fs.readFileSync('./input/clustering2_256_20.txt', 'utf8'); // 247
// const raw = fs.readFileSync('./input/clustering2_65536_22.txt', 'utf8'); // 1371
const raw = fs.readFileSync('./input/clustering2.txt', 'utf8'); // 6118

let data = raw
	.split('\n')
	.filter(p => p)
	.map(p => p.split(' '));

let bits = Number(data[0][1]);
console.log('Bits', bits);

data = data.slice(1).map(p => parseInt(p.join(''), 2));

function run(data) {
	// O(n) - initialize set of data
	// deduping doesnt matter since all values that are the same
	// will have a hamming distance of 0 and be in the same cluster
	let values = new Set(data);

	// Creates a map of for value to index. The index will be used in
	// the union find which requires us to use index elements.
	let indexMap = new Map(Array.from(values.values()).map((v, i) => [v, i]));

	// O(n) - initialize union find
	let uf = new UnionFind(values.size);

	// iterate each unique value
	for (let num of data) {
		// find possible values that having a hamming distance of 0, 1, or 2
		// this returns: n(n-1)/2+n+1
		let possibles = findHamming(num, bits);

		// load the cluster id of our number
		let c1 = uf.find(indexMap.get(num));

		// iterate all possible values
		for (let possible of possibles) {
			// check if it is value found in our input
			if (values.has(possible)) {
				// if so, find its cluster id and merge
				// the two clusters if they don't match
				let c2 = uf.find(indexMap.get(possible));
				if (c1 != c2) {
					uf.union(c1, c2);
				}
			}
		}
	}

	return uf;
}

// generate possible values which is (n-choose 2 of bits + bits + 1)
// possible values that are within a hamming distance of 2
function findHamming(val, bits) {
	let results = [];
	for (let i = 0; i < bits; i++) {
		for (let j = i; j < bits; j++) {
			results.push(val ^ ((1 << i) | (1 << j)));
		}
	}
	return results;
}

console.time();
let result = run(data);

let count = 0;
for (let i = 0; i < result.ids.length; i++) {
	if (result.ids[i] === i) count++;
}
console.timeEnd();
console.log(count);
