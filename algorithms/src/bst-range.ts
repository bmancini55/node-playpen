export class Node {
	value: number;
	left: Node;
	right: Node;
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
