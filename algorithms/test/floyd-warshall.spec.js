const { expect } = require('chai');
const { floydWarshall } = require('../src/floyd-warshall');

describe('floydWarhsall', () => {
	let u = undefined;
	it('simple graph', () => {
		let g = [
			[u, 1, 2],
			[u, u, u],
			[u, u, u],
		]; // prettier-ignore
		let a = floydWarshall(g);
		expect(a).to.deep.equal([
			[0, 1, 2],
			[Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY],
			[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 0],
		]);
	});

	it('less simple graph', () => {
		let g = [
			[u, 1, 2],
			[3, u, u],
			[u, 4, u],
		]; // prettier-ignore
		let a = floydWarshall(g);
		expect(a).to.deep.equal([
			[0, 1, 2],
			[3, 0, 5],
			[7, 4, 0],
		]); // prettier-ignore
	});

	it('graph with negative', () => {
		let g = [
			[u, 1, 2],
			[3, u, u],
			[u, -4, u],
		]; // prettier-ignore
		let a = floydWarshall(g);
		expect(a).to.deep.equal([
			[0, -2, 2],
			[3, 0, 5],
			[-1, -4, 0],
		]); // prettier-ignore
	});

	it('graph with negative cycle', () => {
		let g = [
			[u, 1, 2],
			[-3, u, u],
			[u, 4, u],
		]; // prettier-ignore
		let a = floydWarshall(g);
		expect(a).to.be.undefined;
	});

	it('graph with negative cycle', () => {
		let g = [
			[u, 1, -2],
			[3, u, u],
			[u, -4, u],
		]; // prettier-ignore
		let a = floydWarshall(g);
		expect(a).to.be.undefined;
	});
});
