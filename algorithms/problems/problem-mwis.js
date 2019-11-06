const fs = require('fs');

// const file = './input/mwis_10.txt'; // 10100000
// const file = './input/mwis_40.txt'; // 10010000
// const file = './input/mwis_1000.txt'; // 01011011
const file = './input/mwis.txt';

const raw = fs.readFileSync(file, 'utf8');

const data = raw
	.split('\n')
	.slice(1)
	.filter(p => p)
	.map(p => Number(p));

function mwis(data) {
	let a = [0, ...data];
	for (let i = 2; i < a.length; i++) {
		let g1 = a[i - 1];
		let g2 = a[i - 2] + a[i];
		a[i] = g1 > g2 ? g1 : g2;
	}

	// console.log(a);

	let s = new Set();
	let i = a.length - 1;
	while (i >= 1) {
		let g1 = a[i - 1];
		let g2 = a[i - 2] + data[i - 1];

		if (g1 >= g2) {
			i -= 1;
		} else {
			s.add(i - 1);
			i -= 2;
		}
	}

	// console.log(s);

	// vertices: 1, 2, 3, 4, 17, 117, 517, 997
	let cp = print.bind(null, s);
	console.log(
		[cp(0), cp(1), cp(2), cp(3), cp(16), cp(116), cp(516), cp(996)].join('')
	);
}

function print(s, v) {
	return s.has(v) ? '1' : '0';
}

mwis(data);
