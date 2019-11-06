const { expect } = require('chai');
const { MinHeap } = require('../src/huffman');

describe('MinHeap', () => {
	it('should should maintain heap', () => {
		let sut = new MinHeap();
		sut.insert(5);
		sut.insert(4);
		sut.insert(3);
		sut.insert(2);
		sut.insert(1);
		expect(sut.min).to.equal(1);
	});
	it('extractMin should bubble down', () => {
		let sut = new MinHeap();
		sut.insert(5);
		sut.insert(4);
		sut.insert(3);
		sut.insert(2);
		sut.insert(1);
		expect(sut.extractMin()).to.equal(1);
		expect(sut.extractMin()).to.equal(2);
		expect(sut.extractMin()).to.equal(3);
		expect(sut.extractMin()).to.equal(4);
		expect(sut.extractMin()).to.equal(5);
		expect(sut.extractMin()).to.be.undefined;
	});
});
