const fs = require('fs');
const { mincut } = require('../src/graph-mincut');
const { Graph } = require('../src/graph-adj-list-oop');

function readInput() {
	let input = fs.readFileSync('./input/minCut.txt', 'utf8');
	return input
		.split('\n')
		.filter(p => p)
		.map(l =>
			l
				.split('\t')
				.map(p => parseInt(p))
				.filter(p => p)
		);
}

let adlist = readInput();

function buildGraph() {
	let g = new Graph();
	for (let v of adlist) {
		g.addVertex(v[0]);
	}

	let added = new Set();

	for (let v of adlist) {
		for (let e of v.slice(1)) {
			let val1 = v[0];
			let val2 = e;
			let key;
			if (val1 < val2) key = `${val1}-${val2}`;
			else key = `${val2}-${val1}`;
			if (added.has(key)) continue;

			g.addEdge(val1, val2);
			added.add(key);
		}
	}

	return g;
}

let min = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < 100; i++) {
	let g = buildGraph();
	let result = mincut(g);
	console.log(result);
	if (result < min) min = result;
}
console.log('min', min);
