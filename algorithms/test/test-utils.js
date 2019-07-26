const { expect } = require('chai');

exports.runFixtures = runFixtures;

function runFixtures(fn, fixtures) {
	for (let [title, input, expected] of fixtures) {
		it(title, () => {
			let actual = fn.apply(null, input);
			expect(actual).to.deep.equal(expected);
		});
	}
}
