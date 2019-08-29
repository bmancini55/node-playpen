class MaxHeap {
	constructor() {
		this._data = [];
	}

	get size() {
		return this._data.length;
	}

	insert(val) {
		this._data.push(val);
		let i = this._data.length - 1;
		bubbleUp(this._data, i);
	}

	findMax() {
		return this._data[0];
	}

	extractMax() {
		let a = this._data;

		// capture max value for return later
		let max = a[0];

		// swap last with first
		a[0] = a.pop();

		// maintain the heap property
		bubbleDown(a, 0);

		return max;
	}
}

function bubbleUp(a, i) {
	if (i === 0) return;
	let pi = Math.floor((i - 1) / 2);
	if (a[i] > a[pi]) {
		swap(a, i, pi);
		bubbleUp(a, pi);
	}
}

function bubbleDown(a, i) {
	let left = i * 2 + 1; // i0 > 1
	let right = i * 2 + 2; // i0 > 2

	let largest = i;

	if (left < a.length && a[left] > a[largest]) {
		largest = left;
	}

	if (right < a.length && a[right] > a[largest]) {
		largest = right;
	}

	if (largest !== i) {
		swap(a, i, largest);
		bubbleDown(a, largest);
	}
}

function swap(a, i, j) {
	let t = a[i];
	a[i] = a[j];
	a[j] = t;
}

module.exports.MaxHeap = MaxHeap;
