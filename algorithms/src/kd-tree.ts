export class Node {
	value: number[];

	left: Node;
	right: Node;
}

/**
 * Inserts a new node into a KD tree and returns the root of the modified
 * tree. The depth parameter has a default of zero and is used to determine
 * the dimension of comparison for the insertion.
 * @param root
 * @param point
 * @param depth
 */
export function insert(root: Node, point: number[], depth: number = 0) {
	if (!root) {
		root = new Node();
		root.value = point;
		return root;
	}

	// calculate the current dimension
	const k = point.length;
	const dimension = depth % k;

	if (point[dimension] < root.value[dimension]) {
		root.left = insert(root.left, point, depth + 1);
	} else {
		root.right = insert(root.right, point, depth + 1);
	}

	return root;
}

export function search(root: Node, point: number[]) {
	if (!root) return;
}

export function pointEquals(point1: number[], point2: number[]): boolean {
	if (point1.length !== point2.length) return false;
	for (let i = 0; i < point1.length; i++) {
		if (point1[i] !== point2[i]) return false;
	}
	return true;
}
