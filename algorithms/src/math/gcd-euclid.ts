/**
 * Euclids algorithm for finding the greatest common divisor
 * of two integers. This algorithm is 3 steps as defined in 1.1
 * Knuth's Fundamental Algorithms:
 *
 * E1. [Find remainder]: Divide `m` by `n` and let `r` be the remainder
 * E2. [Is it zero]: If r=0, terminate with `n` as the answer.
 * E3. [Reduce]: Set m<-n, n<-r and go back to E1.
 *
 * @param m
 * @param n
 */
export function gcd(m: number, n: number) {
	for (;;) {
		let r = m % n;
		if (r === 0) return n;
		m = n;
		n = r;
	}
}
