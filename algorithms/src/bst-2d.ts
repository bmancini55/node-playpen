export class Node {
	value: number;
	left: Node;
	right: Node;
}

export class Bst2d {
	_xroot: Node;
	_yroots: Map<number, Node> = new Map();

	add(x: number, y: number) {
		this._xroot = bstAdd(this._xroot, x);
		this._yroots.set(x, bstAdd(this._yroots.get(x), y));
	}

	range(x0: number, x1: number, y0: number, y1: number) {
		const xs = bstRange(this._xroot, x0, x1);
		const results = [];
		for (let x of xs) {
			const ys = bstRange(this._yroots.get(x), y0, y1);
			for (let y of ys) {
				results.push([x, y]);
			}
		}
		return results;
	}
}

export function bstAdd(root: Node, value: number) {
	if (!root) {
		root = new Node();
		root.value = value;
		return root;
	}

	if (value < root.value) {
		root.left = bstAdd(root.left, value);
		return root;
	} else {
		root.right = bstAdd(root.right, value);
		return root;
	}
}

export function bstRange(root: Node, start: number, end: number) {
	let results = [];
	if (!root) return results;
	results.push(...bstRange(root.left, start, end));
	if (root.value >= start && root.value <= end) results.push(root.value);
	results.push(...bstRange(root.right, start, end));
	return results;
}
