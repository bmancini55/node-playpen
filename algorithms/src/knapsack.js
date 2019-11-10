module.exports = {
	knapsack: knapsackOptimized,
	knapsackNaive,
	knapsackOptimized,
	knapsackRecursive,
};

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

function knapsackRecursive(items, maxSize) {
	let vals = new Array(items.length + 1);
	for (let i = 0; i < vals.length; i++) {
		vals[i] = new Array(maxSize + 1);
	}

	let calc = (i, s) => {
		if (i === 0 || s <= 0) return 0;

		let vi = items[i - 1][0]; // value of i
		let si = items[i - 1][1]; // size of i

		if (vals[i - 1][s] === undefined) {
			vals[i - 1][s] = calc(i - 1, s);
		}

		if (si > s) vals[i][s] = vals[i - 1][s];
		else {
			if (vals[i - 1][s - si] === undefined) {
				vals[i - 1][s - si] = calc(i - 1, s - si);
			}
			vals[i][s] = Math.max(vals[i - 1][s], vals[i - 1][s - si] + vi);
		}

		// console.log(i, s, vi, items[i], vals[i]);
		return vals[i][s];
	};

	return calc(items.length, maxSize);
}
