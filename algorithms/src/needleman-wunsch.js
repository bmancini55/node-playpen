module.exports = {
	needlemanWunsch,
};

/**
 * Calculates the needlemanWunsch score that determines the number
 * of gaps and mismatches in the optimal position.
 * @param {string} a
 * @param {string} b
 * @param {number} gapPenalty
 * @param {number} mismatchPenalty
 */
function needlemanWunsch(a, b, gapPenalty, mismatchPenalty) {
	let v = new Array(a.length + 1);

	// j is blank, apply gap penalty for each character of i
	for (let i = 0; i < v.length; i++) {
		v[i] = new Array(b.length + 1);
		v[i][0] = i * gapPenalty;
	}

	// i is blank, apply gap penalty for each character of j
	for (let j = 0; j < v[0].length; j++) {
		v[0][j] = j * gapPenalty;
	}

	// iterate both i and j and solve for the recursion
	for (let i = 1; i < v.length; i++) {
		for (let j = 1; j < v[0].length; j++) {
			v[i][j] = Math.min(
				v[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : mismatchPenalty),
				v[i - 1][j] + gapPenalty,
				v[i][j - 1] + gapPenalty
			);
		}
	}
	// console.log(v);
	return v[a.length][b.length];
}
