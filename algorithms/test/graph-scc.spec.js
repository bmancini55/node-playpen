const { expect } = require('chai');
const { Graph } = require('../src/graph-scc');
const { reverseGraph } = require('../src/graph-scc');
const { dfsLoop1 } = require('../src/graph-scc');
const { dfsLoop2 } = require('../src/graph-scc');
const { reorderGraph } = require('../src/graph-scc');
const { kosaraju } = require('../src/graph-scc');

describe('strongly connected components', () => {
	describe('Graph', () => {
		it('should add a node', () => {
			let g = new Graph();
			g.addNode(1);
			expect(g.nodes.length).to.equal(1);
			expect(g.nodes[0]).to.equal(1);
		});

		it('should add one direction edge', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addEdge(1, 2);
			expect(g.edges[0].length).to.equal(1);
			expect(g.edges[1].length).to.equal(0);
			expect(g.edges[0][0]).to.equal(2);
		});
	});

	describe('.reverseGraph', () => {
		it('should reverse a graph', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addNode(3);
			g.addEdge(1, 2);
			g.addEdge(1, 3);
			g.addEdge(2, 3);
			let gr = reverseGraph(g);
			expect(gr.edges[0].length).to.equal(0);
			expect(gr.edges[1].length).to.equal(1);
			expect(gr.edges[1][0]).to.equal(1);
			expect(gr.edges[2].length).to.equal(2);
			expect(gr.edges[2][0]).to.equal(1);
			expect(gr.edges[2][1]).to.equal(2);
		});
	});

	describe('dfsLoop1', () => {
		it('should return the finishes correctly', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addNode(3);
			g.addNode(4);
			g.addNode(5);
			g.addNode(6);
			g.addNode(7);
			g.addNode(8);
			g.addNode(9);
			g.addEdge(1, 7);
			g.addEdge(2, 5);
			g.addEdge(3, 9);
			g.addEdge(4, 1);
			g.addEdge(5, 8);
			g.addEdge(6, 3);
			g.addEdge(6, 8);
			g.addEdge(7, 4);
			g.addEdge(7, 9);
			g.addEdge(8, 2);
			g.addEdge(9, 6);
			let result = dfsLoop1(g);
			expect(result).to.deep.equal([7, 3, 1, 8, 2, 5, 9, 4, 6]);
		});
	});

	describe('dfsLoop2', () => {
		it('should return the leaders', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addNode(3);
			g.addNode(4);
			g.addNode(5);
			g.addNode(6);
			g.addNode(7);
			g.addNode(8);
			g.addNode(9);
			g.addEdge(9, 7);
			g.addEdge(7, 8);
			g.addEdge(8, 9);
			g.addEdge(6, 9);
			g.addEdge(6, 1);
			g.addEdge(1, 5);
			g.addEdge(5, 6);
			g.addEdge(4, 5);
			g.addEdge(3, 4);
			g.addEdge(2, 3);
			g.addEdge(4, 2);
			let result = dfsLoop2(g);
			expect(result).to.deep.equal([6, 4, 4, 4, 6, 6, 9, 9, 9]);
		});
	});

	describe('.reorderGraph', () => {
		it('should reorder', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addNode(3);
			g.addNode(4);
			g.addNode(5);
			g.addNode(6);
			g.addNode(7);
			g.addNode(8);
			g.addNode(9);
			g.addEdge(1, 7);
			g.addEdge(2, 5);
			g.addEdge(3, 9);
			g.addEdge(4, 1);
			g.addEdge(5, 8);
			g.addEdge(6, 3);
			g.addEdge(6, 8);
			g.addEdge(7, 4);
			g.addEdge(7, 9);
			g.addEdge(8, 2);
			g.addEdge(9, 6);
			reorderGraph(g, [7, 3, 1, 8, 2, 5, 9, 4, 6]);
			expect(g.nodes).to.deep.equal([3, 5, 2, 8, 6, 9, 1, 4, 7]);
		});
	});

	describe('.kosaraju', () => {
		it('should return the components', () => {
			let g = new Graph();
			g.addNode(1);
			g.addNode(2);
			g.addNode(3);
			g.addNode(4);
			g.addNode(5);
			g.addNode(6);
			g.addNode(7);
			g.addNode(8);
			g.addNode(9);
			g.addEdge(7, 1);
			g.addEdge(5, 2);
			g.addEdge(9, 3);
			g.addEdge(1, 4);
			g.addEdge(8, 5);
			g.addEdge(3, 6);
			g.addEdge(8, 6);
			g.addEdge(4, 7);
			g.addEdge(9, 7);
			g.addEdge(2, 8);
			g.addEdge(6, 9);
			console.log(g);
			let result = kosaraju(g);
			expect(result).to.deep.equal([9, 8, 8, 8, 9, 9, 7, 7, 7]);
		});
	});
});
