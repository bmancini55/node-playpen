class MinHeap {
	/**
	 * Constructs a minimum heap
	 */
	constructor() {
		this.a = [];
	}

	/**
	 * Inserts the key into the heap and maintains
	 * the heap property.
	 * @param {number} key
	 */
	insert(key) {
		this.a.push(key);
		this._bubbleUp(this.a.length - 1);
	}

	/**
	 * Gets the min value for the heap without
	 * extracting it
	 * @type {number}
	 */
	get min() {
		return this.a[0];
	}

	/**
	 * Extracts the min value from the heap
	 * @returns {number}
	 */
	extractMin() {
		this._swap(0, this.a.length - 1);
		let a = this.a.pop();
		this._bubbleDown(0);
		return a;
	}

	_bubbleUp(i) {
		if (i === 0) return;
		let parent = this._parent(i);
		if (this.a[i] > this.a[parent]) return;
		this._swap(i, parent);
		this._bubbleUp(parent);
	}

	_bubbleDown(i) {
		let li = this._leftChild(i);
		let ri = this._rightChild(i);

		let iv = this.a[i];
		let lv = this.a[li] || Number.MAX_SAFE_INTEGER;
		let rv = this.a[ri] || Number.MAX_SAFE_INTEGER;

		if (lv <= rv && lv < iv) {
			this._swap(i, li);
			this._bubbleDown(li);
		} else if (rv <= li && rv < iv) {
			this._swap(i, ri);
			this._bubbleDown(ri);
		}
	}

	/**
	 * Returns the parent element. For example given the
	 * index 1,2=>0 3,4=>1 5,6=>2
	 * @param {number} i
	 * @returns {number}
	 */
	_parent(i) {
		return Math.floor((i - 1) / 2);
	}

	/**
	 * Returns the index of the left child
	 * @param {number} i
	 * @returns {number}
	 */
	_leftChild(i) {
		return i * 2 + 1;
	}

	/**
	 * Returns the index of the right child
	 * @param {number} i
	 * @returns {number}
	 */
	_rightChild(i) {
		return i * 2 + 2;
	}

	/**
	 * Swaps the two values in the heap
	 * @param {number} i
	 * @param {number} j
	 */
	_swap(i, j) {
		let k = this.a[j];
		this.a[j] = this.a[i];
		this.a[i] = k;
	}
}
module.exports.MinHeap = MinHeap;
