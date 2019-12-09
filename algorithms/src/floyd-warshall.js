module.exports = {
	floydWarshall,
};

/**
 * Floyd-Warshall dynamic programming aglorithm solves the All-Pairs Shorts Path problem.
 *
 * This algorithm takes space complexity of O(n^3) and time complexity of O().
 *
 * The input for this function is an a directed graph represented as an adjacency matrix
 * It is constructred with the minimum weight edge between the two verties u,v.
 * @param {number[][]} g
 */
function floydWarshall(g) {
	let n = g.length;

	// create and initialize 3-d array with size equal to num edges
	let a = new Array(n);
	for (let i = 0; i < n; i++) {
		a[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			a[i][j] = new Array(n + 1);
		}
	}

	// initialize a and set base cases
	for (let i = 0; i < g.length; i++) {
		for (let j = 0; j < g[i].length; j++) {
			let val;
			if (i === j) val = 0;
			else if (g[i][j] !== undefined) val = g[i][j];
			else val = Number.POSITIVE_INFINITY;
			a[i][j][0] = val;
		}
	}

	// run dp algorithm
	for (let k = 1; k < n + 1; k++) {
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				let ki = k - 1;
				a[i][j][k] = Math.min(
					a[i][j][k - 1],
					a[i][ki][k - 1] + a[ki][j][k - 1]
				);
			}
		}
	}

	// console.log(a);

	// detect cycle
	for (let i = 0; i < n; i++) {
		if (a[i][i][n] < 0) return;
	}

	// construct result of last k value for each [i,j]
	let result = new Array(n);
	for (let i = 0; i < n; i++) {
		result[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			result[i][j] = a[i][j][n]; // last value
		}
	}

	return result;
}
