import { expect } from 'chai';
import { FenwickTree } from '../src/fenwick-tree-point-range';

describe('FenwickTree - Add Point, Query Range', () => {
	describe('.add()', () => {
		it('should add 1', () => {
			const sut = new FenwickTree(3);
			sut.add(1, 1);
			expect(sut.tree).to.deep.equal([0, 1, 1, 0]);
		});

		it('should add 1,2', () => {
			const sut = new FenwickTree(3);
			sut.add(1, 1);
			sut.add(2, 1);
			expect(sut.tree).to.deep.equal([0, 1, 2, 0]);
		});

		it('should add 1,2,3', () => {
			const sut = new FenwickTree(3);
			sut.add(1, 1);
			sut.add(2, 1);
			sut.add(3, 1);
			expect(sut.tree).to.deep.equal([0, 1, 2, 1]);
		});
	});

	describe('.prefixSum()', () => {
		it('should sum 1', () => {
			const sut = new FenwickTree(3);
			sut.add(1);
			expect(sut.prefixSum(1)).to.equal(1);
			expect(sut.prefixSum(2)).to.equal(1);
			expect(sut.prefixSum(3)).to.equal(1);
		});

		it('should sum 2', () => {
			const sut = new FenwickTree(3);
			sut.add(2);
			expect(sut.prefixSum(1)).to.equal(0);
			expect(sut.prefixSum(2)).to.equal(1);
			expect(sut.prefixSum(3)).to.equal(1);
		});

		it('should sum 3', () => {
			const sut = new FenwickTree(3);
			sut.add(3);
			expect(sut.prefixSum(1)).to.equal(0);
			expect(sut.prefixSum(2)).to.equal(0);
			expect(sut.prefixSum(3)).to.equal(1);
		});

		it('should sum 1,2', () => {
			const sut = new FenwickTree(3);
			sut.add(1);
			sut.add(2);
			expect(sut.prefixSum(1)).to.equal(1);
			expect(sut.prefixSum(2)).to.equal(2);
			expect(sut.prefixSum(3)).to.equal(2);
		});

		it('should sum 2,3', () => {
			const sut = new FenwickTree(3);
			sut.add(2);
			sut.add(3);
			expect(sut.prefixSum(1)).to.equal(0);
			expect(sut.prefixSum(2)).to.equal(1);
			expect(sut.prefixSum(3)).to.equal(2);
		});

		it('should sum 1,2,3', () => {
			const sut = new FenwickTree(3);
			sut.add(1);
			sut.add(2);
			sut.add(3);
			expect(sut.prefixSum(1)).to.equal(1);
			expect(sut.prefixSum(2)).to.equal(2);
			expect(sut.prefixSum(3)).to.equal(3);
		});
	});

	describe('.sumRange()', () => {
		it('sums range', () => {
			const sut = new FenwickTree(3);
			sut.add(1);
			sut.add(2);
			sut.add(3);
			expect(sut.sumRange(2, 3)).to.equal(2);
		});

		it('sums range', () => {
			const sut = new FenwickTree(5);
			sut.add(1);
			sut.add(2);
			sut.add(3);
			sut.add(4);
			sut.add(5);
			sut.add(4, 3);
			sut.add(5, 4);
			expect(sut.sumRange(2, 4)).to.equal(6);
		});
	});
});
