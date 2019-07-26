exports.quickSort = quickSort;
exports.choosePivotLeft = choosePivotLeft;
exports.choosePivotRight = choosePivotRight;
exports.choosePivotMedian = choosePivotMedian;

/**
 * QuickSort performs the quick sort divide and conquer algorithm
 * which has a worst case of n^2 and a best case of n log n. The
 * best case is achieved when the pivot equally splits the array
 * in half.
 *
 * The run time is dominated by the number of comparisons that
 * are made in the array. The number of comparisons is impacted
 * by the choice of pivot. A poorly chosen pivot is one that
 * does not divide the remaining array equally.
 *
 * The best case is when the median is chosen, which can be done
 * in O(n). However, randomized pivot selection achieves a probability
 * similar to that of median selection but in O(1).
 * @param {number[]} a
 * @param {(a: number[], l: number, r: number) => number} choosePivot
 * @returns {[number[], number]}
 */
function quickSort(a, choosePivot = choosePivotMedian) {
	let debug = { comparisons: 0 };
	let l = 0;
	let r = a.length - 1;
	quickSortRecurse(a, l, r, choosePivot, debug);
	return [a, debug.comparisons];
}

/**
 * Recursive call to quick sort algorithm. This does the actual
 * work and the above function does the setup to start the recursion.
 * @param {number[]} a values
 * @param {number} l left most index of sub-problem
 * @param {number} r right most index of sub-problem
 * @param {*} debug
 */
function quickSortRecurse(a, l, r, choosePivot, debug) {
	// end condition when l and r are equal
	if (l >= r) return;

	// calculate the number of comparisons as the number of length
	// of the input array
	debug.comparisons += r - l;

	// choosePivot via the supplied method. By using a lambda
	// we are able to swap out pivot methods and perform checks
	// on the number of comparisons made.
	let i = choosePivot(a, l, r);

	swap(a, l, i);

	let j = partition(a, l, r);

	quickSortRecurse(a, l, j - 1, choosePivot, debug);
	quickSortRecurse(a, j + 1, r, choosePivot, debug);
	return a;
}

/**
 * Naively chooses the left most element in the pivot. This
 * pivot will perform worst O(n) when the array is already
 * sorted.
 * @param {number[]} a
 * @param {number} l
 */
function choosePivotLeft(a, l) {
	return l; // first element
}

/**
 * Naively chooses the right most element in the pivot. This
 * pivot will perform worst O(n) when the array is sorted
 * in descending order.
 * @param {number[]} a
 * @param {number} l
 * @param {number} r
 */
function choosePivotRight(a, l, r) {
	return r; // right element
}

/**
 * Chooses a pivot based on an approximate medium by taking
 * the middle value of first, last, and middle.
 * @param {number[]} a
 * @param {number} l
 * @param {number} r
 */
function choosePivotMedian(a, l, r) {
	let m = l + Math.floor((r - l) / 2);
	let al = a[l];
	let am = a[m];
	let ar = a[r];
	if ((am <= al && al <= ar) || (ar <= al && al <= am)) return l;
	if ((al <= am && am <= ar) || (ar <= am && am <= al)) return m;
	if ((al <= ar && ar <= am) || (am <= ar && ar <= al)) return r;
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
 * @param {nunmber[]} a
 * @param {number} i
 * @param {number} j
 */
function swap(a, i, j) {
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}
