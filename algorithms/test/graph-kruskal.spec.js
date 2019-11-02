const { expect } = require('chai');
const { Graph } = require('../src/graph-kruskal');
const { kruskal } = require('../src/graph-kruskal');

describe('prim', () => {
	describe('two-node graph', () => {
		it('should find spanning tree', () => {
			let g = new Graph();
			g.addVertex(1);
			g.addVertex(2);
			g.addEdge(1, 2, 1);

			let t = kruskal(g);
			expect(t[0]).to.include({ vertex1: 1, vertex2: 2 });
		});
	});

	describe('three-node graph', () => {
		it('should find spanning tree', () => {
			let g = new Graph();
			g.addVertex(1);
			g.addVertex(2);
			g.addVertex(3);
			g.addEdge(1, 2, 1);
			g.addEdge(2, 3, 1);

			let t = kruskal(g);
			expect(t[0]).to.include({ vertex1: 1, vertex2: 2 });
			expect(t[1]).to.include({ vertex1: 2, vertex2: 3 });
		});
	});

	describe('multi graph', () => {
		it('should find spanning tree', () => {
			let g = new Graph();
			g.addVertex(1);
			g.addVertex(2);
			g.addVertex(3);
			g.addVertex(4);
			g.addEdge(1, 2, 1);
			g.addEdge(1, 3, 4);
			g.addEdge(1, 4, 3);
			g.addEdge(2, 4, 2);
			g.addEdge(3, 4, 5);

			let t = kruskal(g);
			expect(t[0]).to.include({ vertex1: 1, vertex2: 2 });
			expect(t[1]).to.include({ vertex1: 2, vertex2: 4 });
			expect(t[2]).to.include({ vertex1: 1, vertex2: 3 });
		});
	});
});
