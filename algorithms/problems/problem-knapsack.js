const fs = require('fs');
const { knapsack } = require('../src/knapsack');

// const input = './input/knapsack1_10.txt'; // 147
// const input = './input/knapsack1_1000.txt'; // 178629
// const input = './input/knapsack1.txt'; // 2493893
const input = './input/knapsack2.txt'; // 4243395

const raw = fs.readFileSync(input, 'utf8');

const data = raw
	.split('\n')
	.filter(p => p)
	.map(line => line.split(' ').map(Number));

const [size, itemCnt] = data[0];

const items = data.slice(1);

console.log('size', size, 'items', itemCnt);
console.time();
console.log('value', knapsack(items, size));
console.timeEnd();
