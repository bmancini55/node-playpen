const { MinHeap } = require('./heap-min');
const { MaxHeap } = require('./heap-max');

class MedianHeap {
	constructor() {
		this.hl = new MaxHeap();
		this.hh = new MinHeap();
	}

	/**
	 * Gets the size both heaps
	 * @type {number}
	 */
	get size() {
		return this.hl.size + this.hh.size;
	}

	/**
	 * Inserts a value into the median heap and maintains
	 * the invariant that the median is always the tip of
	 * the lower-half of values.
	 *
	 * This has runtime of O(log n).
	 * @param {number} val
	 */
	insert(val) {
		median(this.hl, this.hh, val);
	}

	/**
	 * Finds the median value in constant runtime O(1).
	 * @returns {number}
	 */
	findMedian() {
		return this.hl.findMax();
	}
}

module.exports.MedianHeap = MedianHeap;

/**
 * Function maintaines the median for a stream of numbers.
 * The median is maintained via two heaps that retain the
 * property that the size of the heaps are ~i/2. In particular
 * this heap maintains the invariant that the median is the
 * max value in the low number heap.
 *
 * For example, the low heap can at most have 1 more value
 * than the high heap.
 *
 * This function operates in runtime O(log n).
 *
 * @param {MaxHeap} hl heap with low values
 * @param {MinHeap} hh heap with high values
 * @param {number} val value to insert
 */
function median(hl, hh, val) {
	// insert into the low number heap if there are no values yet
	// or if the current value is lower than the max value in
	// the low number heap.
	if (!hl.findMax() || val < hl.findMax()) {
		hl.insert(val);
	}
	// inserts into the high number value heap if the value is
	// greater than the max value in the low number heap
	else {
		hh.insert(val);
	}

	// rebalance the max value into the high heap if it
	// has more than 1 value in it
	if (hl.size > hh.size + 1) {
		let val = hl.extractMax();
		hh.insert(val);
	}

	// rebalance the min value into the low heap if its
	// size is larger than the low heap.
	if (hh.size > hl.size) {
		let val = hh.extractMin();
		hl.insert(val);
	}
}
