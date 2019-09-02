const { expect } = require('chai');
const { BstMedian } = require('../src/bst-median');

describe('BstMedian', () => {
	it('should for single valuue', () => {
		let t = new BstMedian();
		t.insert(1);
		expect(t.findMedian()).to.equal(1);
	});

	it('should for two values', () => {
		let t = new BstMedian();
		t.insert(1);
		t.insert(2);
		expect(t.findMedian()).to.equal(1);
	});

	it('should for three values', () => {
		let t = new BstMedian();
		t.insert(2);
		t.insert(1);
		t.insert(3);
		expect(t.findMedian()).to.equal(2);
	});

	it('should for three values', () => {
		let t = new BstMedian();
		t.insert(1);
		t.insert(2);
		t.insert(3);
		expect(t.findMedian()).to.equal(2);
	});

	it('should for three values', () => {
		let t = new BstMedian();
		t.insert(3);
		t.insert(2);
		t.insert(1);
		expect(t.findMedian()).to.equal(2);
	});

	it('should for four values', () => {
		let t = new BstMedian();
		t.insert(2);
		t.insert(1);
		t.insert(3);
		t.insert(4);
		expect(t.findMedian()).to.equal(2);
	});

	it('should for five values', () => {
		let t = new BstMedian();
		t.insert(3);
		t.insert(1);
		t.insert(2);
		t.insert(4);
		t.insert(5);
		expect(t.findMedian()).to.equal(3);
	});

	it('should for 10 values', () => {
		let t = new BstMedian();
		t.insert(4);
		t.insert(1);
		t.insert(2);
		t.insert(5);
		t.insert(3);
		t.insert(9);
		t.insert(8);
		t.insert(6);
		t.insert(7);
		expect(t.findMedian()).to.equal(5);
	});
});
