export class Interval {
	public low: number;
	public high: number;

	public get center(): number {
		return Math.floor((this.high + this.low) / 2);
	}

	constructor(low: number, high: number) {
		this.low = low;
		this.high = high;
	}

	public intersectsInterval(i2: Interval) {
		return this.low <= i2.high && i2.high <= this.high;
	}

	public intersectsPoint(point: number) {
		return this.low <= point && point <= this.high;
	}
}

export class Node {
	public center: number;
	public min: number = Number.MAX_SAFE_INTEGER;
	public max: number = 0;
	public intervals: Interval[] = [];
	public left: Node;
	public right: Node;

	public static fromInterval(interval: Interval) {
		const result = new Node();
		result.center = interval.center;
		result.add(interval);
		return result;
	}

	public add(interval: Interval) {
		this.intervals.push(interval); // should insert into sorted list by low value
		if (this.min > interval.low) this.min = interval.low;
		if (this.max < interval.high) this.max = interval.high;
	}
}

export function insert(root: Node, interval: Interval) {
	if (!root) {
		return Node.fromInterval(interval);
	}

	// overlaps center
	if (interval.intersectsPoint(root.center)) {
		root.add(interval);
	}
	// completely to the left goes to S_left
	else if (interval.high < root.center) {
		root.left = insert(root.left, interval);
	}
	// completely to the right goes to S_right
	else if (interval.low > root.center) {
		root.right = insert(root.right, interval);
	}
	// this shouldn't happen
	else {
		throw new Error('nope');
	}
	return root;
}

export function pointIntersections(root: Node, point: number) {
	if (!root) return 0;

	let count = 0;
	if (root.min <= point && root.max >= point) {
		for (let i = 0; i < root.intervals.length; i++) {
			if (root.intervals[i].intersectsPoint(point)) count += 1;
		}
	}

	if (point < root.center) {
		count += pointIntersections(root.left, point);
	} else if (point) {
		count += pointIntersections(root.right, point);
	}

	return count;
}
