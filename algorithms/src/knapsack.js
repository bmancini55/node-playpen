module.exports = {
	knapsack,
};

function knapsack(items, maxSize) {
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

function safeGet(v, i, j) {
	if (v[i] == undefined || v[i][j] == undefined) return 0;
	return v[i][j];
}
