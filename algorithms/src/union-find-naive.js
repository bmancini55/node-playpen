class UnionFind {
	/**
	 * Naive implementation of Union-Find that will perform
	 * a union on on two sets by merging them arbitrarily. Initialized
	 * with each value in its own set. This implementation
	 * simply uses a Map as the mechanism under the covers.
	 *
	 * One limitation of this implentation is that it uses a
	 * hash table for key lookup. This means there cannot be
	 * duplicates on input.
	 * @param {number[]} values
	 */
	constructor(values) {
		this.lookup = new Map();
		for (let value of values) {
			this.lookup.set(value, value);
		}
	}

	/**
	 * Finds the set that the value belongs to in O(1).
	 * @param {number} value
	 */
	find(value) {
		return this.lookup.get(value);
	}

	/**
	 * Merges the two sets for A and B by iterating all
	 * entries and merging anything in B to A. This operates in O(n).
	 * @param {number} a
	 * @param {number} b
	 */
	union(a, b) {
		for (let [k, v] of this.lookup.entries()) {
			if (v === b) this.lookup.set(k, a);
		}
	}
}

module.exports = {
	UnionFind,
};
