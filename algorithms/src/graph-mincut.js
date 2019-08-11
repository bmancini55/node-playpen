const { Graph } = require('./graph-adj-list-oop');

exports.mincut = mincut;

/**
 * Randomized algorithm for finding the minimum cut needed to partition
 * a node from the graph.
 *
 * This algorithm only has a small probability of finding the correct answer 1/n^2.
 * and has an O(n^2*m) which is also slow.
 * @param {Graph} g
 */
function mincut(g) {
	while (g.vertices.length > 2) {
		let i = selectRandom(g.vertices.length);
		let e = g.edges[i];

		let v1 = e.vertex1;
		let v2 = e.vertex2;
		let g2 = new Graph();
		g2.addVertex(v1.value);
		for (let v of g.vertices) {
			if (v === v1 || v === v2) continue;
			g2.addVertex(v.value);
		}

		for (let e of g.edges) {
			let ev1 = e.vertex1;
			let ev2 = e.vertex2;

			// we want to collapse v1 and v2 into a single value v1
			if (ev1 === v2) ev1 = v1;
			else if (ev2 === v2) ev2 = v1;

			if (ev1 === ev2) continue;
			g2.addEdge(ev1.value, ev2.value);
		}

		g = g2;
	}

	return g.edges.length;
}

/**
 *
 * @param {number} n
 */
function selectRandom(n) {
	return Math.trunc(Math.random() * n);
}
