const fs = require('fs');
// const file = './input/dijkstra_4.txt';
const file = './input/dijkstra_assignment.txt';
const { Graph } = require('../src/graph-adj-list-directed-weighted');
const { dijkstra } = require('../src/graph-dijkstra');

function run() {
	console.time('loading and parsing');
	let raw = fs.readFileSync(file, 'utf8');
	let lines = raw.split('\n').filter(p => p);
	let lineParts = lines.map(l => l.split('\t'));

	let nodes = new Set();
	let edges = [];

	for (let linePart of lineParts) {
		let tail = linePart[0];
		nodes.add(tail);
		for (let rawEdge of linePart.slice(1)) {
			let rawEdgeParts = rawEdge.split(',');
			let head = rawEdgeParts[0];
			let weight = parseInt(rawEdgeParts[1]);
			nodes.add(head);
			edges.push({ tail, head, weight });
		}
	}
	console.timeEnd('loading and parsing');

	console.time('building graph');
	let g = new Graph();
	for (let node of nodes) {
		g.addNode(node);
	}
	for (let { tail, head, weight } of edges) {
		g.addEdge(tail, head, weight);
	}
	console.timeEnd('building graph');

	// const util = require('util');
	// console.log(util.inspect(g, { depth: null }));

	console.time('dijkstra');
	let result = dijkstra(g, '1');
	console.timeEnd('dijkstra');
	// console.log(result);
	// console.log(g.nodes.size, result.size);
	console.log(
		result.get('7'),
		result.get('37'),
		result.get('59'),
		result.get('82'),
		result.get('99'),
		result.get('115'),
		result.get('133'),
		result.get('165'),
		result.get('188'),
		result.get('197')
	);
}

run();
