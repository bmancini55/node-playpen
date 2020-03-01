function combinations(n, r) {
	let levels = [
		[], // level 0
	];
	for (let l = 1; l <= r; l++) {
		levels[l] = [];

		for (let i = 0; i < n; i++) {
			if (l === 1) levels[l].push([i]);
			else {
				for (let prev of levels[l - 1]) {
					if (prev[0] <= i) continue;
					else levels[l].push([i, ...prev]);
				}
			}
		}
	}
	// return levels.reduce((a, l) => [...a, ...l], []); // flattens
	return levels;
}
// let r = nchoose_iter(5, 5);
// console.log(r);
// console.log(r.length);

// console.time();
// nchoose_iter(20, 20);
// console.timeEnd();

function nchoose_iter2(n, r) {
	let last = [[]];
	for (let l = 1; l <= r; l++) {
		let cur = [];
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < last.length; j++) {
				if (last[j][0] == i) continue;
				else cur.push([i, ...last[j]]);
			}
		}
		last = cur;
	}
	return last;
}
// console.time();
// // console.log(nchoose_iter2(4, 2));
// console.log(nchoose_iter2(20, 20));
// console.timeEnd();

function nchoose_iter3(n, r) {
	let last = [[]];
	let lasti = new Array(n).fill(0);
	for (let l = 1; l <= r; l++) {
		let cur = [];
		let curi = [];
		for (let i = 0; i < n; i++) {
			for (let j = lasti[i], ll = last.length; j < ll; j++) {
				cur.push([i, ...last[j]]);
				curi[i] = cur.length;
			}
		}
		last = cur;
		lasti = curi;
	}
	return last;
}
console.time();
// console.log(nchoose_iter3(4, 4));
nchoose_iter3(25, 25);
console.timeEnd();

function combinations2(n) {
	let sets = [];

	for (let x = 0; x < n; x++) {
		sets.push([x]);
		for (let y = 0, sl = sets.length - 1; y < sl; y++) {
			sets.push([...sets[y], x]);
		}
	}
	return sets;
}
// console.time();
// console.log(combinations(4));
// console.timeEnd();

// [0] [0,1] [0,1,2] [0,1,2,3]
// [1] [0,2] [0,1,3]
// [2] [0,3] [0,2,3]
// [3] [1,2] [1,2,3]
//     [1,3]
//     [2,3]

/////////////////////

function nchooser(n, r, start = 0) {
	if (start > n || r === 0) return;

	let results = [];
	for (let i = start; i < n; i++) {
		let subs = nchooser(n, r - 1, i + 1);
		if (subs) {
			for (let sub of subs) {
				results.push([i, ...sub]);
			}
		} else {
			results.push([i]);
		}
	}

	return results;
}

function nchoose1(n) {
	let results = [];
	for (let i = 0; i < n; i++) {
		results.push(i);
	}
	return results;
}

function nchoose2(n) {
	let results = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			results.push([i, j]);
		}
	}
	return results;
}

function nchoose3(n) {
	let results = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			for (let k = j + 1; k < n; k++) {
				results.push([i, j, k]);
			}
		}
	}
	return results;
}

// console.log(nchoose1(4));
// console.log(nchoose2(4));
// console.log(nchoose3(4));
// console.log(nchoose4(4));
// console.log(nchooser(4, 3));
// console.log(nchoosera([10, 20, 30, 40], 3));
