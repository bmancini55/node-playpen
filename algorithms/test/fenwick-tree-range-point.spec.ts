import { expect } from 'chai';
import { FenwickTree } from '../src/fenwick-tree-range-point';

describe('FenwickTree - Range, Point', () => {
	describe('.sumRange()', () => {
		it('[1-1]', () => {
			const sut = new FenwickTree(3);
			sut.addRange(1, 1);
			expect(sut.pointQuery(1)).to.equal(1);
			expect(sut.pointQuery(2)).to.equal(0);
			expect(sut.pointQuery(3)).to.equal(0);
		});

		it('[1-2]', () => {
			const sut = new FenwickTree(3);
			sut.addRange(1, 2);
			expect(sut.pointQuery(1)).to.equal(1);
			expect(sut.pointQuery(2)).to.equal(1);
			expect(sut.pointQuery(3)).to.equal(0);
		});

		it('[1-3]', () => {
			const sut = new FenwickTree(3);
			sut.addRange(1, 3);
			expect(sut.pointQuery(1)).to.equal(1);
			expect(sut.pointQuery(2)).to.equal(1);
			expect(sut.pointQuery(3)).to.equal(1);
		});

		it('[2-3]', () => {
			const sut = new FenwickTree(3);
			sut.addRange(2, 3);
			expect(sut.pointQuery(1)).to.equal(0);
			expect(sut.pointQuery(2)).to.equal(1);
			expect(sut.pointQuery(3)).to.equal(1);
		});
	});
});
