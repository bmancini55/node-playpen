import { expect } from 'chai';
import * as tree from '../src/interval-tree-centered';

describe('Interval Tree - Centered Implementation', () => {
	describe('add', () => {
		it('adds single', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			expect(root.center).to.equal(4);
			expect(root.intervals[0].low).to.equal(4);
		});

		it('adds center lower overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 4));
			expect(root.center).to.equal(4);
			expect(root.intervals[0].low).to.equal(4);
			expect(root.intervals[1].low).to.equal(3);
		});

		it('adds center upper overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(4, 7));
			expect(root.center).to.equal(4);
			expect(root.intervals[0].low).to.equal(4);
			expect(root.intervals[1].low).to.equal(4);
		});

		it('adds center total overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 7));
			expect(root.center).to.equal(4);
			expect(root.intervals[0].low).to.equal(4);
			expect(root.intervals[1].low).to.equal(3);
		});

		it('adds to s_left', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 3));
			expect(root.left.center).to.equal(3);
		});

		it('adds to s_right', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(6, 8));
			expect(root.right.center).to.equal(7);
		});
	});

	describe('.pointIntersection()', () => {
		it('none returns 0', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			expect(tree.pointIntersections(root, 3)).to.equal(0);
		});

		it('returns single', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 5));
			expect(tree.pointIntersections(root, 3)).to.equal(1);
		});

		it('returns duplicate single', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 5));
			tree.insert(root, new tree.Interval(3, 5));
			expect(tree.pointIntersections(root, 3)).to.equal(2);
		});

		it('returns duplicate single', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 5));
			tree.insert(root, new tree.Interval(3, 5));
			expect(tree.pointIntersections(root, 3)).to.equal(2);
		});

		it('returns left overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(3, 5));
			tree.insert(root, new tree.Interval(3, 3));
			expect(tree.pointIntersections(root, 3)).to.equal(2);
		});

		it('returns left->right overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(5, 5));
			tree.insert(root, new tree.Interval(3, 5));
			tree.insert(root, new tree.Interval(2, 2));
			tree.insert(root, new tree.Interval(3, 3));
			expect(tree.pointIntersections(root, 3)).to.equal(2);
		});

		it('returns right overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(5, 5));
			expect(tree.pointIntersections(root, 5)).to.equal(2);
		});

		it('returns right->left overlap', () => {
			const root = tree.insert(undefined, new tree.Interval(4, 5));
			tree.insert(root, new tree.Interval(6, 6));
			tree.insert(root, new tree.Interval(5, 5));
			expect(tree.pointIntersections(root, 5)).to.equal(2);
		});
	});
});
