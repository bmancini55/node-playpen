module.exports.search = search;
module.exports.insert = insert;
module.exports.peekMin = peekMin;
module.exports.peekMax = peekMax;

class BstNode {
	/**
	 * Generic Binary Search Tree Node
	 * @param {number} key
	 */
	constructor(key) {
		this.key = key;

		/**
		 * Left child
		 * @type {BstNode}
		 */
		this.parent = null;

		/**
		 * Left child
		 * @type {BstNode}
		 */
		this.left = null;

		/**
		 * Right child
		 * @type {BstNode}
		 */
		this.right = null;
	}
}

function search(root, key) {
	// if not found return null;
	if (root === null) return null;

	// if we have a match, return the node
	if (root.key === key) return root;

	// if key is less than root, search left
	if (root.key > key) return search(root.left, key);

	// if key is greater than root, search right
	return search(root.right, key);
}

function insert(root, key) {
	// when no node, return new root
	if (!root) {
		return new BstNode(key);
	}

	// if key <= root, recur to left
	if (key <= root.key) {
		let node = insert(root.left, key);
		node.parent = root;
		root.left = node;
	}

	// if key >= root, recur to right
	else if (key >= root.key) {
		let node = insert(root.right, key);
		node.parent = root;
		root.right = node;
	}

	// finally return original unchanged node
	return root;
}

function peekMax(root) {
	while (root.right) {
		root = root.right;
	}
	return root;
}

function peekMin(root) {
	while (root.left) {
		root = root.left;
	}
	return root;
}
