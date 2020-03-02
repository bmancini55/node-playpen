const { expect } = require('chai');
const fib = require('../../src/math/fibonacci');

describe('fibonacci', () => {
	describe('fib_me', () => {
		it('n=1', () => {
			expect(fib.fib_me(1n)).to.deep.equal(1n);
		});

		it('n=4', () => {
			expect(fib.fib_me(4n)).to.deep.equal(3n);
		});

		it('n=5', () => {
			expect(fib.fib_me(5n)).to.deep.equal(5n);
		});

		it('n=100', () => {
			expect(fib.fib_me(100n)).to.deep.equal(
				BigInt('354224848179261915075')
			);
		});

		it('n=1000', () => {
			expect(fib.fib_me(1000n)).to.deep.equal(
				BigInt(
					'43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'
				)
			);
		});
	});

	describe('fib_fast', () => {
		it('n=-5', () => {
			console.log(fib.fib_fast(-5n));
			expect(fib.fib_fast(-5n)).to.equal(5n);
		});

		it('n=-4', () => {
			expect(fib.fib_fast(-4n)).to.equal(-3n);
		});

		it('n=-3', () => {
			expect(fib.fib_fast(-3n)).to.equal(2n);
		});

		it('n=-2', () => {
			expect(fib.fib_fast(-2n)).to.equal(-1n);
		});

		it('n=-1', () => {
			expect(fib.fib_fast(-1n)).to.equal(1n);
		});

		it('n=0', () => {
			expect(fib.fib_fast(0n)).to.equal(0n);
		});

		it('n=1', () => {
			expect(fib.fib_fast(1n)).to.deep.equal(1n);
		});

		it('n=4', () => {
			expect(fib.fib_fast(4n)).to.deep.equal(3n);
		});

		it('n=5', () => {
			expect(fib.fib_fast(5n)).to.deep.equal(5n);
		});

		it('n=100', () => {
			expect(fib.fib_fast(100n)).to.deep.equal(
				BigInt('354224848179261915075')
			);
		});

		it('n=1000', () => {
			expect(fib.fib_fast(1000n)).to.deep.equal(
				BigInt(
					'43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875'
				)
			);
		});

		xit('n=2000000', () => {
			expect(
				fib
					.fib_fast(2000000n)
					.toString()
					.substring(0, 100)
			).to.equal(
				'8531294917507641543051660654503825161955433610024013070059635858838398006887605974653683126461696733'
			);
		});
	});
});
