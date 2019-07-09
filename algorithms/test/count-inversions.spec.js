const { runFixtures } = require('./test-utils');
const { countInvs } = require('../src/count-inversions');

let fixtures = [
	['counts odd', [3,1,2], [[1,2,3], 2]],
	['counts example', [1,3,5,2,4,6], [[1,2,3,4,5,6], 3]],
	['counts fully inverted', [6,5,4,3,2,1], [[1,2,3,4,5,6], 15]],
]; // prettier-ignore

describe('countInversions', () => {
	runFixtures(countInvs, fixtures);
});
