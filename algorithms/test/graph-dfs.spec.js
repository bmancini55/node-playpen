const { expect } = require('chai');
const { Graph } = require('../src/graph-adj-list-map');
const { dfsVisit } = require('../src/graph-dfs');
const { rdfsVisit } = require('../src/graph-dfs');
const { rdfsFinish } = require('../src/graph-dfs');

function g1() {
	let g = new Graph();
	g.addNode(1);
	g.addNode(2);
	g.addNode(3);
	g.addNode(4);
	g.addEdge(1, 2);
	g.addEdge(1, 4);
	g.addEdge(2, 3);
	return g;
}

function g2() {
	let g = new Graph();
	g.addNode(1);
	g.addNode(2);
	g.addNode(3);
	g.addNode(4);
	g.addEdge(1, 2);
	g.addEdge(1, 4);
	g.addEdge(2, 3);
	g.addEdge(3, 1);
	return g;
}

describe('DFS', () => {
	describe('dfsVisit', () => {
		it('should traverse in order', () => {
			let g = g1();
			let actual = dfsVisit(g, 1);
			expect(actual).to.deep.equal([1, 4, 2, 3]);
		});

		it('should traverse in order with cycles', () => {
			let g = g2();
			let actual = dfsVisit(g, 1);
			expect(actual).to.deep.equal([1, 4, 2, 3]);
		});
	});

	describe('rdfsVisit', () => {
		it('should traverse in order', () => {
			let g = g1();
			let actual = rdfsVisit(g, 1);
			expect(actual).to.deep.equal([1, 2, 3, 4]);
		});

		it('should traverse in order with cycles', () => {
			let g = g2();
			let actual = rdfsVisit(g, 1);
			expect(actual).to.deep.equal([1, 2, 3, 4]);
		});
	});

	describe('rdfsFinish', () => {
		it('should traverse in order', () => {
			let g = g1();
			let actual = rdfsFinish(g, 1);
			expect(actual).to.deep.equal([3, 2, 4, 1]);
		});

		it('should traverse in order with cycles', () => {
			let g = g2();
			let actual = rdfsFinish(g, 1);
			expect(actual).to.deep.equal([3, 2, 4, 1]);
		});
	});
});
