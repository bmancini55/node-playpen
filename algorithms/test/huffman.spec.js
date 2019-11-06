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
	it('extractMin', () => {
		let sut = new MinHeap(p => p && p.key);
		sut.insert({ key: 74 });
		sut.insert({ key: 46 });
		sut.insert({ key: 25 });
		sut.insert({ key: 48 });
		sut.insert({ key: 13 });
		sut.insert({ key: 37 });
		sut.insert({ key: 97 });
		sut.insert({ key: 77 });
		sut.insert({ key: 45 });
		sut.insert({ key: 96 });

		expect(sut.extractMin()).to.include({ key: 13 });
		expect(sut.extractMin()).to.include({ key: 25 });

		sut.insert({ key: 38 });

		expect(sut.extractMin()).to.include({ key: 37 });
		expect(sut.extractMin()).to.include({ key: 38 });
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
		expect(codes.get('c')).to.equal('00');
		expect(codes.get('f')).to.equal('01');
		expect(codes.get('a')).to.equal('100');
		expect(codes.get('e')).to.equal('1010');
		expect(codes.get('b')).to.equal('1011');
		expect(codes.get('d')).to.equal('11');
	});
});
