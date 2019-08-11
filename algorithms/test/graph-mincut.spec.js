const { expect } = require('chai');
const { mincut } = require('../src/graph-mincut');
const { Graph } = require('../src/graph-adj-list-oop');

describe('.mincut', () => {
	it('should cut single', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addEdge(1, 2);
		expect(mincut(g)).to.equal(1);
	});

	it('should cut 2', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addVertex(3);
		g.addEdge(1, 2);
		g.addEdge(2, 3);
		g.addEdge(1, 3);
		expect(mincut(g)).to.equal(2);
	});

	it('should cut 4', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addVertex(3);
		g.addVertex(4);
		g.addEdge(1, 2);
		g.addEdge(1, 3);
		g.addEdge(2, 3);
		g.addEdge(2, 4);
		g.addEdge(3, 4);
		expect(mincut(g)).to.equal(2);
	}).retries(10);

	it('should cut 5', () => {
		let g = new Graph();
		g.addVertex(1);
		g.addVertex(2);
		g.addVertex(3);
		g.addVertex(4);
		g.addVertex(5);
		g.addEdge(1, 2);
		g.addEdge(1, 3);
		g.addEdge(1, 4);
		g.addEdge(2, 4);
		g.addEdge(2, 5);
		g.addEdge(3, 4);
		g.addEdge(3, 5);
		g.addEdge(4, 5);
		expect(mincut(g)).to.equal(3);
	}).retries(10);
});
