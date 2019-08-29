const { insert, extract } = require('./heap-core');

class MaxHeap {
	/**
	 * Max-Heap supports extractMin and findMin operations for
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
		insert(this._data, val, false);
	}

	/**
	 * Extracts the max value in O(log n) time
	 * @returns {number}
	 */
	extractMax() {
		return extract(this._data, false);
	}

	/**
	 * Finds the max value in runtime O(1).
	 * @returns {number}
	 */
	findMax() {
		return this._data[0];
	}
}

module.exports.MaxHeap = MaxHeap;
