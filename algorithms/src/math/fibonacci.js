const matrix = require('./matrix');

module.exports = {
	fib_dp,
	fib_me,
	fib_fast,
};

/**
 * Fibonacci sequence generator using dynamic programming algorithm.
 * This algorithm takes advantage of the recurrence F(n) = F(n-2) + F(n-1).
 * Space complexity O(1)
 * Time complexity O(n)
 * @param {bigint} n
 * @returns {bigint}
 */
function fib_dp(n) {
	if (n < 1) return 0n;
	let n2 = 0n;
	let n1 = 1n;
	let cur = 0n;
	for (let i = 1; i < n; i++) {
		cur = n1 + n2;
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
 * @param {bigint} n
 * @returns {bigint}
 */
function fib_me(n) {
	let z = [[1n, 1n], [1n, 0n]];

	let result = matrix.exp(z, n);
	return result[0][1];
}

/**
 * Fast doubling algorithm is extracted from the matrix exponentiation algorithm.
 * It is essentially the me algo with the duplicate calculations removed. Therefore
 * we can use exponentiation by squaring in a more optimal way.
 *
 * This algorithm also works with negative values such as:
 * n=-9  34
 * n=-8 -21
 * n=-7  13
 * n=-6  -8
 * n=-5   5
 * n=-4  -3
 * n=-3   2
 * n=-2  -1
 * n=-1   1
 * n=0    0
 * n=1    1
 * n=2    1
 * n=3    2
 * n=4    3
 * n=5    5
 * n=6    8
 *
 * Space = O(1)
 * Time =  O(log n) with faster constants than the ME algo
 * @param {bigint} n
 */
function fib_fast(n) {
	const vals = new Map([
		[-2n, -1n],
		[-1n, 1n],
		[0n, 0n],
		[1n, 1n],
		[2n, 1n]
	]); // prettier-ignore

	let v = vals.get(n);
	if (v !== undefined) return v;

	let k1, k2;

	if (n % 2n === 0n) {
		k1 = n / 2n;
		k2 = k1 + 1n;
	} else {
		k1 = (n - 1n) / 2n;
		k2 = k1 + 1n;
	}

	let v1 = vals.get(k1) || fib_fast(k1);
	let v2 = vals.get(k2) || fib_fast(k2);

	if (n % 2n == 0n) v = v1 * (2n * v2 - v1);
	else v = v2 * v2 + v1 * v1;

	vals.set(n, v);
	return v;
}
