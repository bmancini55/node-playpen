const { expect } = require('chai');
const { UnionFind } = require('../src/union-find-lazy');

describe('union-find', () => {
	it('should merge 1 and 2', () => {
		let sut = new UnionFind(3);
		sut.union(0, 1);
		expect(sut.find(0)).to.equal(0);
		expect(sut.find(1)).to.equal(0);
	});

	it('should not have merged 3', () => {
		let sut = new UnionFind(3);
		sut.union(0, 1);
		expect(sut.find(2)).to.equal(2);
	});

	it('should merge 3 cascaded upward', () => {
		let sut = new UnionFind(3);
		sut.union(0, 1);
		sut.union(1, 2);
		expect(sut.find(0)).to.equal(0);
		expect(sut.find(1)).to.equal(0);
		expect(sut.find(2)).to.equal(0);
	});

	it('should merge 3 cascaded the other way', () => {
		let sut = new UnionFind(3);
		sut.union(0, 1);
		sut.union(2, 1);
		expect(sut.find(0)).to.equal(2);
		expect(sut.find(1)).to.equal(2);
		expect(sut.find(2)).to.equal(2);
	});
});
