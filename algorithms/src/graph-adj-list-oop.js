// @ts-check

class Graph {
	/**
	 * Graph represented with an adjacency list where using and vertex and
	 * edge objects.
	 */
	constructor() {
		/**
		 * @type {Vertex[]}
		 */
		this.vertices = [];

		/**
		 * @type {Edge[]}
		 */
		this.edges = [];
	}

	/**
	 * Adds a new vertex with the associated value
	 * @param {number} value
	 * @returns {Vertex}
	 */
	addVertex(value) {
		let v = new Vertex(value);
		this.vertices.push(v);
		return v;
	}

	/**
	 *
	 * @param {number} val1
	 * @param {number} val2
	 * @returns {Edge}
	 */
	addEdge(val1, val2) {
		let v1 = this.findVertex(val1);
		let v2 = this.findVertex(val2);
		let e = new Edge(v1, v2);
		this.edges.push(e);
		return e;
	}

	/**
	 *
	 * @param {number} num
	 */
	findVertex(num) {
		return this.vertices.find((/** @type {Vertex} */ p) => p.value === num);
	}
}

class Vertex {
	/**
	 *
	 * @param {number} value
	 */
	constructor(value) {
		/**
		 * The value of the vertex
		 * @type {number}
		 */
		this.value = value;

		/**
		 * The list of edges the vertex is connected to as
		 * represented by adjacent vertices
		 * @type {Edge[]}
		 */
		this.edges = [];
	}

	/**
	 * Adds an edge to the vertex
	 * @param {Edge} e
	 */
	addEdge(e) {
		this.edges.push(e);
	}

	toString() {
		return this.value;
	}
}

class Edge {
	/**
	 *
	 * @param {Vertex} v1
	 * @param {Vertex} v2
	 */
	constructor(v1, v2) {
		this.vertex1 = v1;
		this.vertex2 = v2;
		this.vertex1.addEdge(this);
		this.vertex2.addEdge(this);
	}

	toJSON() {
		return {
			vertex1: this.vertex1.value,
			vertex2: this.vertex2.value,
		};
	}
}

exports.Graph = Graph;
exports.Vertex = Vertex;
exports.Edge = Edge;
