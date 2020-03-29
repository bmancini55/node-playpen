import { expect } from 'chai';
import * as kdtree from '../src/kd-tree';

describe('KD Tree', () => {
	describe('insert', () => {
		it('should insert root', () => {
			const actual = kdtree.insert(undefined, [3, 6]);
			expect(actual.value).to.deep.equal([3, 6]);
		});
		it('should insert x-right', () => {
			const root = kdtree.insert(undefined, [3, 6]);
			kdtree.insert(root, [17, 15]);
			expect(root.right.value).to.deep.equal([17, 15]);
		});

		it('should insert y-right', () => {
			const root = kdtree.insert(undefined, [3, 6]);
			kdtree.insert(root, [17, 15]);
			kdtree.insert(root, [13, 15]);
			expect(root.right.right.value).to.deep.equal([13, 15]);
		});

		it('should insert y-left', () => {
			const root = kdtree.insert(undefined, [3, 6]);
			kdtree.insert(root, [17, 15]);
			kdtree.insert(root, [13, 15]);
			kdtree.insert(root, [6, 12]);
			expect(root.right.left.value).to.deep.equal([6, 12]);
		});

		it('should insert y-left', () => {
			const root = kdtree.insert(undefined, [3, 6]);
			kdtree.insert(root, [17, 15]);
			kdtree.insert(root, [13, 15]);
			kdtree.insert(root, [6, 12]);
			expect(root.right.left.value).to.deep.equal([6, 12]);
		});

		it('should insert x-left', () => {
			const root = kdtree.insert(undefined, [3, 6]);
			kdtree.insert(root, [17, 15]);
			kdtree.insert(root, [13, 15]);
			kdtree.insert(root, [6, 12]);
			kdtree.insert(root, [2, 7]);
			expect(root.left.value).to.deep.equal([2, 7]);
		});
	});
});
