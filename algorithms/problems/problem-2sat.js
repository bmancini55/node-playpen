const fs = require('fs');

// const input = './input/2sat_2_0.txt'; // 0
// const input = './input/2sat_4_1.txt'; // 1
// const input = './input/2sat_20_0.txt'; // 0
// const input = './input/2sat_40_1.txt'; // 1
// const input = './input/2sat_400_0.txt'; // 0
// const input = './input/2sat_800_1.txt'; // 1
// const input = './input/2sat_1000_1.txt'; // 1
const input = './input/2sat_2000_1.txt'; // 1
// const input = './input/2sat_8000_0.txt'; // 0
// const input = './input/2sat_100000_1.txt'; // 1
// const input = './input/2sat_100000_0.txt'; // 1

// const input = './input/2sat_part1.txt'; // 1, 16221.446ms
// const input = './input/2sat_part2.txt'; // 0
// const input = './input/2sat_part3.txt'; // 1, 1713554.548ms
// const input = './input/2sat_part4.txt'; // 1, 937472.139ms
// const input = './input/2sat_part5.txt'; // 0
// const input = './input/2sat_part6.txt'; // 0

const raw = fs.readFileSync(input, 'utf8');
const rows = raw.split('\n').filter(p => p);

const [n] = rows.splice(0, 1);
const clauses = rows.map(p => p.split(' ').map(Number));

console.log(`running with ${n} variables`);

const { twoSatPapadimitriou } = require('../src/two-sat-papadimitriou');

console.time();
console.log(JSON.stringify(twoSatPapadimitriou(n, clauses)));
console.timeEnd();
