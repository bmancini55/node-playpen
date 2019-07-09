exports.countInvs = sortAndCountInv;

/**
 * This method will sort and count the number of inversions in
 * an array. Inversions are numbers that are out of order. For example
 * 3,1,2 would have 2 inversions (3,1) and (3,2).
 *
 * This algorithm runs in nlog(n) time complexity and is example of a
 * divide and conquer algorithm.
 *
 * The time complexity is a result of the split that provides log(n)
 * run time. Once the array is split and sorted it can be merged.
 *
 * The merge operation performs the sorting and counting by noting
 * that any value in the right array that is less than the left array
 * can use simple math by determining to determine how many inversions
 * there are.
 *
 * @param {number[]} a
 * @returns {[number[], number]}
 */
function sortAndCountInv(a) {
	let n = a.length;

	// end condition when n = 1
	if (n <= 1) {
		return [a, 0];
	}

	// split in half
	let [b, x] = sortAndCountInv(a.slice(0, n / 2));
	let [c, y] = sortAndCountInv(a.slice(n / 2));

	// merge results
	let [d, z] = mergeAndCountSplitInv(b, c);

	// reutrn results
	return [d, x + y + z];
}

/**
 * Merges and counts the inversions
 *
 * @param {number[]} b
 * @param {number[]} c
 * @returns {[number[], number]}
 */
function mergeAndCountSplitInv(b, c) {
	// create results array
	let d = new Array(b.length + c.length);
	let i = 0;
	let j = 0;
	let z = 0;

	// iterate each array until we have merged
	// all values together. Left array values are boring
	// since they won't have any inversions. Right values
	// may have inversions. The number of inversions is hte
	// remaining items in the left array.
	for (let k = 0; k < d.length; k++) {
		if (!c[j] || b[i] < c[j]) {
			d[k] = b[i];
			i++;
		} else if (!b[i] || c[j] < b[i]) {
			d[k] = c[j];
			j++;
			// The remaining values in the left array
			// is the number of inversions
			z += b.length - i;
		}
	}
	return [d, z];
}
