const BigNumber = require('bignumber.js');

module.exports = {
	expBySquaring,
};

/**
 * Performs expoentiation via squaring using a
 * recursive algorithm.
 * @param {BigNumber} x number to raise to an exponent
 * @param {BigNumber} n exponent to raise to
 * @returns {BigNumber}
 */
function expBySquaring(x, n) {
	if (n.lt(0)) return expBySquaring(1 / x, -n);
	if (n.eq(0)) return new BigNumber(1);
	if (n.eq(1)) return x;
	if (n.mod(2).eq(0)) return expBySquaring(x.times(x), n.div(2));
	if (n.mod(2).eq(1))
		return x.times(expBySquaring(x.times(x), n.minus(1).div(2)));
}
