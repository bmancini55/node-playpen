class MinHeap {
	/**
	 * Constructs a minimum heap
	 */
	constructor(keyFn) {
		this.a = [];
		this.keyFn = keyFn;
	}

	/**
	 * Inserts the key into the heap and maintains
	 * the heap property.
	 * @param {number} key
	 */
	insert(obj) {
		this.a.push(obj);
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
	 * @type {number}
	 */
	get size() {
		return this.a.length;
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
		let parent = this._parentIndex(i);
		if (this.keyFn(this.a[i]) > this.keyFn(this.a[parent])) return;
		this._swap(i, parent);
		this._bubbleUp(parent);
	}

	_bubbleDown(i) {
		let li = this._leftChildIndex(i);
		let ri = this._rightChildIndex(i);

		let iv = this.keyFn(this.a[i]);
		let lv = this.keyFn(this.a[li]) || Number.MAX_SAFE_INTEGER;
		let rv = this.keyFn(this.a[ri]) || Number.MAX_SAFE_INTEGER;

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
	_parentIndex(i) {
		return Math.floor((i - 1) / 2);
	}

	/**
	 * Returns the index of the left child
	 * @param {number} i
	 * @returns {number}
	 */
	_leftChildIndex(i) {
		return i * 2 + 1;
	}

	/**
	 * Returns the index of the right child
	 * @param {number} i
	 * @returns {number}
	 */
	_rightChildIndex(i) {
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

class Node {
	constructor(key, freq) {
		this.left = null;
		this.right = null;
		this.key = key;
		this.freq = freq;
	}
}
module.exports.Node = Node;

function huffmanTree(vals) {
	let nodes = vals.map(val => new Node(val[0], val[1]));
	let heap = new MinHeap(p => p && p.freq);
	for (let node of nodes) {
		heap.insert(node);
	}

	while (heap.size > 1) {
		let a = heap.extractMin();
		let b = heap.extractMin();

		let c = new Node(null, a.freq + b.freq);
		c.left = a;
		c.right = b;
		heap.insert(c);
	}

	return heap.extractMin();
}

function huffmanCodes(tree) {
	let codes = new Map();
	function crawl(node, path) {
		if (!node.left || !node.right) {
			codes.set(node.key, path);
		}
		if (node.left) {
			crawl(node.left, path + '0');
		}
		if (node.right) {
			crawl(node.right, path + '1');
		}
	}
	crawl(tree, '');
	return codes;
}

module.exports.huffmanTree = huffmanTree;
module.exports.huffmanCodes = huffmanCodes;
