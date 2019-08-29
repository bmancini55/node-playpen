module.exports.insert = insert;
module.exports.extract = extract;

/**
 * Insert a value into the heap in a manner that maintains the
 * heap invariant. Operation occurs in runtime O(log n).
 *
 * @param {[]number} a array representing the heap
 * @param {number} val value
 * @param {bool} min indicates if this is a min or max heap
 */
function insert(a, val, min) {
	// push onto end of array
	a.push(val);

	// bubble up min/max value to maintain the heap proeprty
	let i = a.length - 1;
	bubbleUp(a, i, min);
}

/**
 * Recursively bubbles up the specified index conditionally
 * This operation has an O(log n) runtime.
 *
 * @param {[]number} a array representing the heap
 * @param {number} i index
 * @param {bool} min indicates if this is a min or max heap
 */
function bubbleUp(a, i, min) {
	// find the parent index which for i1 = 0 and i2 = 0, i3 = 1, i4 = 1
	let parent = Math.floor((i - 1) / 2); // i1 = 0, i2 = 0

	// determine if a swap is required and take into consideration
	// the desired direction of the swap
	let doSwap = min ? a[i] < a[parent] : a[i] > a[parent];

	// stop if heap property is ok
	if (!doSwap) return;

	// swap parent and child to resolve heap property
	swap(a, i, parent);

	// continue to bubble if not at the top
	if (parent > 0) bubbleUp(a, parent, min);
}

/**
 * Extracts the min/max value while maintaining the heap property
 * in runtime of O(log n).
 *
 * @param {[]number} a the heap represented by an array
 * @param {bool} min indicates if this is a min or max heap
 * @returns {number} the min/max value in the heap
 */
function extract(a, min) {
	// extract min value for result
	let result = a[0];

	// swap last node into root
	a[0] = a.pop();

	// recursively bubble down values from the root
	bubbleDown(a, 0, min);

	// return min value
	return result;
}

/**
 * Recursively bubbles the index value downward to maintain the heap property.
 * This operations executes with runtime O(log n).
 *
 * In a min heap, if the current index is already smaller than its children,
 * no operation is required. If is larger then its children then it swaps
 * positions with the smallest child.
 *
 * In a max heap, if the current index is already larger than its children,
 * no operation is required. If is smaller then its children then it swaps
 * positions with the largest child.
 *
 * @param {[]number} a heap represented by an array
 * @param {number} i index to operate on
 * @param {bool} min indicates if this is a min or max heap
 */
function bubbleDown(a, i, min) {
	// get the left and right children
	// for instance
	//	i0 has children 1,2
	// 	i1 has children 3,4
	let left = i * 2 + 1;
	let right = i * 2 + 2;

	// determine the min/max value that should be swapped
	let best = i;

	// min-heap looks for the smallest child
	if (min) {
		if (left < a.length && a[left] < a[best]) {
			best = left;
		}

		if (right < a.length && a[right] < a[best]) {
			best = right;
		}
	}

	// max-heap looks for the largest child
	if (!min) {
		if (left < a.length && a[left] > a[best]) {
			best = left;
		}

		if (right < a.length && a[right] > a[best]) {
			best = right;
		}
	}

	// swap and recursively bubble down
	// if the best value is not the current value
	if (best !== i) {
		swap(a, i, best);
		bubbleDown(a, best, min);
	}
}

/**
 * Swap the two index positions in place
 *
 * @param {[]number} a
 * @param {number} i
 * @param {number} j
 */
function swap(a, i, j) {
	let t = a[i];
	a[i] = a[j];
	a[j] = t;
}
