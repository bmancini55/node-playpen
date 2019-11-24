module.exports = {
	obstWeight,
	obst,
};

function sum(a) {
	return a.reduce((sum, a) => sum + a, 0);
}

function key(i, j) {
	return `${i},${j}`;
}

function obstWeight(keys, probs) {
	let map = new Map();
	let n = keys.length;
	for (let s = 1; s <= n; s++) {
		for (let t = 0; t <= n - s; t++) {
			let ti = t;
			let tj = ti + s - 1;

			let sumProb = sum(probs.slice(ti, tj + 1));
			let roots = [];
			for (let r = ti; r <= tj; r += 1) {
				let tl = map.get(key(ti, r - 1)) || 0;
				let tr = map.get(key(r + 1, tj)) || 0;
				roots.push(tl + tr);
				// console.log(`n: ${n} s: ${s} t: ${t} r: ${r} ti: ${ti} tj: ${tj} tl: ${tl} tr: ${tr} sum: ${sumProb}`); // prettier-ignore
			}
			let minRoot = Math.min(...roots);
			map.set(key(ti, tj), sumProb + minRoot);
		}
	}
	return map.get(key(0, n - 1));
}

function obst(keys, probs) {
	let weights = new Map();
	let roots = new Map();
	let n = keys.length;
	for (let s = 1; s <= n; s++) {
		for (let t = 0; t <= n - s; t++) {
			let ti = t;
			let tj = ti + s - 1;

			let sumProb = sum(probs.slice(ti, tj + 1));
			let minRootWeight = Number.POSITIVE_INFINITY;
			let minRoot;
			for (let r = ti; r <= tj; r += 1) {
				let tl = weights.get(key(ti, r - 1)) || 0;
				let tr = weights.get(key(r + 1, tj)) || 0;
				if (tl + tr < minRootWeight) {
					minRootWeight = tl + tr;
					minRoot = r;
				}
				// console.log(`n: ${n} s: ${s} t: ${t} r: ${r} ti: ${ti} tj: ${tj} tl: ${tl} tr: ${tr} sum: ${sumProb}`); // prettier-ignore
			}
			roots.set(key(ti, tj), minRoot);
			weights.set(key(ti, tj), sumProb + minRootWeight);
		}
	}

	return constructObst(keys, roots, 0, n - 1);
}

function constructObst(keys, rootMap, i, j) {
	let index = rootMap.get(key(i, j));
	if (index === undefined) return;

	let root = {
		value: keys[index],
		left: constructObst(keys, rootMap, i, index - 1),
		right: constructObst(keys, rootMap, index + 1, j),
	};
	return root;
}
