import { expect } from 'chai';
import { gcd } from '../../src/math/gcd-euclid';

describe('GCD via Euclid', () => {
	const tests = [
		[1, 1, 1],
		[1, 2, 1],
		[1, 3, 1],
		[3, 3, 3],
		[5, 3, 1],
		[12, 6, 6],
		[10, 6, 2],
		[10, 5, 5],
		[18, 12, 6],
		[1024, 18, 2],
	];

	for (let [n, m, o] of tests) {
		it(`GCD(${n},${m}) = ${o}`, () => {
			expect(gcd(n, m)).to.equal(o);
		});
	}
});
