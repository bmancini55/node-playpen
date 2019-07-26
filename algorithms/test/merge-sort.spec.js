const { runFixtures } = require('./test-utils');
const { mergeSort } = require('../src/merge-sort');

let fixtures = [
	['sorts even', [[5,3,6,7,2,1,8,4]], [1,2,3,4,5,6,7,8]],
	['sorts odd', [[5,3,6,7,2,1,4]], [1,2,3,4,5,6,7]],
	['sorts with dup', [[5,4,3,2,4,1]], [1,2,3,4,4,5]],
]; // prettier-ignore

describe('mergeSort', () => {
	runFixtures(mergeSort, fixtures);
});
