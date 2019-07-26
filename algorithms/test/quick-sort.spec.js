const { runFixtures } = require('./test-utils');
const { quickSort } = require('../src/quick-sort');
const { choosePivotLeft } = require('../src/quick-sort');
const { choosePivotRight } = require('../src/quick-sort');
const { choosePivotMedian } = require('../src/quick-sort');

let fixtures = [
	// example 1
	['sorts 5 - left', 		[[3,2,1,4,5], choosePivotLeft], 	[[1,2,3,4,5],6]],
	['sorts 5 - right', 	[[3,2,1,4,5], choosePivotRight], 	[[1,2,3,4,5],10]],
	['sorts 5 - median', 	[[3,2,1,4,5], choosePivotMedian], 	[[1,2,3,4,5],6]],
	// example 2
	['sorts 5 - left', 		[[4,3,2,5,1], choosePivotLeft], 	[[1,2,3,4,5],7]],
	['sorts 5 - right', 	[[4,3,2,5,1], choosePivotRight], 	[[1,2,3,4,5],8]],
	['sorts 5 - median', 	[[4,3,2,5,1], choosePivotMedian], 	[[1,2,3,4,5],6]],
	// example 6
	['sorts 10 - left', 	[[1,6,8,10,7,5,2,9,4,3], choosePivotLeft], 		[[1,2,3,4,5,6,7,8,9,10],26]],
	['sorts 10 - right', 	[[1,6,8,10,7,5,2,9,4,3], choosePivotRight], 	[[1,2,3,4,5,6,7,8,9,10],21]],
	['sorts 10 - median', 	[[1,6,8,10,7,5,2,9,4,3], choosePivotMedian], 	[[1,2,3,4,5,6,7,8,9,10],21]],
	// example 8
	['sorts 10 - left', 	[[6,4,1,9,8,3,10,2,7,5], choosePivotLeft], 		[[1,2,3,4,5,6,7,8,9,10],23]],
	['sorts 10 - right', 	[[6,4,1,9,8,3,10,2,7,5], choosePivotRight], 	[[1,2,3,4,5,6,7,8,9,10],21]],
	['sorts 10 - median', 	[[6,4,1,9,8,3,10,2,7,5], choosePivotMedian], 	[[1,2,3,4,5,6,7,8,9,10],19]],
]; // prettier-ignore

describe('quickSort', () => {
	runFixtures(quickSort, fixtures);
});
