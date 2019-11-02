const { expect } = require('chai');
const { UnionFind } = require('../src/union-find-weighted-path-compression');

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

	it('should have correct tree', () => {
		let sut = new UnionFind(10);
		sut.union(9, 2);
		sut.union(9, 4);
		sut.union(9, 3);
		sut.union(6, 5);
		expect(sut.find(0)).to.equal(0);
		expect(sut.find(1)).to.equal(1);
		expect(sut.find(2)).to.equal(9);
		expect(sut.find(3)).to.equal(9);
		expect(sut.find(4)).to.equal(9);
		expect(sut.find(5)).to.equal(6);
		expect(sut.find(6)).to.equal(6);
		expect(sut.find(7)).to.equal(7);
		expect(sut.find(8)).to.equal(8);
		expect(sut.find(9)).to.equal(9);
	});

	it('should merge smaller tree', () => {
		let sut = new UnionFind(10);
		sut.union(3, 4);
		sut.union(4, 9);
		sut.union(8, 0);
		sut.union(2, 3);
		sut.union(5, 6);
		sut.union(5, 9);
		sut.union(7, 3);
		sut.union(4, 8);
		sut.union(6, 1);
		expect(sut.ids).to.deep.equal([8, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
	});
});
