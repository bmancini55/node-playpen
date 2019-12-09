module.exports = {
	bellmanFord,
};

/**
 *
 * @param {number[][]} g
 */
function bellmanFord(g, s) {
	let n = g.length;

	// construct a 2-d array
	let a = new Array(n);

	// base case i=0, when v=s, value is 0 all vertices are +Infinity
	a[0] = new Array(n);
	for (let v = 0; v < n; v++) {
		a[0][v] = v === s ? 0 : Number.POSITIVE_INFINITY;
	}

	for (let i = 1; i < n; i++) {
		a[i] = new Array(n);
		for (let v = 0; v < n; v++) {
			// check shit
			let min = Number.POSITIVE_INFINITY;
			for (let w = 0; w < n; w++) {
				let cwv = a[i - 1][w] + g[w][v];
				if (cwv < min) min = cwv;
			}
			// console.log('i', i, 'v', v, 'p', a[i - 1][v], 'w', min);
			a[i][v] = Math.min(
				a[i - 1][v],
				min,
			); // prettier-ignore
		}
	}

	return a[n - 1];
}
