const { expect } = require('chai');
const { MinHeap } = require('../src/huffman');
const { huffmanTree, huffmanCodes } = require('../src/huffman');

describe('MinHeap', () => {
	it('should should maintain heap', () => {
		let sut = new MinHeap(p => p && p.key);
		sut.insert({ key: 5 });
		sut.insert({ key: 4 });
		sut.insert({ key: 3 });
		sut.insert({ key: 2 });
		sut.insert({ key: 1 });
		expect(sut.min).to.include({ key: 1 });
	});
	it('extractMin should bubble down', () => {
		let sut = new MinHeap(p => p && p.key);
		sut.insert({ key: 5 });
		sut.insert({ key: 4 });
		sut.insert({ key: 3 });
		sut.insert({ key: 2 });
		sut.insert({ key: 1 });
		expect(sut.extractMin()).to.include({ key: 1 });
		expect(sut.extractMin()).to.include({ key: 2 });
		expect(sut.extractMin()).to.include({ key: 3 });
		expect(sut.extractMin()).to.include({ key: 4 });
		expect(sut.extractMin()).to.include({ key: 5 });
	});
});

describe('huffman', () => {
	it('should create a two node tree', () => {
		let vals = [[0, 10], [1, 5]];
		let tree = huffmanTree(vals);
		let codes = huffmanCodes(tree);
		expect(codes.get(0)).to.equal('1');
		expect(codes.get(1)).to.equal('0');
	});

	it('should create a multi node tree', () => {
		let vals = [['a', 3], ['b', 2], ['c', 6], ['d', 8], ['e', 2], ['f', 6]];
		let tree = huffmanTree(vals);
		let codes = huffmanCodes(tree);
		expect(codes.get('a')).to.equal('010');
		expect(codes.get('b')).to.equal('0111');
		expect(codes.get('c')).to.equal('10');
		expect(codes.get('d')).to.equal('11');
		expect(codes.get('e')).to.equal('0110');
		expect(codes.get('f')).to.equal('00');
	});
});
