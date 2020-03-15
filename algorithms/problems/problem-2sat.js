const fs = require('fs');

// const input = './input/2sat_2_0.txt'; // 0
// const input = './input/2sat_4_1.txt'; // 1
// const input = './input/2sat_20_0.txt'; // 0
// const input = './input/2sat_40_1.txt'; // 1
// const input = './input/2sat_400_0.txt'; // 0
// const input = './input/2sat_800_1.txt'; // 1
// const input = './input/2sat_1000_1.txt'; // 1
// const input = './input/2sat_2000_1.txt'; // 1
// const input = './input/2sat_8000_0.txt'; // 0
// const input = './input/2sat_100000_1.txt'; // 1
// const input = './input/2sat_100000_0.txt'; // 1

// const input = './input/2sat_part1.txt'; // 1, 16221.446ms
// const input = './input/2sat_part2.txt'; // 0
// const input = './input/2sat_part3.txt'; // 1, 1713554.548ms
const input = './input/2sat_part4.txt'; // 1, 937472.139ms
// const input = './input/2sat_part5.txt'; // 0
// const input = './input/2sat_part6.txt'; // 0

const raw = fs.readFileSync(input, 'utf8');
const rows = raw.split('\n').filter(p => p);

const [n] = rows.splice(0, 1);
const clauses = rows.map(p => p.split(' ').map(Number));

console.log(`running with ${n} variables`);

function twoSatPapadimitriou(n, clauses) {
	let entropy = 0;
	for (let i = 0; i < Math.log2(n); i++) {
		console.time('loop');
		const assignments = genAssignmentRandom(n);
		for (let j = 0; j < 2 * n; j++) {
			let badClause;
			for (let i = 0; i < clauses.length; i++) {
				const clauseIndex = (entropy + i) % clauses.length;
				const clause = clauses[clauseIndex];
				if (!testClause(assignments, clause)) {
					badClause = clause;
					entropy += clauseIndex + 1;
					break;
				}
			}

			if (!badClause) {
				return assignments;
			} else {
				const flipClause = badClause;
				const flipVar = coinFlip();
				const flip = Math.abs(flipClause[flipVar]);
				assignments[flip] = assignments[flip] ^ 1;
			}
		}
		console.timeEnd('loop');
	}
	return [];
}

function coinFlip() {
	return Math.floor(Math.random() * 2);
}

function testClause(assignments, clause) {
	const [x1, x2] = clause;
	return (
		(x1 < 0 ? !assignments[Math.abs(x1)] : assignments[Math.abs(x1)]) ||
		(x2 < 0 ? !assignments[Math.abs(x2)] : assignments[Math.abs(x2)])
	);
}

function genAssignmentRandom(n) {
	const results = [];
	for (let i = 1; i <= n; i++) {
		results[i] = Math.floor(Math.random() * 2);
	}
	return results;
}

console.time();
console.log(JSON.stringify(twoSatPapadimitriou(n, clauses)));
console.timeEnd();
