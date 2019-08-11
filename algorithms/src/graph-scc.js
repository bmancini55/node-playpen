// @ts-check

class Graph {
	/**
	 * Constructs a directed graph using an adjacency list.
	 */
	constructor() {
		/** @type {number[]} */
		this.nodes = [];
		/** @type {number[][]} */
		this.edges = [];
	}

	/**
	 *
	 * @param {number} val
	 */
	addNode(val) {
		this.nodes.push(val);
		this.edges.push([]);
	}

	/**
	 * Adds a directed edge
	 * @param {number} tail
	 * @param {number} head
	 */
	addEdge(tail, head) {
		let idx = this.indexOf(tail);
		if (idx > -1) {
			this.edges[idx].push(head);
		}
	}

	/**
	 * Finds the index of the value
	 * @param {number} val
	 */
	indexOf(val) {
		return this.nodes.indexOf(val);
	}
}

/**
 * Reverses the graph by constructing a duplicate of it with all
 * edge directions reversed
 * @param {Graph} g
 * @returns {Graph}
 */
function reverseGraph(g) {
	let g2 = new Graph();
	for (let node of g.nodes) {
		g2.addNode(node);
	}
	for (let i = 0; i < g.edges.length; i++) {
		for (let edge of g.edges[i]) {
			g2.addEdge(edge, g.nodes[i]);
		}
	}
	return g2;
}

/**
 *
 * @param {Graph} g
 */
function dfsLoop1(g) {
	let explored = [];
	let finish = [];
	let t = 0;
	for (let idx = g.nodes.length - 1; idx >= 0; idx--) {
		let i = g.nodes[idx];
		if (!explored[idx]) {
			dfs(g, i);
		}
	}

	/**
	 * @param {Graph} g
	 * @param {number} i
	 */
	function dfs(g, i) {
		let idx = g.indexOf(i);
		explored[idx] = true;
		for (let j of g.edges[idx]) {
			let idxj = g.indexOf(j);
			if (!explored[idxj]) {
				dfs(g, j);
			}
		}
		t++;
		finish[idx] = t;
	}

	return finish;
}

/**
 *
 * @param {Graph} g
 */
function dfsLoop2(g) {
	let explored = [];
	let leader = [];
	let s = null;
	for (let idx = g.nodes.length - 1; idx >= 0; idx--) {
		let i = g.nodes[idx];
		if (!explored[idx]) {
			s = i;
			dfs(g, i);
		}
	}

	/**
	 * @param {Graph} g
	 * @param {number} i
	 */
	function dfs(g, i) {
		let idx = g.indexOf(i);
		explored[idx] = true;
		leader[idx] = s;
		for (let j of g.edges[idx]) {
			let idxj = g.indexOf(j);
			if (!explored[idxj]) {
				dfs(g, j);
			}
		}
	}

	return leader;
}

// 7, 3, 1, 8, 2, 5, 9, 4, 6
function reorderGraph(g, order) {
	for (let i = 0; i < order.length; i++) {
		while (order[i] !== i + 1) {
			let newIdx = order[i] - 1;
			swapArray(order, i, newIdx);
			swapGraph(g, i, newIdx);
		}
	}
}

function swapGraph(g, i, j) {
	let tempNode = g.nodes[j];
	let tempEdges = g.edges[j];
	g.nodes[j] = g.nodes[i];
	g.edges[j] = g.edges[i];
	g.nodes[i] = tempNode;
	g.edges[i] = tempEdges;
}

function swapArray(a, i, j) {
	let t = a[j];
	a[j] = a[i];
	a[i] = t;
}

function kosaraju(g) {
	let gr = reverseGraph(g);
	let finishes = dfsLoop1(gr);
	reorderGraph(g, finishes);
	let scc = dfsLoop2(g);
	return scc;
}

exports.Graph = Graph;
exports.reverseGraph = reverseGraph;
exports.dfsLoop1 = dfsLoop1;
exports.dfsLoop2 = dfsLoop2;
exports.reorderGraph = reorderGraph;
exports.kosaraju = kosaraju;
