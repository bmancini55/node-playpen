export class Interval {
	public low: number;
	public high: number;

	public static hasOverlap(i1: Interval, i2: Interval) {
		return i1.low <= i2.high && i2.high <= i1.high;
	}

	constructor(low: number, high: number) {
		this.low = low;
		this.high = high;
	}

	public hasOverlap(i2: Interval) {
		return Interval.hasOverlap(this, i2);
	}

	public hasValue(val: number) {
		return this.low <= val && val <= this.high;
	}
}

export class Node {
	public interval: Interval;
	public max: number;
	public left: Node;
	public right: Node;

	public static fromInterval(interval: Interval) {
		const result = new Node();
		result.interval = interval;
		result.max = interval.high;
		return result;
	}
}

export function insert(root: Node, interval: Interval) {
	if (!root) {
		return Node.fromInterval(interval);
	}

	// capture low value
	const low = root.interval.low;

	// roots low value is smaller, new interval goes to left subtree
	if (interval.low < low) {
		root.left = insert(root.left, interval);
	}
	// otherwise go to the right
	else {
		root.right = insert(root.right, interval);
	}

	// update max statistic
	if (root.max < interval.high) {
		root.max = interval.high;
	}

	return root;
}
