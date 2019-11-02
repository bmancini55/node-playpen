// @ts-check
const { UnionFind } = require('./union-find-weighted-path-compression');

/**
 * Perform Kruskal's algorithm to find a minimum spanning
 * tree for an undirected, connected graph. This method uses
 * union-find to assist with finding cycles.
 * @param {Graph} g
 * @returns {Edge[]} Array of Edges that make the MST
 */
function kruskal(g) {
	let vertices = Array.from(g.vertices.values());
	let edges = Array.from(g.edges.values());

	// create an index lookup for use with union-find
	let vertexIndex = new Map(vertices.map((v, i) => [v.key, i]));

	// create a union-find
	let u = new UnionFind(vertices.length);

	// edges in the spanning tree
	let t = new Set();

	// sort the edges by ascending weight
	edges.sort((a, b) => {
		if (a.weight < b.weight) return -1;
		if (a.weight > b.weight) return 1;
		return 0;
	});

	// main loop
	for (let edge of edges) {
		// find the components for v1 and v2
		let vertex1Component = u.find(vertexIndex.get(edge.vertex1));
		let vertex2Component = u.find(vertexIndex.get(edge.vertex2));

		// console.log(vertex1Component);
		// console.log(vertex2Component);

		// if they are different...
		if (vertex1Component !== vertex2Component) {
			// add to the spanning tree
			t.add(edge);

			// union the sets
			u.union(vertex1Component, vertex2Component);
		}
	}

	// return list of edges in spanning tree
	return Array.from(t);
}

///////////////////////////////////////////////////////////////

class Vertex {
	constructor(key) {
		this.key = key;
		this.edges = new Set();
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
		this.edges = new Set();
	}

	addVertex(key) {
		let vertex = this.vertices.get(key);
		if (vertex) return vertex;

		vertex = new Vertex(key);
		this.vertices.set(key, vertex);
		return vertex;
	}

	addEdge(vertex1, vertex2, weight) {
		let edges = this.getEdges(vertex1);
		let edge = edges.has(vertex2);
		if (edge) return edge;

		edges = this.getEdges(vertex2);
		edge = edges.has(vertex1);
		if (edge) return edge;

		edge = new Edge(vertex1, vertex2, weight);
		this.edges.add(edge);
		this.getEdges(vertex1).add(edge);
		this.getEdges(vertex2).add(edge);
		return edge;
	}

	getVertex(key) {
		return this.vertices.get(key);
	}

	getEdges(vertex) {
		return this.vertices.get(vertex).edges;
	}
}

///////////////////////////////////////////////////////////////

module.exports = {
	Graph,
	Vertex,
	Edge,
	kruskal,
};
