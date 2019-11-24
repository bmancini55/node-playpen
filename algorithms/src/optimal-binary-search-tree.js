module.exports = {
	obstWeight,
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
