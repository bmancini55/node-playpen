const { expect } = require('chai');
const { insert } = require('../src/bst');
const { search } = require('../src/bst');
const { peekMin } = require('../src/bst');
const { peekMax } = require('../src/bst');
const { predecessor } = require('../src/bst');
const { successor } = require('../src/bst');
const { inorder } = require('../src/bst');
const { del } = require('../src/bst');

describe('binary search tree', () => {
	describe('.insert', () => {
		it('should insert single', () => {
			let result = insert(null, 1);
			expect(result.key).to.equal(1);
			expect(result.parent).to.equal(null);
			expect(result.left).to.equal(null);
			expect(result.right).to.equal(null);
		});

		it('should insert left', () => {
			let root = insert(null, 2);
			insert(root, 1);
			expect(root.left.key).to.equal(1);
			expect(root.left.parent).to.equal(root);
			expect(root.left.left).to.equal(null);
			expect(root.left.right).to.equal(null);
		});

		it('should insert left', () => {
			let root = insert(null, 2);
			insert(root, 3);
			expect(root.right.key).to.equal(3);
			expect(root.right.parent).to.equal(root);
			expect(root.right.left).to.equal(null);
			expect(root.right.right).to.equal(null);
		});

		it('should insert left left', () => {
			let root = insert(null, 3);
			insert(root, 2);
			insert(root, 1);
			expect(root.left.left.key).to.equal(1);
			expect(root.left.left.parent.parent).to.equal(root);
		});

		it('should insert right left', () => {
			let root = insert(null, 4);
			insert(root, 2);
			insert(root, 3);
			expect(root.left.right.key).to.equal(3);
			expect(root.left.right.parent.parent).to.equal(root);
		});
	});

	describe('.search', () => {
		it('should null when not found', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 1);
			expect(result).to.equal(null);
		});

		it('should return root', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 5);
			expect(result.key).to.equal(5);
		});

		it('should return left child', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 3);
			expect(result.key).to.equal(3);
		});

		it('should return right child', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 10);
			expect(result.key).to.equal(10);
		});

		it('should return left leaf', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 8);
			expect(result.key).to.equal(8);
		});

		it('should return right leaf', () => {
			let root = insert(null, 5);
			insert(root, 3);
			insert(root, 10);
			insert(root, 4);
			insert(root, 8);
			let result = search(root, 4);
			expect(result.key).to.equal(4);
		});
	});

	describe('peekMin', () => {
		it('should return null when empty', () => {
			expect(peekMin(null)).to.be.null;
		});

		it('should find the min with right tree', () => {
			let root = insert(null, 5);
			insert(root, 6);
			insert(root, 7);
			let result = peekMin(root);
			expect(result.key).to.equal(5);
		});

		it('should find the min with left tree', () => {
			let root = insert(null, 5);
			insert(root, 2);
			insert(root, 3);
			insert(root, 1);
			let result = peekMin(root);
			expect(result.key).to.equal(1);
		});
	});

	describe('peekMax', () => {
		it('should return null when empty', () => {
			expect(peekMax(null)).to.be.null;
		});

		it('should find the max with left tree', () => {
			let root = insert(null, 5);
			insert(root, 4);
			insert(root, 3);
			let result = peekMax(root);
			expect(result.key).to.equal(5);
		});

		it('should find the max with right tree', () => {
			let root = insert(null, 3);
			insert(root, 5);
			insert(root, 4);
			insert(root, 6);
			let result = peekMax(root);
			expect(result.key).to.equal(6);
		});
	});

	describe('predecessor', () => {
		it('should return null when empty', () => {
			expect(predecessor(null)).to.be.null;
		});

		it('should return left predecessor', () => {
			let root = insert(null, 3);
			insert(root, 2);
			let result = predecessor(root);
			expect(result.key).to.equal(2);
		});

		it('should return parent predecessor', () => {
			let root = insert(null, 3);
			insert(root, 4);
			let result = predecessor(root.right);
			expect(result.key).to.equal(3);
		});

		it('should return grand parent predecessor', () => {
			let root = insert(null, 3);
			insert(root, 5);
			insert(root, 4);
			let result = predecessor(root.right.left);
			expect(result.key).to.equal(3);
		});
	});

	describe('successor', () => {
		it('should return null when empty', () => {
			expect(successor(null)).to.be.null;
		});

		it('should return right successsor', () => {
			let root = insert(null, 3);
			insert(root, 4);
			let result = successor(root);
			expect(result.key).to.equal(4);
		});

		it('should return parent successor', () => {
			let root = insert(null, 3);
			insert(root, 2);
			let result = successor(root.left);
			expect(result.key).to.equal(3);
		});

		it('should return grand parent successor', () => {
			let root = insert(null, 4);
			insert(root, 2);
			insert(root, 3);
			let result = successor(root.left.right);
			expect(result.key).to.equal(4);
		});
	});

	describe('.inorder', () => {
		it('null returns empty', () => {
			let root = null;
			let result = inorder(root);
			expect(result).to.deep.equal([]);
		});

		it('returns single', () => {
			let root = insert(null, 4);
			let result = inorder(root);
			result = result.map(p => p.key);
			expect(result).to.deep.equal([4]);
		});

		it('should subtrees', () => {
			let root = insert(null, 4);
			insert(root, 2);
			insert(root, 1);
			insert(root, 3);
			insert(root, 6);
			insert(root, 5);
			insert(root, 7);
			let result = inorder(root);
			result = result.map(p => p.key);
			expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
		});
	});

	describe('.delete', () => {
		it('should delete single node', () => {
			let root = insert(null, 4);
			root = del(root, 4);
			expect(root).to.be.null;
		});

		it('should remove leaf', () => {
			let root = insert(null, 4);
			root = insert(root, 3);
			root = del(root, 3);
			expect(root.left).to.be.null;
		});

		it('should remove left parent', () => {
			let root = insert(null, 4);
			root = insert(root, 3);
			root = insert(root, 2);
			root = del(root, 3);
			expect(root.left.key).to.equal(2);
			expect(root.left.parent).to.equal(root);
		});

		it('should remove right parent', () => {
			let root = insert(null, 4);
			root = insert(root, 5);
			root = insert(root, 6);
			root = del(root, 5);
			expect(root.right.key).to.equal(6);
			expect(root.right.parent).to.equal(root);
		});

		it('should replace with predecessor', () => {
			let root = insert(null, 4);
			root = insert(root, 2);
			root = insert(root, 3);
			root = insert(root, 5);
			root = del(root, 4);
			expect(root.key).to.equal(3);
			expect(root.parent).to.be.null;
			expect(root.left.key).to.equal(2);
			expect(root.left.parent).to.equal(root);
		});

		it('should replace with predecessor', () => {
			let root = insert(null, 1);
			root = insert(root, 5);
			root = insert(root, 3);
			root = insert(root, 2);
			root = insert(root, 4);
			root = del(root, 3);
			expect(root.right.left.key).to.equal(2);
		});
	});
});
