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

exports.Graph = Graph;
