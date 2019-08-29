class MinHeap {
	constructor() {
		this._data = [];
	}

	get size() {
		return this._data.length;
	}

	/**
	 * Inserts a value into the Heap in O(log n) time
	 * @param {number} val
	 */
	insert(val) {
		let a = this._data;
		a.push(val);
		let i = a.length - 1;
		bubbleUp(a, i);
	}

	/**
	 * Extracts the min value while maintaining the heap property
	 * in O(log n) time
	 * @returns {number}
	 */
	extractMin() {
		let a = this._data;

		// extract min value for result
		let min = a[0];

		// swap last node into root
		a[0] = a.pop();

		// recursively bubble down values
		bubbleDown(a, 0);

		// return min value
		return min;
	}

	findMin() {
		return this._data[0];
	}
}

function bubbleUp(a, i) {
	if (i === 0) return;
	let parent = Math.floor((i - 1) / 2); // i1 = 0, i2 = 0
	if (a[i] < a[parent]) {
		swap(a, i, parent);
		bubbleUp(a, parent);
	}
}

function bubbleDown(a, i) {
	let left = i * 2 + 1; // i0 > 1
	let right = i * 2 + 2; // i0 > 2

	let smallest = i;

	if (left < a.length && a[left] < a[smallest]) {
		smallest = left;
	}

	if (right < a.length && a[right] < a[smallest]) {
		smallest = right;
	}

	// console.log(a, i, smallest);

	if (smallest !== i) {
		swap(a, i, smallest);
		bubbleDown(a, smallest);
	}
}

function swap(a, i, j) {
	let t = a[i];
	a[i] = a[j];
	a[j] = t;
}

module.exports.MinHeap = MinHeap;
