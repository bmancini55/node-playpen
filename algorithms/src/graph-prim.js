// @ts-check

/**
 * Perfosm Prim's algorithm to find a minimum spanning
 * tree for an undirected, connected graph. This is the
 * general algorithm that runs in O(nm) time where n is
 * the number of vertices and m is the number of edges.
 * @param {Graph} g
 * @returns {Edge[]} Array of Edges that make the MST
 */
function prim(g) {
	// intialize s to a random vertex
	let first = g.vertices.values().next().value;
	let s = first.key;

	// Explored vertices
	let X = new Set([s]);

	// edges in the spanning tree
	let T = new Set();

	while (X.size < g.vertices.size) {
		let min = findMinEdge(g, X);
		X.add(min.vertex1);
		X.add(min.vertex2);
		T.add(min);
	}

	return Array.from(T);
}

/**
 * Finds the mininum edge for all edges where v is in X
 * and w is not in X. This operation runs in O(m) time
 * where m is the number of edges.
 * @param {Graph} g
 * @param {Set<Vertex>} X
 * @returns {Edge}
 */
function findMinEdge(g, X) {
	let minEdge = null;
	for (let v of X) {
		let edges = g.getEdges(v);
		for (let edge of edges) {
			let has1 = X.has(edge.vertex1);
			let has2 = X.has(edge.vertex2);
			if ((has1 && !has2) || (!has1 && has2)) {
				if (!minEdge || edge.weight < minEdge.weight) {
					minEdge = edge;
				}
			}
		}
	}
	return minEdge;
}

///////////////////////////////////////////////////////////////

class Vertex {
	constructor(key) {
		this.key = key;
	}
}

class Edge {
	constructor(vertex1, vertex2, weight) {
		this.vertex1 = vertex1;
		this.vertex2 = vertex2;
		this.weight = weight;
	}
}

class Graph {
	constructor() {
		this.vertices = new Map();
		this.edges = new Map();
		this.edges = new Map();
	}

	addVertex(key) {
		let vertex = this.vertices.get(key);
		if (vertex) return vertex;

		vertex = new Vertex(key);
		this.vertices.set(key, vertex);
		this.edges.set(key, new Set());
		return vertex;
	}

	addEdge(vertex1, vertex2, weight) {
		let edges = this.edges.get(vertex1);
		let edge = edges.has(vertex2);
		if (edge) return edge;

		edges = this.edges.get(vertex2);
		edge = edges.has(vertex1);
		if (edge) return edge;

		edge = new Edge(vertex1, vertex2, weight);
		this.edges.get(vertex1).add(edge);
		this.edges.get(vertex2).add(edge);
		return edge;
	}

	getVertex(key) {
		return this.vertices.get(key);
	}

	getEdges(vertex) {
		return this.edges.get(vertex);
	}
}

///////////////////////////////////////////////////////////////

module.exports = {
	Graph,
	Vertex,
	Edge,
	prim,
};
