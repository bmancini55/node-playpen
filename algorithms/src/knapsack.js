module.exports = {
	knapsack: knapsackRecursive,
	knapsackNaive,
	knapsackOptimized,
	knapsackRecursive,
};

/**
 * Naive implementation that does a double loop with time and space complexity O(nm).
 *
 * @param {[number,number][]} items array of items with value, size pair
 * @param {number} maxSize total size of knapsack
 */
function knapsackNaive(items, maxSize) {
	const safeGet = (v, i, j) => {
		if (v[i] == undefined || v[i][j] == undefined) return 0;
		return v[i][j];
	};

	let v = new Array(items.length);

	// iterate all items
	for (let i = 0; i < items.length; i++) {
		v[i] = new Array(maxSize + 1);

		let vi = items[i][0]; // value of i
		let si = items[i][1]; // size of i

		for (let s = 0; s <= maxSize; s++) {
			if (si > s) {
				// case 1
				v[i][s] = safeGet(v, i - 1, s);
			} else {
				// case 2
				v[i][s] = Math.max(
					safeGet(v, i - 1, s), // case 1
					safeGet(v, i - 1, s - si) + vi // case 2
				);
			}
		}
	}
	return v[items.length - 1][maxSize];
}

/**
 * Improved implementation that does only requires O(n) space complexity but
 * O(nm) time complexity. This method swaps the arrays, v[i] and v[i-1] are the
 * only values that are needed so after v[i] is done being processed we can swap
 * it represent i-1 in the next subsequent lookup.
 *
 * @param {[number,number][]} items array of items with value, size pair
 * @param {number} maxSize total size of knapsack
 */
function knapsackOptimized(items, maxSize) {
	const safeGet = (v, s) => v[s] || 0;

	let vp = new Array(maxSize + 1);
	let v = new Array(maxSize + 1);

	// iterate all items
	for (let i = 0; i < items.length; i++) {
		let vi = items[i][0]; // value of i
		let si = items[i][1]; // size of i

		for (let s = 0; s <= maxSize; s++) {
			if (si > s) {
				// case 1
				v[s] = safeGet(vp, s);
			} else {
				// case 2
				v[s] = Math.max(
					safeGet(vp, s), // case 1
					safeGet(vp, s - si) + vi // case 2
				);
			}
		}
		let temp = vp;
		vp = v;
		v = temp;
	}
	return vp[maxSize];
}

/**
 * Recursively performs the knapsack search. In this case we use a map to store
 * the previously calculated values. This gives better space complexity than a 2D
 * array because the 2D array will be filled with many 0's. This gives better runtime
 * complexity because ignore processing any values below si < s.
 *
 * @param {[number,number][]} items array of items with value, size pair
 * @param {number} maxSize total size of knapsack
 */
function knapsackRecursive(items, maxSize) {
	let vals = new Map();
	let key = (i, j) => `${i}-${j}`;
	let valget = (i, j) => vals.get(key(i, j)) || 0;

	let calc = (i, s) => {
		// this gives us better space complexity because we
		// cut short processing and ignore storage of 0 values in
		// the map. This means that a huge portion of a standard 2D
		// array will not be used.
		if (i === 0 || s <= 0) return 0;

		let vi = items[i - 1][0]; // value of i
		let si = items[i - 1][1]; // size of i

		// Check if V(i-1, s) has a value, and if not, calculate it.
		if (!vals.has(key(i - 1, s))) {
			let val = calc(i - 1, s);
			if (val) vals.set(key(i - 1, s), val);
		}

		// If size of our item exceeds the max value, use the V(i-1,s)
		if (si > s) vals.set(key(i, s), valget(i - 1, s));
		else {
			// Otherwise, check if we need to get V(i-1,s-si)
			if (!vals.has(key(i - 1, s - si))) {
				let val = calc(i - 1, s - si);
				if (val) vals.set(key(i - 1, s - si), val);
			}
			// Set the value to the max of V(i-1,s) or V(i-1,s-si) + vi
			vals.set(
				key(i, s),
				Math.max(valget(i - 1, s), valget(i - 1, s - si) + vi)
			);
		}

		return valget(i, s);
	};

	return calc(items.length, maxSize);
}
