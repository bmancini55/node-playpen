export const lsb = (num: number) => num & -num;

/**
 * Implements a one-based Fenwick Tree (Binary Indexed Tree)
 * that does range additions and point queries. This is inverted
 * from a standard point/range BIT and stores the prefix sum
 * of ranges for each point.
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
	 * Adds values to the range
	 * @param l
	 * @param r
	 * @param delta
	 */
	public addRange(l: number, r: number, delta: number = 1) {
		this._add(l, delta);
		this._add(r + 1, -delta);
	}

	/**
	 * Returns the
	 * @param i
	 */
	public pointQuery(i: number) {
		let sum = 0;
		for (; i > 0; i -= lsb(i)) {
			sum += this.tree[i];
		}
		return sum;
	}

	/**
	 * Performs a point addition for a single value. This
	 * impacts all upstream cumulative values.
	 * @param i value to set
	 * @param delta amount to add to the point
	 */
	private _add(i: number, delta: number = 1) {
		for (; i <= this.n; i += lsb(i)) {
			this.tree[i] += delta;
		}
	}
}

export function updatePoint(tree: number[], num: number) {}
