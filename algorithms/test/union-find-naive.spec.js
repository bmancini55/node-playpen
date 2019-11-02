const { expect } = require('chai');
const { UnionFind } = require('../src/union-find-naive');

describe('union-find', () => {
	it('should find the group', () => {
		let sut = new UnionFind(['a', 'b', 'c']);
		expect(sut.find('a')).to.equal('a');
	});

	describe('union', () => {
		/** @type {UnionFind} */
		let sut;

		before(() => {
			sut = new UnionFind(['a', 'b', 'c']);
			sut.union('a', 'b');
		});
		it('should merge groups', () => {
			expect(sut.find('a')).to.equal('a');
			expect(sut.find('b')).to.equal('a');
		});

		it('should not merge outside setts', () => {
			expect(sut.find('c')).to.equal('c');
		});
	});
});
