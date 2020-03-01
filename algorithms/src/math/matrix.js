const bint = require('bignumber.js');

module.exports = {
	identity,
	scalar,
	dot,
	exp,
};

/**
 * Performs an in-place scalar multiplication on a matrix.
 * @param {BigNumber[][]} a
 * @param {BigNumber} s
 */
function scalar(a, s) {
	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < a[i].length; j++) {
			a[i][j] = a[i][j].times(s);
		}
	}
	return a;
}

/**
 * Performs a shitty and naive dot-product multiplication of two matrices.
 * MxN * NxP -> MxP
 * @param {BigNumber[][]} a
 * @param {BigNumber[][]} b
 */
function dot(a, b) {
	if (a[0].length !== b.length) throw new Error('Invalid matrices');

	let m = a.length;
	let n = b.length;
	let p = b[0].length;

	let result = new Array(m);
	for (let i = 0; i < m; i++) {
		result[i] = new Array(p);
		for (let j = 0; j < p; j++) {
			result[i][j] = bint(0);
			for (let k = 0; k < n; k++) {
				result[i][j] = result[i][j].plus(a[i][k].times(b[k][j]));
			}
		}
	}

	return result;
}

function identity(m) {
	let n = Math.max(m.length, m[0].length);
	let r = new Array(n);
	for (let i = 0; i < n; i++) {
		r[i] = new Array(n);
		for (let j = 0; j < n; j++) {
			r[i][j] = i == j ? bint(1) : bint(0);
		}
	}
	return r;
}

function exp(m, n) {
	// if (n.lt(0)) return exp(1 / x, -n); >>> need to figure this out...
	// console.log(n.toString());
	if (n.eq(0)) return identity(m);
	if (n.eq(1)) return m;
	if (n.mod(2).eq(0)) return exp(dot(m, m), n.div(2));
	if (n.mod(2).eq(1)) return dot(m, exp(dot(m, m), n.minus(1).div(2)));
}
