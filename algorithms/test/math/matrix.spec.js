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

	describe('identity', () => {
		it('1x3 -> 3x3', () => {
			let a = [[1, 2, 3]];
			expect(matrix.identity(a)).to.deep.equal([
				[bint(1), bint(0), bint(0)],
				[bint(0), bint(1), bint(0)],
				[bint(0), bint(0), bint(1)],
			]);
		});
	});

	describe('exp', () => {
		it('^1', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(1);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint(1), bint(1)],
				[bint(1), bint(0)],
			]);
		});

		it('^2', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(2);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint(2), bint(1)],
				[bint(1), bint(1)],
			]);
		});

		it('^3', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(3);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint(3), bint(2)],
				[bint(2), bint(1)],
			]);
		});

		it('^4', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(4);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint(5), bint(3)],
				[bint(3), bint(2)],
			]);
		});

		it('^5', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(5);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint(8), bint(5)],
				[bint(5), bint(3)],
			]);
		});

		it('^100', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(100);

			expect(matrix.exp(a, n)).to.deep.equal([
				[bint('573147844013817084101'), bint('354224848179261915075')],
				[bint('354224848179261915075'), bint('218922995834555169026')],
			]);
		});

		it('^1000', () => {
			let a = [
				[bint(1),bint(1)],
				[bint(1),bint(0)],
			]; // prettier-ignore
			let n = bint(1000);

			expect(matrix.exp(a, n)).to.deep.equal([
				[
					bint('70330367711422815821835254877183549770181269836358732742604905087154537118196933579742249494562611733487750449241765991088186363265450223647106012053374121273867339111198139373125598767690091902245245323403501'),
					bint('43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875')
				],
				[
					bint('43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'),
					bint('26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626')
				],
			]); // prettier-ignore
		});
	});
});
