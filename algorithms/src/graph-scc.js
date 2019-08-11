// @ts-check

class Graph {
	/**
	 * Constructs a directed graph using an adjacency list.
	 */
	constructor() {
		/** @type {Map<number, number>} */
		this.nodes = new Map();

		/** @type {Map<number, []>} */
		this.edges = new Map();
	}

	/**
	 *
	 * @param {number} val
	 */
	addNode(val) {
		this.nodes.set(val, val);
		this.edges.set(val, []);
	}

	/**
	 * Adds a directed edge
	 * @param {number} tail
	 * @param {number} head
	 */
	addEdge(tail, head) {
		let edges = this.getEdges(tail);
		edges.push(head);
	}

	/**
	 * Gets a node by the value specified
	 * @param {number} val
	 */
	getNode(val) {
		return this.nodes.get(val);
	}

	/**
	 * Gets the nodes
	 * @returns {number[]}
	 */
	getNodes() {
		return Array.from(this.nodes.values());
	}

	/**
	 * Gets the outbound edges for a node
	 * @param {number} val
	 * @returns {number[]}
	 */
	getEdges(val) {
		return this.edges.get(val);
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
	let nodes = g.getNodes();
	for (let node of nodes) {
		g2.addNode(node);
	}
	for (let node of nodes) {
		let edges = g.getEdges(node);
		for (let edge of edges) {
			g2.addEdge(edge, node);
		}
	}
	return g2;
}

/**
 *
 * @param {Graph} g
 */
function dfsLoop1(g, order) {
	let explored = new Set();
	let finish = new Map();
	let t = 0;
	for (let i of order.slice().reverse()) {
		if (!explored.has(i)) {
			dfs(g, i);
		}
	}

	/**
	 * @param {Graph} g
	 * @param {number} i
	 */
	function dfs(g, i) {
		explored.add(i);
		let edges = g.getEdges(i);
		for (let j of edges) {
			if (!explored.has(j)) {
				dfs(g, j);
			}
		}
		t++;
		finish.set(i, t);
	}

	let results = [];
	for (let i of order) {
		results.push(finish.get(i));
	}

	return results;
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
		let idx = g.__indexOf(i);
		explored[idx] = true;
		leader[idx] = s;
		for (let j of g.edges[idx]) {
			let idxj = g.__indexOf(j);
			if (!explored[idxj]) {
				dfs(g, j);
			}
		}
	}

	return leader;
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
exports.kosaraju = kosaraju;
