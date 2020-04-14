export const lsb = (num: number) => num & -num;

/**
 * Implements a one-based Fenwick Tree (Binary Indexed Tree)
 * that does point additions and range queries. It perform
 * prefix sum where intervals are summed from 1-n. It can
 * also be used for range queries of l,r.
 *
 */
export class FenwickTree {
	public tree: number[];

	/**
	 * Size of the Fenwick Tree
	 */
	public n: number;

	constructor(n: number) {
		this.n = n;
		this.tree = new Array(n + 1).fill(0);
	}

	/**
	 * Adds point addition and increments the cumulative value
	 * for all upstream values
	 * @param i value to set
	 * @param delta amount to add to the point
	 */
	public add(i: number, delta: number = 1) {
		for (; i <= this.n; i += lsb(i)) {
			this.tree[i] += delta;
		}
	}

	/**
	 * Returns the sum of all values in the interval 1 to i
	 * @param i
	 */
	public prefixSum(i: number) {
		let sum = 0;
		for (; i > 0; i -= lsb(i)) {
			sum += this.tree[i];
		}
		return sum;
	}

	/**
	 * Returns the sum of values between the inclusive range l and r
	 * @param l
	 * @param r
	 */
	public sumRange(l: number, r: number) {
		return this.prefixSum(r) - this.prefixSum(l - 1);
	}
}
