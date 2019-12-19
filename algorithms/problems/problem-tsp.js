const fs = require('fs');

// const input = './input/tsp_2.txt'; // 5
// const input = './input/tsp_3.txt'; // 2
// const input = './input/tsp_4.txt'; // 25 - https://github.com/beaunus/stanford-algs/blob/master/testCases/course4/assignment2TSP/output_int_12_4.txt
// const input = './input/tsp_6.txt'; // 12
// const input = './input/tsp_11.txt'; // 414
// const input = './input/tsp_16.txt'; // 56
// const input = './input/tsp_20.txt'; // 78
const input = './input/tsp.txt'; //

const raw = fs.readFileSync(input, 'utf8');
const rows = raw.split('\n').filter(p => p);

const [n] = rows.splice(0, 1);
const points = rows.map(p => p.split(' ').map(Number));

// construct an empty adjacency matrix
const graph = new Array(n);
for (let i = 0; i < n; i++) {
	graph[i] = [];
}

// fill adjacency matrix with point distances
for (let i = 0, pl = points.length; i < pl; i++) {
	for (let j = 0; j < pl; j++) {
		graph[i][j] = eucleanDistance(points[i], points[j]);
	}
}

// const graph = [[0, 2, 9, 10], [1, 0, 6, 4], [15, 7, 0, 8], [6, 3, 12, 0]];
// console.log(graph);

/**
 * Calculates the Euclidean Distance between two
 * points that are represented as a tuple of X,Y
 * coordinates.
 * @param {[number,number]} p1
 * @param {[number,number]} p2
 */
function eucleanDistance(p1, p2) {
	return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function setKey(s) {
	return s.join('|');
}

function bitmask(set) {
	let r = 0;
	for (let s of set) r |= 1 << s;
}

/// COURSE VERSION

function tsp(g) {
	const n = g.length;

	const sets = combinations(n);

	let a = new Map();
	for (let i = 0; i < sets.length; i++) {
		let ai = new Array(n).fill(0);
		ai[0] = i == 0 ? 0 : Number.POSITIVE_INFINITY;
		a.set(setKey(sets[i]), ai);
	}

	for (let m = 2; m <= n; m++) {
		let S = sets.filter(p => p.length == m);

		for (let s of S) {
			let skey = setKey(s);

			for (let j of s) {
				if (j == 0) continue;

				let sj = removeFromSet(s, j);
				let sjkey = setKey(sj);

				let min = Number.POSITIVE_INFINITY;
				for (let k of s) {
					if (k == j) continue;
					let priorVal = a.get(sjkey)[k];
					let curVal = g[k][j];
					if (priorVal + curVal < min) min = priorVal + curVal;
				}

				// console.log(
				// 	`s=${skey}`.padEnd(8),
				// 	`j=${j}`,
				// 	`sj=${sjkey}`,
				// 	`min=${min}`
				// );

				a.get(skey)[j] = min;
			}
		}
	}

	let lastSet = a.get(setKey(sets[sets.length - 1]));
	let min = Number.POSITIVE_INFINITY;
	for (let k = 1; k < n; k++) {
		if (lastSet[k] < min) {
			min = Math.min(min, lastSet[k] + g[k][0]);
		}
	}

	// console.log(a);
	console.log(`final=${Math.trunc(min)}`);
}

/// WIKIPEDIA VERSION

// function tsp(g) {
// 	const n = g.length;

// 	const sets = combinations(n);

// 	let a = new Map();
// 	for (let i = 0; i < sets.length; i++) {
// 		let ai = new Array(n).fill(Number.POSITIVE_INFINITY);
// 		a.set(setKey(sets[i]), ai);
// 	}

// 	for (let k = 0; k < n; k++) {
// 		a.get(setKey([k]))[k] = g[0][k];
// 	}

// 	for (let sl = 2; sl < n; sl++) {
// 		let S = sets.filter(set => set.length === sl && set[0] !== 0);
// 		for (let s of S) {
// 			let skey = setKey(s);
// 			for (let k of s) {
// 				let sk = removeFromSet(s, k);
// 				let skkey = setKey(sk);
// 				let skcost = a.get(skkey);

// 				// console.log('');

// 				let min = Number.POSITIVE_INFINITY;
// 				for (let m of s) {
// 					if (m == k) continue;
// 					let val = skcost[m] + g[m][k];

// 					// console.log(
// 					// 	`skey=${skey}`.padEnd(8),
// 					// 	`k=${k}`.padEnd(8),
// 					// 	`m=${m}`.padEnd(8),
// 					// 	`pr=${skcost[m]}`.padEnd(8),
// 					// 	`dmk=${g[m][k]}`,
// 					// 	`sk=${skkey}`,
// 					// 	`skcost=${skcost}`
// 					// );

// 					if (val < min) min = val;
// 				}

// 				a.get(skey)[k] = min;
// 			}
// 		}
// 	}

// 	let lastSet = a.get(setKey(sets[sets.length - 2]));
// 	let min = Number.POSITIVE_INFINITY;
// 	for (let k = 1; k < n; k++) {
// 		if (lastSet[k] < min) {
// 			min = Math.min(min, lastSet[k] + g[k][0]);
// 		}
// 	}

// 	// console.log(a);
// 	console.log(`final=${Math.trunc(min)}`);
// }

function removeFromSet(s, k) {
	s = s.slice();
	s.splice(s.indexOf(k), 1);
	return s;
}

function combinations(n) {
	let sets = [];

	for (let x = 0; x < n; x++) {
		sets.push([x]);
		for (let y = 0, sl = sets.length - 1; y < sl; y++) {
			sets.push([...sets[y], x]);
		}
	}
	return sets;
}

console.time();
tsp(graph);
console.timeEnd();
