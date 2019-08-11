// @ts-check

class Graph {
	/**
	 * Implements a graph as an array-based adjacency list. This graph
	 * uses two arrays, one to store the value/name of the vertices and one
	 * to store the edges that each vertex is adjacent to.
	 *
	 * This list expects unique node values.
	 */
	constructor() {
		this.vertices = [];
		this.edges = [];
	}

	/**
	 * Adding an edge is a simple operation of pushing the value onto the
	 * list of vertices and creating a new array at the same index inside
	 * the list of edges.
	 * @param {number} val
	 */
	addVertex(val) {
		this.vertices.push(val);
		this.edges.push([]);
	}

	/**
	 * Adding a new edge requires finding the index for both verticies.
	 * With that index, we can push the opposing vertex onto each vertexes
	 * lisit of adjacent edges.
	 *
	 * @param {number} val1
	 * @param {number} val2
	 */
	addEdge(val1, val2) {
		let vidx1 = this.indexOf(val1);
		let vidx2 = this.indexOf(val2);

		this.edges[vidx1].push(val2);
		this.edges[vidx2].push(val1);
	}

	/**
	 * @private
	 * @param {number} val
	 */
	indexOf(val) {
		return this.vertices.indexOf(val);
	}

	toString() {
		let result = '';
		for (let i = 0; i < this.vertices.length; i++) {
			let v = this.vertices[i];
			let e = this.edges[i];
			result += `${v} => [${e.toString()}]\n`;
		}
		return result;
	}
}

exports.Graph = Graph;
