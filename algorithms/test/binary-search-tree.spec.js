const { expect } = require('chai');
const { insert } = require('../src/binary-search-tree');
const { search } = require('../src/binary-search-tree');
const { peekMin } = require('../src/binary-search-tree');
const { peekMax } = require('../src/binary-search-tree');

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

	describe('peakMin', () => {
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

	describe('peakMax', () => {
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
});
