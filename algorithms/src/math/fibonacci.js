const bint = require('bignumber.js');
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

/**
 *
 * @param {BigNumber} n
 */
function fib_fast(n) {}

// let zero = bint(0);
// let one = bint(1);
// let two = bint(2);

// let vals = new Map([['0', zero], ['1', one], ['2', two]]);

// function fib(n) {
// 	let v = vals.get(n.toString());
// 	if (v) return v;

// 	let k1, k2;

// 	if (n.mod(2).eq(zero)) {
// 		k1 = n.div(two);
// 		k2 = k1.plus(one);
// 	} else {
// 		k1 = n.minus(one).div(two);
// 		k2 = k1.plus(one);
// 	}

// 	let v1 = vals.get(k1.toString()) || fib(k1);
// 	let v2 = vals.get(k2.toString()) || fib(k2);

// 	if (n.mod(2).eq(zero)) v = v1.times(two.times(v2).minus(v1));
// 	if (n.mod(2).eq(one)) v = v2.times(v2).plus(v1.times(v1));

// 	vals.set(n.toString(), v);
// 	return v;
// }

// console.time();
// console.log(fib(bint(1000000)).toString());
// console.timeEnd();

let vals = new Map([
	[-2n, -1n],
	[-1n, 1n],
	[0n, 0n],
	[1n, 1n],
	[2n, 1n]
]); // prettier-ignore

function fib(n) {
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

	let v1 = vals.get(k1) || fib(k1);
	let v2 = vals.get(k2) || fib(k2);

	if (n % 2n == 0n) v = v1 * (2n * v2 - v1);
	else v = v2 * v2 + v1 * v1;

	vals.set(n, v);
	return v;
}

for (let i = 0; i < 10; i++) {
	console.log(i, fib(BigInt(i)).toString());
}

for (let i = 0; i > -10; i--) {
	console.log(i, fib(BigInt(i)).toString());
}

// console.time();
// console.log(fib(2000000n).toString());
// console.timeEnd();

// f(n+2) = f(n+1) + f(n)

// -9 34
// -8 -21
// -7 13
// -6 -8
// -5 5
// -4 -3
// -3 2
// -2 -1
// -1 1
//  0 0
//  1 1
//  2 1
//  3 2
//  4 3
//  5 5
//  6 8
