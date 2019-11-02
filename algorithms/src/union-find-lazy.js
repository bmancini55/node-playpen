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
		this.sizes = [];

		for (let i = 0; i < n; i++) {
			this.ids[i] = i;
			this.sizes[i] = 1;
		}
	}

	/**
	 * This technique traverses the links to find the
	 * Because the tree is not balanced, this could in theory
	 * have a worst case run time of O(n).
	 * @param {*} index
	 */
	find(index) {
		let curIdx = index;
		let curId = this.ids[index];

		while (curId !== curIdx) {
			curIdx = curId;
			curId = this.ids[curIdx];
		}

		return curId;
	}

	/**
	 * This technique runs in O(n) because it uses find and
	 * find is not optimized.
	 * @param {number} a
	 * @param {number} b
	 */

	union(a, b) {
		let aIdx = this.find(a);
		let bIdx = this.find(b);

		// relink b into a;
		this.ids[bIdx] = aIdx;
	}
}

module.exports = {
	UnionFind,
};
