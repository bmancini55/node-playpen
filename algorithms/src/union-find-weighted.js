class UnionFind {
	/**
	 * Creates a UnionFind data structure that is links based on weight to
	 * reduce the size of the tree. This version of UnionFind intializes for an array.
	 * The consumer must have indexed all values outside of the UnionFind data structure.
	 *
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
	 * have a worst case run time of O(log N).
	 * @param {*} i
	 */
	find(i) {
		while (i !== this.ids[i]) {
			i = this.ids[i];
		}
		return i;
	}

	/**
	 * This technique runs in O(log n) by merging the smaller
	 * graph into the root of the larger graph.
	 * @param {number} a
	 * @param {number} b
	 */
	union(a, b) {
		let i = this.find(a);
		let j = this.find(b);

		if (this.sizes[i] < this.sizes[j]) {
			this.ids[i] = j;
			this.sizes[j] += this.sizes[i];
		} else {
			this.ids[j] = i;
			this.sizes[i] += this.sizes[j];
		}
	}
}

module.exports = {
	UnionFind,
};
