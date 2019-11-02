class UnionFind {
	/**
	 * Creates a UnionFind data structure that is lazy about linking.
	 * This version of UnionFind intializes for an array. The consumer
	 * must have indexed all values outside of the UnionFind data structure.
	 *
	 * In particular this algorithm only links the two found items to each other.
	 * Functionally, this creates a binary search tree (that is not balanced).
	 * @param {number} number
	 */
	constructor(n) {
		this.ids = [];

		for (let i = 0; i < n; i++) {
			this.ids[i] = i;
		}
	}

	/**
	 * This technique traverses the links to find the
	 * Because the tree is not balanced, this could in theory
	 * have a worst case run time of O(n).
	 * @param {*} index
	 */
	find(index) {
		while (index !== this.ids[index]) {
			index = this.ids[index];
		}
		return index;
	}

	/**
	 * This technique runs in O(n) because it uses find and
	 * find is not optimized.
	 * @param {number} a
	 * @param {number} b
	 */
	union(a, b) {
		let i = this.find(a);
		let j = this.find(b);
		this.ids[j] = i;
	}
}

module.exports = {
	UnionFind,
};
