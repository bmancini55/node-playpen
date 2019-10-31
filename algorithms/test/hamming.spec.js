const { expect } = require('chai');
const sut = require('../src/hamming');

describe('hammingDistance', () => {
	it('should return distance of 0', () => {
		let a = parseInt('0001', 2);
		let b = parseInt('0001', 2);
		expect(sut.hammingDistance(a, b)).to.equal(0);
	});

	it('should return distance of 1', () => {
		let a = parseInt('0001', 2);
		let b = parseInt('0000', 2);
		expect(sut.hammingDistance(a, b)).to.equal(1);
	});

	it('should return distance of 2', () => {
		let a = parseInt('0001', 2);
		let b = parseInt('0010', 2);
		expect(sut.hammingDistance(a, b)).to.equal(2);
	});

	it('should return distance of 4', () => {
		let a = parseInt('1111', 2);
		let b = parseInt('0000', 2);
		expect(sut.hammingDistance(a, b)).to.equal(4);
	});
});
