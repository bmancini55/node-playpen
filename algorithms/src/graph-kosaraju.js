// @ts-check

/**
 * Kosaraju's Strongly Connected Component algorithm
 * @param {Graph} g
 * @returns {Map<string, string>} map of each node and its leader
 */
function kosaraju(g) {
	// step 1: reverse the graph
	let gr = reverseGraph(g);

	// step 2: determine the finishing order
	let finishOrder = findFinishingOrder(gr);

	// step 3: find the leaders
	let scc = findLeaders(g, finishOrder);

	return scc;
}

///////////////////////////////////////////////////////////////

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
	 * Adds a node to the list in O(1)
	 * @param {string} val
	 */
	addNode(val) {
		this.nodes.set(val, val);
		this.edges.set(val, []);
	}

	/**
	 * Adds a directed edge to the list in O(1)
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
	 * Gets all nodes
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
 * Finds the finishing order by tranversing the graph using recursive DFS.
 * This operation is subject maximum stack overflows on large graphs that
 * may result in a large number of DFS calls.
 *
 * Recursive DFS is used because we want to mark a node as complete once
 * all of it's adjacent nodes have been visited. This is difficult with a
 * stack based DFS traversal or I may just be implementing it wrong.
 *
 * With recursive, we know that a sub-branch is completed when the DFS
 * call stack returns.
 *
 * @param {Graph} g
 * @returns {string[]}
 */
function findFinishingOrder(g) {
	/**
	 * Keeps track of explored nodes
	 * @type {Set<string>}
	 */
	let explored = new Set();

	/**
	 * List of nodes as the finish
	 * @type {string[]}
	 */
	let finish = [];

	// create the initial order arbitrarily based on the node supplied
	let order = Array.from(g.nodes.keys());

	// DFS loop in reverse order
	// if a node has not been explorered call DFS on it
	for (let i of order) {
		if (!explored.has(i)) {
			dfs(g, i);
		}
	}

	/**
	 * Recursive DFS
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
		// finish will be naturally ordered, meaning nodes will
		// be pushed in the order that they complete their DFS recursion
		finish.push(i);
	}

	return finish;
}

/**
 * Given a specific ordering, find the leader or the "root" node
 * that was used for the initiation of the DFS.
 *
 * We use a specific order so that we do not accidentally crawl the
 * entire graph. In paricular, we go in reverse order of the finishing
 * times for a crawl of the reverse graph.
 *
 * The reverse graph maintains the same SCCs as the normal graph. But
 * by going in reverse, the first nodes to finish are ones that can crawl
 * the most graph. The last nodes to finish are closer to sinks.
 *
 * Meaning, in the next step when we build leaders, if we crawl in
 * reverse of the finishing order, we are guaranteed to not mix SCCs.
 *
 * This method uses recursive DFS, though it could just as easily use
 * a stack based DFS. With a stack-based DFS, each iteration.
 *
 *
 * @param {Graph} g
 * @param {string[]} order
 * @returns {Map<string, string>}
 */
function findLeaders(g, order) {
	/**
	 * Explored nodes
	 * @type {Set<string>}
	 */
	let explored = new Set();

	/**
	 * Leader for each node
	 * @type {Map<string, string>}
	 */
	let leader = new Map();

	/**
	 * Current leader
	 * @type {string}
	 */
	let s = null;

	/**
	 * Loop DFS in reverse order of the order supplied
	 */
	for (let i of order.slice().reverse()) {
		if (!explored.has(i)) {
			s = i;
			dfs(g, i);
		}
	}

	/**
	 * Recursive DFS
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

exports.Graph = Graph;
exports.reverseGraph = reverseGraph;
exports.findFinishingOrder = findFinishingOrder;
exports.findLeaders = findLeaders;
exports.kosaraju = kosaraju;
