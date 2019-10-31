module.exports = {
	hammingDistance,
	hammingWeight,
};

/**
 * Calculates the binary Hamming Distance from two numbers.
 * This value is the number of bits different between two numbers.
 * For example:
 * 	1101 and 1100 => 1
 *  1110 and 1101 => 2
 *
 * This procedure only works for numbers < 2^32-1.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function hammingDistance(a, b) {
	let diff = a ^ b;
	return hammingWeight(diff);
}

/**
 * Calculates the binary Hamming Weight from a single number.
 * This value is the number of bits that are turned "on".
 * For example: 0110100001 has 4 bits set.
 *
 * This procedure only works for numbers < 2^32-1.
 * @param {number} a
 * @param {number}
 */
function hammingWeight(a) {
	let w = 0;
	while (a > 0) {
		if (a & 1) w++;
		a = a >> 1;
	}
	return w;
}
