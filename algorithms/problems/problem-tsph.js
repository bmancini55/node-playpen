const fs = require('fs');

// const input = './input/tsph_8.txt'; // 23
// const input = './input/tsph_20.txt'; // 74
// const input = './input/tsph_100.txt'; // 941
// const input = './input/tsph_1000.txt'; // 29777
// const input = './input/tsph_20000.txt'; // 2499768
const input = './input/tsph.txt';

const raw = fs.readFileSync(input, 'utf8');
const rows = raw.split('\n').filter(p => p);

const [n] = rows.splice(0, 1);
const points = rows.map(p => p.split(' ').map(Number));

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

function tsph(points) {
	console.time();
	let distance = 0;

	let first = points.shift();
	let cur = first;

	while (points.length) {
		let dists = points.map(point =>
			eucleanDistance(cur.slice(1), point.slice(1))
		);
		let min = Number.MAX_SAFE_INTEGER;
		let mini = Number.MAX_SAFE_INTEGER;
		for (let i = 0; i < dists.length; i++) {
			if (dists[i] < min) {
				min = dists[i];
				mini = i;
			}
		}

		// console.log('selected', mini, min);

		distance += min;
		cur = points[mini];
		points.splice(mini, 1);
	}

	distance += eucleanDistance(cur.slice(1), first.slice(1));
	console.log(Math.trunc(distance));
	console.timeEnd();
}

tsph(points);
