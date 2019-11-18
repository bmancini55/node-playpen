const { expect } = require('chai');
const { needlemanWunsch } = require('../src/needleman-wunsch');

describe('needlemanWunsch', () => {
	let tests = [
		[['A', '', 1, 2], 1],
		[['', 'A', 1, 2], 1],
		[['A', 'A', 1, 2], 0],
		[['A', 'G', 1, 2], 2],
		[['AGGGCT', 'AGGCA', 1, 2], 3],
		[['AGTACG', 'ACATAG', 1, 2], 4],
	];

	for (let [input, score] of tests) {
		it(`expect ${score} for ${input[0]} and ${input[1]}`, () => {
			expect(needlemanWunsch.apply(null, input)).to.equal(score);
		});
	}
});
