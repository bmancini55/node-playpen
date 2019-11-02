/**
 * IMPORTANT: Prevent maximum call stack exceptions by running node with
 * 		node --stack-size=65500 test3.js"
 *
 *  Expected: [ 434821, 968, 459, 313, 211 ]
 */

const fs = require('fs');
const { Graph } = require('../src/graph-kosaraju');
const { kosaraju } = require('../src/graph-kosaraju');

function run() {
	console.time('parsing file');
	let raw = fs.readFileSync('./input/scc.txt', 'utf8');
	let lines = raw.split('\n').filter(p => p);
	let tuples = lines.map(l => {
		let p = l.split(' ');
		return [p[0], p[1]];
	});
	console.timeEnd('parsing file');

	console.time('building graph');
	let g = new Graph();
	let nodes = new Set();
	for (let [tail, head] of tuples) {
		nodes.add(tail);
		nodes.add(head);
	}
	for (let node of nodes) {
		g.addNode(node);
	}
	for (let tuple of tuples) {
		g.addEdge(tuple[0], tuple[1]);
	}
	console.timeEnd('building graph');

	console.time('kosaraju');
	let sccs = kosaraju(g);
	console.timeEnd('kosaraju');

	console.time('counting');
	let counts = countSccsSizes(sccs);
	console.timeEnd('counting');

	// console.log(counts);
	console.log(
		Array.from(counts.values())
			.sort((a, b) => {
				if (a > b) return -1;
				if (a < b) return 1;
				return 0;
			})
			.slice(0, 5)
	);
}

function countSccsSizes(sccs) {
	let counts = new Map();
	for (let [, v] of sccs) {
		let count = counts.get(v) || 0;
		counts.set(v, count + 1);
	}
	return counts;
}

run();
