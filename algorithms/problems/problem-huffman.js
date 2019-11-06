const fs = require('fs');
const { huffmanTree, huffmanCodes } = require('../src/huffman');

// const file = './input/huffman_10.txt'; // 5 and 2
// const file = './input/huffman_40.txt'; // 9 and 4
// const file = './input/huffman_4000.txt'; // 20 and 11
const file = './input/huffman.txt'; // 19 and 9

const raw = fs.readFileSync(file, 'utf8');

const data = raw
	.split('\n')
	.filter(p => p)
	.slice(1);

const input = data.map((freq, i) => [i, Number(freq)]);

let tree = huffmanTree(input);
let codes = huffmanCodes(tree);

let lens = Array.from(codes.values()).map(p => p.length);
console.log('max', Math.max.apply(null, lens));
console.log('min', Math.min.apply(null, lens));
