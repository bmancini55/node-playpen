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
	if (!root) return root;

	while (root.right) {
		root = root.right;
	}
	return root;
}

function peekMin(root) {
	if (!root) return root;

	while (root.left) {
		root = root.left;
	}
	return root;
}

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
 * @return {BstNode}
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

function del(k) {
	// k has no children, just delete it
	if (!k.left && !k.right) {
		removeLeaf(k);
	} else if ((k.left && !k.right) || (!k.left && k.right)) {
		// rewire child as parent
		swapNodes(k, k.left || k.right);
		removeLeaf(k);
	} else {
		// swap with predecessor
		let p = predecessor(k);
		swapNodes(k, p);
		removeLeaf(k);
		return p;
	}
}

function swapNodes(node1, node2) {
	let p2 = node2.parent;
	let l2 = node2.left;
	let r2 = node2.right;

	if (node1.parent) {
		if (node1.parent.left === node1) node1.parent.left = node2;
		if (node1.parent.right === node1) node1.parent.right = node2;
	}

	if (node2.parent) {
		if (node2.parent.left === node2) node2.parent.left = node1;
		if (node2.parent.right === node2) node2.parent.right = node1;
	}

	node2.parent = node1.parent;
	node2.left = node1.left;
	node2.right = node1.right;

	node1.parent = p2;
	node1.left = l2;
	node1.right = r2;
}

function removeLeaf(node) {
	if (node.parent) {
		if (node.parent.left === node) node.parent.left = null;
		if (node.parent.right === node) node.parent.right = null;
		node.parent = null;
	}
	return node;
}
