const { runFixtures } = require('./test-utils');
const { rselect } = require('../src/rselect');
const { choosePivotLeft } = require('../src/rselect');

let fixtures = [
	['finds select of single array',	[[1], 0], 1],
	['finds select of odd array', 		[[3,2,1,4,5], 2], 3],
	['finds select of event array ',	[[7,6,9,1,5,2,8,4], 3], 5],
	['finds select with dupes', 		[[1,1,2,2,3], 2], 2],
	['finds select with dupes', 		[[1,1,2,2,3], 4], 3],
]; // prettier-ignore

describe('rselect', () => {
	runFixtures(rselect, fixtures);
});
