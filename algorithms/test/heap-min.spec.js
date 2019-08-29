const { expect } = require('chai');
const { MinHeap } = require('../src/heap-min');

describe('MinHeap', () => {
	describe('.insert', () => {
		it('should add element', () => {
			let h = new MinHeap();
			h.insert(1);
			expect(h._data).to.deep.equal([1]);
		});

		it('should add two elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(2);
			expect(h._data).to.deep.equal([1, 2]);
		});

		it('should add element with bubble up', () => {
			let h = new MinHeap();
			h.insert(3);
			h.insert(4);
			h.insert(1);
			expect(h._data).to.deep.equal([1, 4, 3]);
		});

		it('should build complex tree with bubble up', () => {
			let h = new MinHeap();
			h.insert(8);
			h.insert(7);
			h.insert(6);
			h.insert(5);
			h.insert(4);
			h.insert(3);
			h.insert(2);
			h.insert(1);
			expect(h._data).to.deep.equal([1, 2, 3, 5, 6, 7, 4, 8]);
		});
	});

	describe('.findMin', () => {
		it('should return min with single value', () => {
			let h = new MinHeap();
			h.insert(1);
			expect(h.findMin()).to.equal(1);
		});

		it('should return min with multiple values', () => {
			let h = new MinHeap();
			h.insert(3);
			h.insert(2);
			h.insert(1);
			expect(h.findMin()).to.equal(1);
		});
	});

	describe('.extractMin', () => {
		it('should work on single element', () => {
			let h = new MinHeap();
			h.insert(1);
			expect(h.extractMin()).to.equal(1);
		});

		it('should work on multiple elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(2);
			expect(h.extractMin()).to.equal(1);
			expect(h.extractMin()).to.equal(2);
		});

		it('should work on multiple elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			expect(h.extractMin()).to.equal(1);
			expect(h.extractMin()).to.equal(3);
			expect(h.extractMin()).to.equal(5);
		});

		it('should work on multiple elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			h.insert(6);
			expect(h.extractMin()).to.equal(1);
			expect(h.extractMin()).to.equal(3);
			expect(h.extractMin()).to.equal(5);
			expect(h.extractMin()).to.equal(6);
		});

		it('should work on multiple elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			h.insert(7);
			h.insert(6);
			expect(h.extractMin()).to.equal(1);
			expect(h.extractMin()).to.equal(3);
			expect(h.extractMin()).to.equal(5);
			expect(h.extractMin()).to.equal(6);
			expect(h.extractMin()).to.equal(7);
		});

		it('should work on multiple elements', () => {
			let h = new MinHeap();
			h.insert(1);
			h.insert(5);
			h.insert(3);
			h.insert(7);
			h.insert(6);
			h.insert(9);
			h.insert(4);
			expect(h.extractMin()).to.equal(1);
			expect(h.extractMin()).to.equal(3);
			expect(h.extractMin()).to.equal(4);
			expect(h.extractMin()).to.equal(5);
			expect(h.extractMin()).to.equal(6);
			expect(h.extractMin()).to.equal(7);
			expect(h.extractMin()).to.equal(9);
		});
	});
});
