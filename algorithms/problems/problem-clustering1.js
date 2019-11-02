const fs = require('fs');
const { UnionFind } = require('../src/union-find-naive');

// const raw = fs.readFileSync('./input/clustering1_8.txt', 'utf8'); // 21
// const raw = fs.readFileSync('./input/clustering1_32.txt', 'utf8'); // 90
const raw = fs.readFileSync('./input/clustering1_1024.txt', 'utf8'); // 5999
// const raw = fs.readFileSync('./input/clustering1.txt', 'utf8'); //

const data = raw
	.split('\n')
	.filter(p => p)
	.slice(1)
	.map(p => p.split(' '))
	.map(p => [p[0], p[1], Number(p[2])]);

function cluster(k, edges) {
	edges = edges.sort((a, b) => a[2] - b[2]);
	// console.log(edges);

	// initialize union-find
	let vertices = new Set();
	for (let edge of edges) {
		vertices.add(edge[0]);
		vertices.add(edge[1]);
	}
	let uf = new UnionFind(vertices);
	// console.log(uf);

	let clusters = vertices.size;

	for (let edge of edges) {
		let c1 = uf.find(edge[0]);
		let c2 = uf.find(edge[1]);
		if (c1 !== c2) {
			uf.union(c1, c2);
			// console.log(edge, c1, c2, uf);
			if (--clusters == 4) break;
		}
	}

	for (let edge of edges) {
		let c1 = uf.find(edge[0]);
		let c2 = uf.find(edge[1]);
		if (c1 != c2) {
			console.log(edge[2]);
			break;
		}
	}
}

cluster(4, data);
