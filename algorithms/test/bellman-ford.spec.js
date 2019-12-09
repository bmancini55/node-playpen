const { expect } = require('chai');
const { bellmanFord } = require('../src/bellman-ford');

describe('Bellman-Ford', () => {
	let u = undefined;
	it('simple', () => {
		let g = [
			[u,1,3],
			[u,u,u],
			[u,u,u],
		]; // prettier-ignore
		let r = bellmanFord(g, 0);
		expect(r).to.deep.equal([0, 1, 3]);
	});

	it('more complex', () => {
		let g = [
			[u, 1, u, 1, u],
			[u, u, 5, u, u],
			[u, u, u, u, u],
			[u, u, u, u, 1],
			[u, u, 1, u, u],
		]; // prettier-ignore

		let r = bellmanFord(g, 0);
		expect(r).to.deep.equal([0, 1, 3, 1, 2]);
	});
});
