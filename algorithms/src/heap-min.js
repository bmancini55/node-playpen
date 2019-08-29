const { insert, extract } = require('./heap-core');

class MinHeap {
	/**
	 * Min-Heap supports extractMin and findMin operations for
	 * returning the minimum value efficiently.
	 */
	constructor() {
		this._data = [];
	}

	/**
	 * The size of the heap
	 * @type {number}
	 */
	get size() {
		return this._data.length;
	}

	/**
	 * Inserts a value in runtime O(log n)
	 * @param {number} val
	 */
	insert(val) {
		insert(this._data, val, true);
	}

	/**
	 * Extracts the min value in O(log n) time
	 * @returns {number}
	 */
	extractMin() {
		return extract(this._data, true);
	}

	/**
	 * Finds the min value in runtime O(1).
	 * @returns {number}
	 */
	findMin() {
		return this._data[0];
	}
}

module.exports.MinHeap = MinHeap;
