const { expect } = require('chai');
const { MaxHeap } = require('../src/heap-max');

describe('MaxHeap', () => {
	describe('.insert', () => {
		it('should add element', () => {
			let h = new MaxHeap();
			h.insert(1);
			expect(h._data).to.deep.equal([1]);
		});

		it('should add two elements', () => {
			let h = new MaxHeap();
			h.insert(2);
			h.insert(1);
			expect(h._data).to.deep.equal([2, 1]);
		});

		it('should add element with bubble up', () => {
			let h = new MaxHeap();
			h.insert(3);
			h.insert(1);
			h.insert(4);
			expect(h._data).to.deep.equal([4, 1, 3]);
		});

		it('should build complex tree with bubble up', () => {
			let h = new MaxHeap();
			h.insert(1);
			h.insert(2);
			h.insert(3);
			h.insert(4);
			h.insert(5);
			h.insert(6);
			h.insert(7);
			h.insert(8);
			expect(h._data).to.deep.equal([8, 7, 6, 4, 3, 2, 5, 1]);
		});
	});

	describe('.findMax', () => {
		it('should return max with single value', () => {
			let h = new MaxHeap();
			h.insert(1);
			expect(h.findMax()).to.equal(1);
		});

		it('should return max with multiple values', () => {
			let h = new MaxHeap();
			h.insert(1);
			h.insert(2);
			h.insert(3);
			expect(h.findMax()).to.equal(3);
		});
	});

	describe('.extractMax', () => {
		it('should work on single element', () => {
			let h = new MaxHeap();
			h.insert(1);
			expect(h.extractMax()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MaxHeap();
			h.insert(2);
			h.insert(1);
			expect(h.extractMax()).to.equal(2);
			expect(h.extractMax()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MaxHeap();
			h.insert(5);
			h.insert(1);
			h.insert(3);
			expect(h.extractMax()).to.equal(5);
			expect(h.extractMax()).to.equal(3);
			expect(h.extractMax()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MaxHeap();
			h.insert(6);
			h.insert(5);
			h.insert(3);
			h.insert(1);
			expect(h.extractMax()).to.equal(6);
			expect(h.extractMax()).to.equal(5);
			expect(h.extractMax()).to.equal(3);
			expect(h.extractMax()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MaxHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			h.insert(7);
			h.insert(6);
			expect(h.extractMax()).to.equal(7);
			expect(h.extractMax()).to.equal(6);
			expect(h.extractMax()).to.equal(5);
			expect(h.extractMax()).to.equal(3);
			expect(h.extractMax()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MaxHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			h.insert(7);
			h.insert(6);
			h.insert(9);
			h.insert(4);
			expect(h.extractMax()).to.equal(9);
			expect(h.extractMax()).to.equal(7);
			expect(h.extractMax()).to.equal(6);
			expect(h.extractMax()).to.equal(5);
			expect(h.extractMax()).to.equal(4);
			expect(h.extractMax()).to.equal(3);
			expect(h.extractMax()).to.equal(1);
		});
	});
});
