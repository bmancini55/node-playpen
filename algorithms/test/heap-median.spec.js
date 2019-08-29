const { expect } = require('chai');
const { MedianHeap } = require('../src/heap-median');

describe('MedianHeap', () => {
	it('should maintain median with 1 value', () => {
		let h = new MedianHeap();
		h.insert(1);
		expect(h.findMedian()).to.equal(1);
	});

	it('should maintain median with 2 asc values', () => {
		let h = new MedianHeap();
		h.insert(1);
		h.insert(2);
		expect(h.findMedian()).to.equal(1);
	});

	it('should maintain median with 3 asc values', () => {
		let h = new MedianHeap();
		h.insert(1);
		h.insert(2);
		h.insert(3);
		expect(h.findMedian()).to.equal(2);
	});

	it('should maintain median with 4 asc values', () => {
		let h = new MedianHeap();
		h.insert(1);
		h.insert(2);
		h.insert(3);
		h.insert(4);
		expect(h.findMedian()).to.equal(2);
	});

	it('should maintain median with 5 asc values', () => {
		let h = new MedianHeap();
		h.insert(1);
		h.insert(2);
		h.insert(3);
		h.insert(4);
		h.insert(5);
		expect(h.findMedian()).to.equal(3);
	});

	it('should maintain median with 4 desc values', () => {
		let h = new MedianHeap();
		h.insert(5);
		h.insert(4);
		h.insert(3);
		h.insert(2);
		expect(h.findMedian()).to.equal(3);
	});

	it('should maintain median with 2 desc values', () => {
		let h = new MedianHeap();
		h.insert(5);
		h.insert(4);
		expect(h.findMedian()).to.equal(4);
	});

	it('should maintain median with 3 desc values', () => {
		let h = new MedianHeap();
		h.insert(5);
		h.insert(4);
		h.insert(3);
		expect(h.findMedian()).to.equal(4);
	});

	it('should maintain median with 4 desc values', () => {
		let h = new MedianHeap();
		h.insert(5);
		h.insert(4);
		h.insert(3);
		h.insert(2);
		expect(h.findMedian()).to.equal(3);
	});

	it('should maintain median with 5 desc values', () => {
		let h = new MedianHeap();
		h.insert(5);
		h.insert(4);
		h.insert(3);
		h.insert(2);
		h.insert(1);
		expect(h.findMedian()).to.equal(3);
	});

	it('should maintain the heap with a mix of values', () => {
		let h = new MedianHeap();
		h.insert(6);
		h.insert(2);
		h.insert(4);
		h.insert(8);
		h.insert(7);
		h.insert(1);
		h.insert(3);
		h.insert(9);
		h.insert(5);
		expect(h.findMedian()).to.equal(5);
	});
});
