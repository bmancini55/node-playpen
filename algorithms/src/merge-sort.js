exports.mergeSort = mergeSort;

/**
 * Merge sort will split the array recursively and then
 * merge the sorted results back together. It is a canonical example
 * of a divide and conquer algorithm.
 *
 * @param {Array<number>} arr
 */
function mergeSort(arr) {
	// single element array is already sorted!
	if (arr.length <= 1) {
		return arr.slice();
	}

	// left half
	let a = mergeSort(arr.slice(0, arr.length / 2));

	// right half
	let b = mergeSort(arr.slice(arr.length / 2));

	// merge halves
	return merge(a, b);
}

function merge(a, b) {
	// create result array of merged size
	let result = new Array(a.length + b.length);
	let i = 0;
	let j = 0;

	// check which array has the next lowest value
	for (let k = 0; k < result.length; k++) {
		if (!b[j] || a[i] <= b[j]) {
			result[k] = a[i];
			i++;
		} else if (!a[i] || b[j] < a[i]) {
			result[k] = b[j];
			j++;
		}
	}
	return result;
}
