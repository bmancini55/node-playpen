const bint = require('bignumber.js');
const matrix = require('./matrix');

module.exports = {
	fib_dp,
	fib_me,
};

/**
 * Fibonacci sequence generator using dynamic programming algorithm.
 * This algorithm takes advantage of the recurrence F(n) = F(n-2) + F(n-1).
 * Space complexity O(1)
 * Time complexity O(n)
 * @param {BigNumber} n
 * @returns {BigNumber}
 */
function fib_dp(n) {
	if (n < 1) return bint(0);
	let n2 = bint(0);
	let n1 = bint(1);
	let cur = bint(0);
	for (let i = 1; i < n; i++) {
		cur = n1.plus(n2);
		n2 = n1;
		n1 = cur;
	}
	return cur;
}

/**
 * Fibonacci sequence calculator using matrix exponentiation. This takes
 * advantage that the matrix [[1,1],[1, 0]]^n = [[F(n+1),F(n)],[F(n),F(n-1)]].
 * This must use exponentiation by squaring or it devolves into linear time
 * with slower constants than the DP algorithm.
 *
 * Space = O(1)
 * Time  = O(log n)
 * @param {BigNumber} n
 * @returns {BigNumber}
 */
function fib_me(n) {
	let z = [[bint(1), bint(1)], [bint(1), bint(0)]];

	let result = matrix.exp(z, n);
	return result[0][1];
}
