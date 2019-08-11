// @ts-check

class Graph {
	/**
	 * Constructs a directed graph using an adjacency list.
	 */
	constructor() {
		/** @type {Map<string, string>} */
		this.nodes = new Map();

		/** @type {Map<string, []>} */
		this.edges = new Map();
	}

	/**
	 *
	 * @param {string} val
	 */
	addNode(val) {
		this.nodes.set(val, val);
		this.edges.set(val, []);
	}

	/**
	 * Adds a directed edge
	 * @param {string} tail
	 * @param {string} head
	 */
	addEdge(tail, head) {
		let edges = this.getEdges(tail);
		edges.push(head);
	}

	/**
	 * Gets a node by the value specified
	 * @param {string} val
	 */
	getNode(val) {
		return this.nodes.get(val);
	}

	/**
	 * Gets the nodes
	 * @returns {string[]}
	 */
	getNodes() {
		return Array.from(this.nodes.values());
	}

	/**
	 * Gets the outbound edges for a node
	 * @param {string} val
	 * @returns {string[]}
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
 * @param {string[]} [startOrder]
 * @returns {string[]}
 */
function findFinishingOrder(g, startOrder) {
	/** @type {Set<string>} */
	let explored = new Set();

	/** @type {string[]} */
	let finish = [];

	if (!startOrder) {
		startOrder = Array.from(g.nodes.keys());
	}

	for (let i of startOrder.slice().reverse()) {
		if (!explored.has(i)) {
			dfs(g, i);
		}
	}

	/**
	 * @param {Graph} g
	 * @param {string} i
	 */
	function dfs(g, i) {
		explored.add(i);
		let edges = g.getEdges(i);
		for (let j of edges) {
			if (!explored.has(j)) {
				dfs(g, j);
			}
		}
		finish.push(i);
	}

	return finish;
}

/**
 *
 * @param {Graph} g
 * @param {string[]} order
 * @returns {Map<string, string>}
 */
function findLeaders(g, order) {
	/** @type {Set<string>} */
	let explored = new Set();

	/** @type {Map<string, string>} */
	let leader = new Map();

	let s = null;
	for (let i of order.slice().reverse()) {
		if (!explored.has(i)) {
			s = i;
			dfs(g, i);
		}
	}

	/**
	 * @param {Graph} g
	 * @param {string} i
	 */
	function dfs(g, i) {
		explored.add(i);
		leader.set(i, s);
		let edges = g.getEdges(i);
		for (let j of edges) {
			if (!explored.has(j)) {
				dfs(g, j);
			}
		}
	}

	return leader;
}

function kosaraju(g) {
	let gr = reverseGraph(g);
	let finishOrder = findFinishingOrder(gr);
	let scc = findLeaders(g, finishOrder);
	return scc;
}

exports.Graph = Graph;
exports.reverseGraph = reverseGraph;
exports.findFinishingOrder = findFinishingOrder;
exports.findLeaders = findLeaders;
exports.kosaraju = kosaraju;
