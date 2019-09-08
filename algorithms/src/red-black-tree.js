// @ts-check

const Color = {
	Black: 0,
	Red: 1,
};

class RBNode {
	constructor(key) {
		this.key = key;
		this.color = Color.Black;
		this.parent = null;
		this.left = null;
		this.right = null;
	}
}

module.exports.Color = Color;
module.exports.RBNode = RBNode;
module.exports.getParent = getParent;
module.exports.getGrandParent = getGrandParent;
module.exports.getSibling = getSibling;
module.exports.getUncle = getUncle;
module.exports.rotateLeft = rotateLeft;
module.exports.rotateRight = rotateRight;
module.exports.insert = insert;

/**
 * Retrieves the parent node
 *
 * @param {RBNode} node
 */
function getParent(node) {
	return node.parent;
}

/**
 *	Retrieves the grand parent node
 *
 * @param {RBNode} node
 */
function getGrandParent(node) {
	let p = getParent(node);
	if (!p) return null;
	return getParent(p);
}

/**
 * Retrieves the sibling node
 *
 * @param {RBNode} node
 */
function getSibling(node) {
	let p = getParent(node);
	if (!p) return null;
	if (node === p.left) {
		return p.right;
	} else {
		return p.left;
	}
}

/**
 *
 * @param {RBNode} node
 */
function getUncle(node) {
	let p = getParent(node);
	if (!p) return null;
	return getSibling(p);
}

/**
 * Rotates x's right child y to x's former position.
 *
 * @param {RBNode} x
 */
function rotateLeft(x) {
	let y = x.right;
	let B = y.left;
	let p = getParent(x);

	// a null value for y cannot become a parent...
	if (!y) throw new Error('leaf rotation');

	// move y's parent pointer
	y.parent = p;

	// swap p's child from x to y
	if (p) {
		if (p.left === x) p.left = y;
		if (p.right === x) p.right = y;
	}

	// move B to x's right
	x.right = B;

	// change B's parent pointer from y to x
	if (B) {
		B.parent = x;
	}

	// move x to y's left
	y.left = x;

	// move x's parent pointer from p to y
	x.parent = y;
}

/**
 * Rotates x's left child y to x's former position
 *
 * @param {RBNode} x
 */
function rotateRight(x) {
	let y = x.left;
	let B = y.right;
	let p = getParent(x);

	// y cannot be a null value since
	if (!y) throw new Error('leaf rotation');

	// move y to x's position
	y.parent = p;

	// swap p's child from x to y
	if (p) {
		if (p.left === x) p.left = y;
		if (p.right === x) p.rright = y;
	}

	// move B to x's left
	x.left = B;

	// change B's parent pointer from y to x
	if (B) {
		B.parent = x;
	}

	// move x to y's right
	y.right = x;

	// move x's parent pointer from p to y
	x.parent = y;
}

function insert(root, node) {
	root = recurInsert(root, node);

	repairInsert(node);

	return root;
}

/**
 * Recursively inserts the node into the BST. Note that
 * this method is not tail recursive since it returns the
 * root node.
 *
 * @param {RBNode} root
 * @param {RBNode} n
 * @returns {RBNode}
 */
function recurInsert(root, n) {
	if (!root) return n;

	if (root.key >= n.key) {
		let l = recurInsert(root.left, n);
		root.left = l;
		l.parent = root;
	}

	if (root.key < n.key) {
		let r = recurInsert(root.right, n);
		root.right = r;
		r.parent = root;
	}

	return root;
}

/**
 *
 * @param {*} n
 */
function repairInsert(n) {
	let g = getGrandParent(n);
	let p = getParent(n);
	let u = getUncle(n);

	if (!p) {
		// case 1 - new insert
		// 	color it black
		n.color = Color.Black;
	} else if (p.color === Color.Black) {
		// case 2 - black parent
		// 	color it red
		n.color = Color.Red;
	} else if (u && u.color === Color.Red) {
		// case 3 - parent and uncle are both red
		// 	color grandparent red
		//  color parent and uncle black
		//	fix grandparent
		n.color = Color.Red;
		g.color = Color.Red;
		p.color = Color.Black;
		u.color = Color.Black;
		repairInsert(g);
	} else {
		// case 4 - parent is red and uncle is black
		// 	rotate into grand parent position

		// rotate n out from under grandparent if needed
		if (n === p.right && p === g.left) {
			rotateLeft(p);
			n = n.left;
		} else if (n === p.left && p === g.right) {
			rotateRight(p);
			n = n.right;
		}

		// rotate the grandparent
		p = getParent(n);
		g = getGrandParent(n);
		if (n === p.left) {
			rotateRight(g);
		} else {
			rotateLeft(g);
		}
		p.color = Color.Black;
		g.color = Color.Red;
	}
}
