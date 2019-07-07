let x = '32';
let y = '97';

// let x = '4598';
// let y = '9837';

// let x = '45989426';
// let y = '98378016';

// let x = '3141592653589793238462643383279502884197169399375105820974944592';
// let y = '2718281828459045235360287471352662497757247093699959574966967627';

console.log(mult(x, y));
// console.log(add(x, y));

/**
 * Implements recursive multiplication algorithm by breaking strings
 * of integers in half to represent a + b and c + d. For example:
 * 4598 becomes a = 45 and b = 98.
 *
 * The algorithm for multiplication then becomes:
 * 10^n ac + 10^n/2 (ad + bc) + bd
 *
 * @param {string} x
 * @param {string} y
 * @returns {string}
 */
function mult(x, y) {
	// This algorithm only supports equal length powers of 2.
	if (x.length !== y.length) {
		throw new Error('Only supports equal lenght values');
	}

	let n = x.length;

	// end condition is single digit
	if (n === 1) {
		let a = parseInt(x[0]);
		let b = parseInt(y[0]);
		return (a * b).toString();
	}

	// split x into equal parts
	let a = x.substr(0, n / 2);
	let b = x.substr(n / 2);

	// split y into equal parts
	let c = y.substr(0, n / 2);
	let d = y.substr(n / 2);

	// recurisvely multiply
	let ac = mult(a, c);
	let ad = mult(a, d);
	let bc = mult(b, c);
	let bd = mult(b, d);

	// multipy by 10's by padding appropriate zeros
	let ac2 = ac + ''.padStart(n, '0');
	let ad2 = ad + ''.padStart(n / 2, '0');
	let bc2 = bc + ''.padStart(n / 2, '0');

	// add all remaining terms
	return add(add(add(ac2, ad2), bc2), bd);
}

/**
 * Implements string based large number school-algorithm addition
 * @param {string} x
 * @param {string} y
 */
function add(x, y) {
	let result = '';

	// ensure y is always larger
	if (x.length > y.length) {
		let t = x;
		x = y;
		y = t;
	}

	// reverse values so we can work on least significant digits first
	x = reverse(x);
	y = reverse(y);

	let carry = 0;

	// from least significant digit to most
	for (let i = 0; i < x.length; i++) {
		let a = parseInt(x[i]);
		let b = parseInt(y[i]);
		let sum = a + b + carry;

		// extract single digit and prepend
		result += (sum % 10).toString();

		// extract carry
		carry = Math.trunc(sum / 10);
	}

	// prepend remaining y digits
	for (let i = x.length; i < y.length; i++) {
		let a = parseInt(y[i]);
		let sum = a + carry;

		// extract single digit and prepend
		result += (sum % 10).toString();

		// extract carry
		carry = Math.trunc(sum / 10);
	}

	// prepend carry if one still exists
	if (carry) result += carry.toString();

	// reverse final value
	return reverse(result);
}

/**
 * Reverses a string
 * @param {string} x
 */
function reverse(x) {
	return x
		.split('')
		.reverse()
		.join('');
}
