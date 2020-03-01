const { expect } = require('chai');
const matrix = require('../../src/math/matrix');

describe('matrix', () => {
	describe('.scalar', () => {
		it('single', () => {
			let m = [[1n]];
			let a = 3n;
			expect(matrix.scalar(m, a)).to.deep.equal([[3n]]);
		});

		it('square', () => {
			let m = [
				[2n, 1n],
				[1n, 0n],
			]; // prettier-ignore
			let a = 3n;
			expect(matrix.scalar(m, a)).to.deep.equal([[6n, 3n], [3n, 0n]]);
		});
	});

	describe('dot', () => {
		it('1x1 * 1x1 -> 1x1', () => {
			let a = [
				[2n]
			]; // prettier-ignore

			let b = [
				[3n]
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([[6n]]);
		});

		it('2x2 * 2x2 -> 2x2', () => {
			let a = [
				[2n, 1n],
				[1n, 0n],
			]; // prettier-ignore

			let b = [
				[3n, 2n],
				[1n, 0n],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([
				[7n, 4n],
				[3n, 2n],
			]); // prettier-ignore
		});

		it('2x3 * 3x2 -> 2x2', () => {
			let a = [
				[1n, 2n, 3n],
				[4n, 5n, 6n],
			]; // prettier-ignore

			let b = [
				[7n, 8n],
				[9n, 10n],
				[11n, 12n],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([[58n, 64n], [139n, 154n]]);
		});

		it('1x3 * 3x1 -> 1x1', () => {
			let a = [
				[1n, 2n, 3n],
			]; // prettier-ignore

			let b = [
				[4n],
				[5n],
				[6n],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([[32n]]);
		});

		it('3x1 * 1x3 -> 3x3', () => {
			let a = [
				[4n],
				[5n],
				[6n],
			]; // prettier-ignore

			let b = [
				[1n, 2n, 3n],
			]; // prettier-ignore

			expect(matrix.dot(a, b)).to.deep.equal([
				[4n, 8n, 12n],
				[5n, 10n, 15n],
				[6n, 12n, 18n],
			]); // prettier-ignore
		});
	});

	describe('identity', () => {
		it('1x3 -> 3x3', () => {
			let a = [[1, 2, 3]];
			expect(matrix.identity(a)).to.deep.equal([
				[1n, 0n, 0n],
				[0n, 1n, 0n],
				[0n, 0n, 1n],
			]); // prettier-ignore
		});
	});

	describe('exp', () => {
		it('^1', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 1n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[1n, 1n],
				[1n, 0n],
			]); // prettier-ignore
		});

		it('^2', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 2n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[2n, 1n],
				[1n, 1n],
			]); // prettier-ignore
		});

		it('^3', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 3n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[3n, 2n],
				[2n, 1n],
			]); // prettier-ignore
		});

		it('^4', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 4n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[5n, 3n],
				[3n, 2n],
			]); // prettier-ignore
		});

		it('^5', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 5n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[8n, 5n],
				[5n, 3n],
			]); // prettier-ignore
		});

		it('^100', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 100n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[
					BigInt('573147844013817084101'),
					BigInt('354224848179261915075'),
				],
				[
					BigInt('354224848179261915075'),
					BigInt('218922995834555169026'),
				],
			]);
		});

		it('^1000', () => {
			let a = [
				[1n,1n],
				[1n,0n],
			]; // prettier-ignore
			let n = 1000n;

			expect(matrix.exp(a, n)).to.deep.equal([
				[
					BigInt('70330367711422815821835254877183549770181269836358732742604905087154537118196933579742249494562611733487750449241765991088186363265450223647106012053374121273867339111198139373125598767690091902245245323403501'),
					BigInt('43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875')
				],
				[
					BigInt('43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'),
					BigInt('26863810024485359386146727202142923967616609318986952340123175997617981700247881689338369654483356564191827856161443356312976673642210350324634850410377680367334151172899169723197082763985615764450078474174626')
				],
			]); // prettier-ignore
		});
	});
});
