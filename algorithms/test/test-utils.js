const { expect } = require('chai');

exports.runFixtures = runFixtures;

function runFixtures(fn, fixtures) {
	for (let [title, input, expected] of fixtures) {
		it(title, () => {
			expect(fn(input)).to.deep.equal(expected);
		});
	}
}
