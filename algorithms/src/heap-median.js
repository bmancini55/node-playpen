module.exports.median = median;

function median(hl, hh, v) {
	if (!hl.findMax() || v < hl.findMax()) {
		hl.insert(v);
	} else {
		hh.insert(v);
	}

	let i = hl.size + hh.size;
	let half = Math.ceil(i / 2);

	if (hl.size > half) {
		let val = hl.extractMax();
		hh.insert(val);
	}

	if (hh.size > half) {
		let val = hh.extractMin();
		hl.insert(val);
	}

	if (i % 2 === 1) {
		return hl.size > hh.size ? hl.findMax() : hh.findMin();
	} else {
		return hl.findMax();
	}
}
