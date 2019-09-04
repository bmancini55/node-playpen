module.exports.search = search;
module.exports.searchr = searchr;
module.exports.lowerBound = lowerBound;
module.exports.upperBound = upperBound;

/**
 * Finds the index of the target value in the array. Returns -1
 * if the value is not found.
 *
 * @param {number[]} a sorted array
 * @param {number} l left index
 * @param {number} r right index
 * @param {number} x target value
 * @returns {number} the index of the value in the array
 */
function search(a, l, r, x) {
	while (l < r) {
		let mid = l + Math.floor((r - l) / 2);
		if (a[mid] === x) return mid;
		if (a[mid] > x) r = mid;
		if (a[mid] < x) l = mid + 1;
	}
	return -1;
}

/**
 * Recursively finds the index of the target value in the array. Returns -1
 * if the value is not found.
 *
 * @param {number[]} a sorted array
 * @param {number} l left index
 * @param {number} r right index
 * @param {number} x target value
 * @returns {number} the index of the value in the array
 */
function searchr(a, l, r, x) {
	if (l < r) {
		let mid = l + Math.floor((r - l) / 2);
		if (a[mid] === x) return mid;
		if (a[mid] > x) return searchr(a, l, mid, x);
		if (a[mid] < x) return searchr(a, mid + 1, r, x);
	}
	return -1;
}

/**
 * With a sorted array, returns the index of the first value
 * that is greather than or equal to the search value x.
 *
 * Returns 0 when entire array is above the value.
 * Returns -1 when value is above entire array.
 *
 * @param {number[]} a sorted array
 * @param {number} l left index
 * @param {number} r right index
 * @param {number} x target value
 * @returns {number} index of first value above the target
 */
function lowerBound(a, l, r, x) {
	// return -1 when x is above array
	if (x > a[a.length - 1]) return -1;

	// return first index when x is below array
	if (x < a[0]) return 0;

	while (l < r) {
		let mid = l + Math.floor((r - l) / 2);
		if (a[mid] === x) return mid;
		if (a[mid] < x) l = mid + 1;
		if (a[mid] > x) r = mid;
	}
	return l;
}

/**
 * With a sorted array, returns the index of the last value
 * that is less than or equal to the search value x.
 *
 * Returns -1 when entire array is above the value.
 * Returns last index when entire array is below the value.
 *
 * @param {number[]} a array of values
 * @param {number} l left index
 * @param {number} r right index
 * @param {number} x search value
 * @returns index of position <= x
 */
function upperBound(a, l, r, x) {
	// return - 1 when x is below array
	if (x < a[0]) return -1;

	// return last index when x is above array
	if (x > a[a.length - 1]) return a.length - 1;

	// shrink array until we find the value
	while (l < r) {
		let mid = l + Math.floor((r - l) / 2);
		if (a[mid] === x) return mid;
		if (a[mid] < x) l = mid + 1;
		if (a[mid] > x) r = mid;
	}
	return l - 1;
}
