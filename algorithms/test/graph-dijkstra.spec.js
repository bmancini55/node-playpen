const { expect } = require('chai');
const { Graph } = require('../src/graph-adj-list-directed-weighted');
const { dijkstra } = require('../src/graph-dijkstra');

describe('Dijkstra', () => {
	it('should find min path to all nodes from s', () => {
		let g = new Graph();
		g.addNode('1');
		g.addNode('2');
		g.addNode('3');
		g.addNode('4');
		g.addEdge('1', '2', 1);
		g.addEdge('1', '3', 4);
		g.addEdge('2', '3', 2);
		g.addEdge('3', '4', 3);
		g.addEdge('2', '4', 6);
		let result = dijkstra(g, '1');
		expect(Array.from(result)).to.deep.equal([
			['1', 0],
			['2', 1],
			['3', 3],
			['4', 6],
		]);
	});

	it('should find min path to all nodes from s with cycle', () => {
		let g = new Graph();
		g.addNode('1');
		g.addNode('2');
		g.addNode('3');
		g.addNode('4');
		g.addEdge('1', '2', 1);
		g.addEdge('1', '3', 4);
		g.addEdge('2', '3', 2);
		g.addEdge('3', '4', 3);
		g.addEdge('2', '4', 6);
		g.addEdge('4', '1', 1);
		let result = dijkstra(g, '1');
		expect(Array.from(result)).to.deep.equal([
			['1', 0],
			['2', 1],
			['3', 3],
			['4', 6],
		]);
	});
});
