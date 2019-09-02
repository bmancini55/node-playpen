// @ts-check

const { Bst } = require('./bst');

class BstMedian {
	constructor() {
		this.low = new Bst();
		this.high = new Bst();
	}

	/**
	 * Gets the size
	 * @type {number}
	 */
	get size() {
		return this.low.size + this.high.size;
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
		median(this.low, this.high, val);
	}

	/**
	 * Finds the median value in constant runtime O(1).
	 * @returns {number}
	 */
	findMedian() {
		return this.low.findMax();
	}
}

module.exports.BstMedian = BstMedian;

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
 * @param {Bst} low heap with low values
 * @param {Bst} high heap with high values
 * @param {number} val value to insert
 */
function median(low, high, val) {
	// insert into the low number heap if there are no values yet
	// or if the current value is lower than the max value in
	// the low number heap.
	if (!low.findMax() || val < low.findMax()) {
		low.insert(val);
	}
	// inserts into the high number value heap if the value is
	// greater than the max value in the low number heap
	else {
		high.insert(val);
	}

	// rebalance the max value into the high heap if it
	// has more than 1 value in it
	if (low.size > high.size + 1) {
		let val = low.extractMax();
		high.insert(val);
	}

	// rebalance the min value into the low heap if its
	// size is larger than the low heap.
	if (high.size > low.size) {
		let val = high.extractMin();
		low.insert(val);
	}
}
