const fs = require('fs');
const { Graph } = require('../src/graph-prim');
const { prim } = require('../src/graph-prim');

// const file = './input/prim_10.txt'; // returns -7430
// const file = './input/prim_2000.txt'; // returns -5102660
const file = './input/prim.txt'; // returns -3612829

const raw = fs.readFileSync(file, 'utf8');
const data = raw
	.split('\n')
	.slice(1)
	.filter(p => p)
	.map(l => l.split(' ').map(Number));

// console.log(data);

const g = new Graph();
for (let [v1, v2, w] of data) {
	g.addVertex(v1);
	g.addVertex(v2);
	g.addEdge(v1, v2, w);
}

const t = prim(g);

// console.log(t);
const weight = t.map(e => e.weight).reduce((sum, w) => sum + w, 0);
console.log(weight);
