const { expect } = require('chai');
const bint = require('bignumber.js');
const matrix = require('../../src/math/matrix');

describe('matrix', () => {
	describe('.scalar', () => {
		it('single', () => {
			let m = [[bint(1)]];
			let a = bint(3);
			expect(matrix.scalar(m, a)).to.deep.equal([[bint(3)]]);
		});

		it('square', () => {
			let m = [
				[bint(2), bint(1)],
				[bint(1), bint(0)],
			]; // prettier-ignore
			let a = bint(3);
			expect(matrix.scalar(m, a)).to.deep.equal([
				[bint(6), bint(3)],
				[bint(3), bint(0)],
			]);
		});
	});

	describe('dot', () => {
		it('1x1 * 1x1 -> 1x1', () => {
			let a = [
				[bint(2)]
			]; // prettier-ignore

			let b = [
				[bint(3)]
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([[bint(6)]]);
		});

		it('2x2 * 2x2 -> 2x2', () => {
			let a = [
				[bint(2), bint(1)],
				[bint(1), bint(0)],
			]; // prettier-ignore

			let b = [
				[bint(3), bint(2)],
				[bint(1), bint(0)],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([
				[bint(7), bint(4)],
				[bint(3), bint(2)],
			]);
		});

		it('2x3 * 3x2 -> 2x2', () => {
			let a = [
				[bint(1), bint(2), bint(3)],
				[bint(4), bint(5), bint(6)],
			]; // prettier-ignore

			let b = [
				[bint(7), bint(8)],
				[bint(9), bint(10)],
				[bint(11), bint(12)],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([
				[bint(58), bint(64)],
				[bint(139), bint(154)],
			]);
		});

		it('1x3 * 3x1 -> 1x1', () => {
			let a = [
				[bint(1), bint(2), bint(3)],
			]; // prettier-ignore

			let b = [
				[bint(4)],
				[bint(5)],
				[bint(6)],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([[bint(32)]]);
		});

		it('3x1 * 1x3 -> 3x3', () => {
			let a = [
				[bint(4)],
				[bint(5)],
				[bint(6)],
			]; // prettier-ignore

			let b = [
				[bint(1), bint(2), bint(3)],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([
				[bint(4), bint(8), bint(12)],
				[bint(5), bint(10), bint(15)],
				[bint(6), bint(12), bint(18)],
			]);
		});
	});
});
