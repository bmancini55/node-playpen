const { expect } = require('chai');

const { Graph } = require('../src/graph-adjacency-list-array');

describe('Graph - Adjacency List Array', () => {
	it('should add a vertex', () => {
		let g = new Graph();
		g.addVertex(1);
		expect(g.vertices[0]).to.equal(1);
	});

	it('should add a second vertex', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		expect(g.vertices[1]).to.equal(2);
	});

	it('should add an edge between vertices', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addEdge(1, 2);
		expect(g.edges[0][0]).to.equal(2);
		expect(g.edges[1][0]).to.equal(1);
	});

	it('should allow parallel edges', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addEdge(1, 2);
		g.addEdge(1, 2);
		expect(g.edges[0][0]).to.equal(2);
		expect(g.edges[0][1]).to.equal(2);

		expect(g.edges[1][0]).to.equal(1);
		expect(g.edges[1][1]).to.equal(1);
	});

	it('should return graph as a string', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addVertex(3);
		g.addEdge(1, 2);
		g.addEdge(1, 3);
		let a = g.toString();
		expect(a).to.equal(`1 => [2,3]
2 => [1]
3 => [1]
`);
	});
});
