const { expect } = require('chai');

const { Graph } = require('../src/graph');

describe('Graph', () => {
	it('should add a vertex', () => {
		let g = new Graph();
		g.addVertex(1);
		expect(g.vertices[0].value).to.equal(1);
	});

	it('should add a second vertex', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		expect(g.vertices[1].value).to.equal(2);
	});

	it('should add an edge between vertices', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addEdge(1, 2);
		expect(g.vertices[0].edges[0].vertex1.value).to.equal(1);
		expect(g.vertices[1].edges[0].vertex2.value).to.equal(2);
	});

	it('should allow parallel edges', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addEdge(1, 2);
		g.addEdge(1, 2);
		expect(g.vertices[0].edges[1].vertex1.value).to.equal(1);
		expect(g.vertices[1].edges[1].vertex2.value).to.equal(2);
	});
});
