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
			expect(g.nodes.size).to.equal(1);
			expect(g.nodes.get(1)).to.equal(1);
		});

		it('should add one direction edge', () => {
			let g = new Graph();
			g.addNode('1');
			g.addNode('2');
			g.addEdge('1', '2');
			let e1 = g.getEdges('1');
			let e2 = g.getEdges('2');
			expect(e1.length).to.equal(1);
			expect(e2.length).to.equal(0);
			expect(e1[0]).to.equal('2');
		});
	});

	describe('.reverseGraph', () => {
		it('should reverse a graph', () => {
			let g = new Graph();
			g.addNode('1');
			g.addNode('2');
			g.addNode('3');
			g.addEdge('1', '2');
			g.addEdge('1', '3');
			g.addEdge('2', '3');
			let gr = reverseGraph(g);
			let e1 = gr.getEdges('1');
			let e2 = gr.getEdges('2');
			let e3 = gr.getEdges('3');
			expect(e1.length).to.equal(0);
			expect(e2.length).to.equal(1);
			expect(e2[0]).to.equal('1');
			expect(e3.length).to.equal(2);
			expect(e3[0]).to.equal('1');
			expect(e3[1]).to.equal('2');
		});
	});

	describe('dfsLoop1', () => {
		it('should return the finishes correctly', () => {
			let g = new Graph();
			g.addNode('1');
			g.addNode('2');
			g.addNode('3');
			g.addNode('4');
			g.addNode('5');
			g.addNode('6');
			g.addNode('7');
			g.addNode('8');
			g.addNode('9');
			g.addEdge('1', '7');
			g.addEdge('2', '5');
			g.addEdge('3', '9');
			g.addEdge('4', '1');
			g.addEdge('5', '8');
			g.addEdge('6', '3');
			g.addEdge('6', '8');
			g.addEdge('7', '4');
			g.addEdge('7', '9');
			g.addEdge('8', '2');
			g.addEdge('9', '6');
			let result = dfsLoop1(g); // prettier-ignore
			expect(result).to.deep.equal(['3', '5', '2', '8', '6', '9', '1', '4', '7']); // prettier-ignore
		});
	});

	describe('dfsLoop2', () => {
		it('should return the leaders', () => {
			let g = new Graph();
			g.addNode('1');
			g.addNode('2');
			g.addNode('3');
			g.addNode('4');
			g.addNode('5');
			g.addNode('6');
			g.addNode('7');
			g.addNode('8');
			g.addNode('9');
			g.addEdge('7', '1');
			g.addEdge('5', '2');
			g.addEdge('9', '3');
			g.addEdge('1', '4');
			g.addEdge('8', '5');
			g.addEdge('3', '6');
			g.addEdge('8', '6');
			g.addEdge('4', '7');
			g.addEdge('9', '7');
			g.addEdge('2', '8');
			g.addEdge('6', '9');
			let result = dfsLoop2(g, ['3', '5', '2', '8', '6', '9', '1', '4', '7']); // prettier-ignore
			expect(result).to.deep.equal(
				new Map([
					['7', '7'],
					['1', '7'],
					['4', '7'],
					['9', '9'],
					['3', '9'],
					['6', '9'],
					['8', '8'],
					['5', '8'],
					['2', '8'],
				])
			);
		});
	});

	describe('.kosaraju', () => {
		it('should return the components', () => {
			let g = new Graph();
			g.addNode('1');
			g.addNode('2');
			g.addNode('3');
			g.addNode('4');
			g.addNode('5');
			g.addNode('6');
			g.addNode('7');
			g.addNode('8');
			g.addNode('9');
			g.addEdge('7', '1');
			g.addEdge('5', '2');
			g.addEdge('9', '3');
			g.addEdge('1', '4');
			g.addEdge('8', '5');
			g.addEdge('3', '6');
			g.addEdge('8', '6');
			g.addEdge('4', '7');
			g.addEdge('9', '7');
			g.addEdge('2', '8');
			g.addEdge('6', '9');
			let result = kosaraju(g);
			expect(result).to.deep.equal(
				new Map([
					['7', '7'],
					['1', '7'],
					['4', '7'],
					['9', '9'],
					['3', '9'],
					['6', '9'],
					['8', '8'],
					['5', '8'],
					['2', '8'],
				])
			);
		});
	});
});
