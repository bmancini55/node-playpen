const fs = require('fs');
const { floydWarshall } = require('../src/floyd-warshall');

// NEED TO RUN WITH INCREASED HEAP SPACE
// This algorithm will take 1000^3 = 1,000,000,000 * 8 bytes of space at a minimum
// node --max-old-space-size=10000 problem-apsp.js

// const input = './input/apsp_4.txt'; // undefined
// const input = './input/apsp_8.txt'; // -234
// const input = './input/apsp_256.txt'; // -961
// const input = './input/apsp_1024.txt'; // -2361

// const input = './input/apsp_p1.txt'; // undefined
// const input = './input/apsp_p2.txt'; // undefined
const input = './input/apsp_p3.txt'; // -19

const rawData = fs
	.readFileSync(input, 'utf8')
	.split('\n')
	.filter(p => p)
	.map(p => p.split(' ').map(Number));

const [n] = rawData[0];

// construct the empty graph table
const g = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
	g[i] = new Array(n + 1).fill(undefined);
}

// build the adjacency matrix, take min score for the graph if there are multiple edges between u->v
for (let [i, j, w] of rawData.slice(1)) {
	g[i][j] = Math.min(g[i][j] || Number.POSITIVE_INFINITY, w);
}

// console.log(g);

// get all pair shortest paths
console.time();
let apsp = floydWarshall(g);
console.timeEnd();

if (!apsp) {
	console.log('negative cycle');
} else {
	// find min path
	// console.log(apsp);
	let min = Number.POSITIVE_INFINITY;
	for (let i = 0; i < apsp.length; i++) {
		for (let j = 0; j < apsp[i].length; j++) {
			if (apsp[i][j] < min) {
				min = apsp[i][j];
			}
		}
	}
	console.log('min value', min);
}
