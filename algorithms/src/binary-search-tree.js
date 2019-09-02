// @ts-check

module.exports.search = search;
module.exports.insert = insert;
module.exports.peekMin = peekMin;
module.exports.peekMax = peekMax;
module.exports.predecessor = predecessor;
module.exports.successor = successor;
module.exports.inorder = inorder;
module.exports.del = del;

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

/**
 * Searches the BST from the root looking for the specified key. Search
 * executes in θ(height) which has average complexity of O(log n) and
 * a worst case runtime of O(n).
 *
 * @param {BstNode} root
 * @param {number} key
 */
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

/**
 * Inserts a new node with a given key into the BST. Returns the
 * original unchanged root of the BST. Run time executes in θ(height)
 * and has an average complexity of O(log n) and a worst case runtime
 * of O(n).
 *
 * @param {BstNode} root
 * @param {number} key
 */
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

/**
 * Finds the max value in the tree staring at the root.
 * Exceutes in θ(height) which has average complexity of O(log n) and
 * a worst case runtime of O(n).
 *
 * @param {BstNode} root
 * @returns {BstNode}
 */
function peekMax(root) {
	if (!root) return root;

	while (root.right) {
		root = root.right;
	}
	return root;
}

/**
 * Finds the min value in the tree staring at the root.
 * Exceutes in θ(height) which has average complexity of O(log n) and
 * a worst case runtime of O(n).
 *
 * @param {BstNode} root
 * @returns {BstNode}
 */
function peekMin(root) {
	if (!root) return root;

	while (root.left) {
		root = root.left;
	}
	return root;
}

/**
 * Finds the predecessor of the specified key
 *
 * Exceutes in θ(height) which has average complexity of O(log n) and
 * a worst case runtime of O(n).
 *
 * @param {BstNode} root
 * @returns {BstNode}
 */
function predecessor(root) {
	if (!root) return root;

	if (root.left) {
		return peekMax(root.left);
	}

	let parent = root.parent;
	while (parent && root.key < parent.key) {
		parent = parent.parent;
	}

	return parent;
}

/**
 * Finds the predecessor of the specified key
 *
 * Exceutes in θ(height) which has average complexity of O(log n) and
 * a worst case runtime of O(n).
 *
 * @param {BstNode} root
 * @returns {BstNode}
 */
function successor(root) {
	if (!root) return root;

	if (root.right) {
		return peekMin(root.right);
	}

	let parent = root.parent;
	while (parent && root.key > parent.key) {
		parent = parent.parent;
	}
	return parent;
}

/**
 * Returns an array of all nodes in order of the key. Runtime of O(n).
 *
 * @param {BstNode} root
 * @return {BstNode[]}
 */
function inorder(root) {
	let order = [];

	function traverse(node) {
		if (!node) return;

		if (node.left) traverse(node.left);
		order.push(node);
		if (node.right) traverse(node.right);
	}

	traverse(root);

	return order;
}

/**
 * Searches for the node matching the key and then deletes it
 * and returns the new root. Overage runtime of O(log n) and worst
 * case run time of O(n)
 *
 * @param {BstNode} root
 * @param {number} key
 * @returns {BstNode} new root
 */
function del(root, key) {
	if (!root) return root;

	// search left
	if (key < root.key) {
		root.left = del(root.left, key);
		if (root.left) root.left.parent = root;
	}

	// search right
	else if (key > root.key) {
		root.right = del(root.right, key);
		if (root.right) root.right.parent = root;
	}

	// otherwise
	else {
		// has zero or one child
		if (root.left == null) {
			let child = root.right;
			root.parent = null;
			root.left = null;
			root.right = null;
			return child;
		} else if (root.right === null) {
			let child = root.left;
			root.parent = null;
			root.left = null;
			root.right = null;
			return child;
		}

		// has with two children, we need to find the predecessor
		let node = predecessor(root);

		// swap predecessor
		root.key = node.key;

		// delete the predecessor node
		root.left = del(root.left, node.key);
	}

	return root;
}
