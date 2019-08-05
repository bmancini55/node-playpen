// @ts-check

exports.rselect = rselect;
exports.choosePivotLeft = choosePivotLeft;
exports.choosePivotRight = choosePivotRight;
exports.choosePivotRandom = choosePivotRandom;

/**
 * Randomized selection algorithm finds the i'th value in a an array
 * in O(n) time. This algorithm find the value in-place without any
 * additional memory allocation.
 *
 * This algorithm works by performing random pivots.
 * The random pivot ensures that the randomly selected pivot index
 * is in the correct position and the values below and above are
 * either below or above the pivot.
 *
 * With this knowledge, the next recursive call pivots the subarray
 * where the i'th value exists. Thus the sub-problem and subsequent
 * partition operation, get smaller with each recursive call.
 *
 * @param {number[]} a array of values
 * @param {number} i i'th value that should be found
 */
function rselect(a, i) {
	let l = 0;
	let r = a.length - 1;
	return rselectRecursive(a, i, l, r, choosePivotLeft);
}

/**
 * RSelect algorithm that operates on a sub-array. The first
 * iteration uses 0, length-1 for l and r
 *
 * @private
 * @param {number[]} a
 * @param {number} i i'th value target
 * @param {number} l left index of subarray
 * @param {number} r right index of subarray
 * @param {(a: number[], l: number, r: number) => number} choosePivot function for choosing a pivot
 */
function rselectRecursive(a, i, l, r, choosePivot) {
	let n = a.length;
	if (n === 1) return a[0];

	// choosePivot via the supplied method. By using a lambda
	// we are able to swap out pivot methods and perform checks
	// on the number of comparisons made.
	let j = choosePivot(a, l, r);

	// swap pivot for partition function
	swap(a, l, j);

	// perform partitioning and return index
	partition(a, l, r);

	if (j == i) {
		return a[j];
	} else if (j > i) {
		return rselectRecursive(a, i, l, j - 1, choosePivot);
	} else {
		return rselectRecursive(a, i, j + 1, r, choosePivot);
	}
}

/**
 * Chooses the left most index value as a pivot. This can
 * result in worst case performance of O(n^2).
 * @param {number[]} a
 * @param {number} l
 */
function choosePivotLeft(a, l) {
	return l;
}

/**
 * Choose the right most index valuue as a pivot. This can
 * result in a worst case performance of O(n^n)
 * @param {number[]} a
 * @param {number} l
 * @param {number} r
 */
function choosePivotRight(a, l, r) {
	return r;
}

/**
 * Chooses a pivot at random between the left and right
 * values of the array.
 * @param {number[]} a
 * @param {number} l
 * @param {number} r
 */
function choosePivotRandom(a, l, r) {
	return Math.trunc(Math.random() * (r - l + 1)) + l;
}

/**
 * Performs in place partitioning. The assumption is that element 0
 * is the partition value (which was performed in a prior step).
 *
 * This function maintains the invariant after execution that:
 *   1. the pivot index has the correct value
 *   2. all indices below the pivot index have a lower value
 *   3. all indices above the pivot index have a higher value
 *
 * We use two counters, i and j, to perform the traversal.
 *
 * Counter i maintains the border between the lower and upper values
 * surrounding the pivot. Specifically, it is the first value above
 * the pivot.
 *
 * Counter j is our cursor for the current comparison. It increments
 * until there are no more values to compare.
 *
 * When the jth value is less than the pivot, we swap the ith
 * and jth values. This puts the lower value at the front of the
 * higher values section. As a result, we increment i to maintain
 * the correct delineation of lower and higher values.
 *
 * When all is said and done, we swap position 1 with the last "lower"
 * value (i -1) so that the pivot is in the correct position.
 *
 * @param {number[]} a values
 * @param {number} l left most index
 * @param {number} r right most index
 * @returns {number} index of the the pivot
 */
function partition(a, l, r) {
	let p = a[l];
	let i = l + 1;
	for (let j = l + 1; j <= r; j++) {
		if (a[j] < p) {
			swap(a, i, j);
			i += 1;
		}
	}
	swap(a, l, i - 1);
	return i - 1;
}

/**
 * Swaps values in-place
 * @param {number[]} a
 * @param {number} i
 * @param {number} j
 */
function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}
