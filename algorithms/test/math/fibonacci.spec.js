const { expect } = require('chai');
const bint = require('bignumber.js');
const fib = require('../../src/math/fibonacci');

describe('fibonacci', () => {
	describe('fib_me', () => {
		it('n=1', () => {
			expect(fib.fib_me(bint(1))).to.deep.equal(bint(1));
		});

		it('n=4', () => {
			expect(fib.fib_me(bint(4))).to.deep.equal(bint(3));
		});

		it('n=5', () => {
			expect(fib.fib_me(bint(5))).to.deep.equal(bint(5));
		});

		it('n=100', () => {
			expect(fib.fib_me(bint(100))).to.deep.equal(
				bint('354224848179261915075')
			);
		});

		it('n=1000', () => {
			expect(fib.fib_me(bint(1000))).to.deep.equal(
				bint(
					'43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'
				)
			);
		});
	});

	describe('fib_fast', () => {
		it('n=1', () => {
			expect(fib.fib_fast(bint(1))).to.deep.equal(bint(1));
		});

		it('n=4', () => {
			expect(fib.fib_fast(bint(4))).to.deep.equal(bint(3));
		});

		it('n=5', () => {
			expect(fib.fib_fast(bint(5))).to.deep.equal(bint(5));
		});

		it('n=100', () => {
			expect(fib.fib_fast(bint(100))).to.deep.equal(
				bint('354224848179261915075')
			);
		});

		it('n=1000', () => {
			expect(fib.fib_fast(bint(1000))).to.deep.equal(
				bint(
					'43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'
				)
			);
		});
	});
});
