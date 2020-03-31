import { expect } from 'chai';
import * as range from '../src/bst-range';

describe('bst-range', () => {
	it('1', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 1, 1)).to.deep.equal([1]);
	});

	it('2', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 2, 2)).to.deep.equal([2]);
	});

	it('3', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 3, 3)).to.deep.equal([3]);
	});

	it('1,2', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 1, 2)).to.deep.equal([1, 2]);
	});

	it('2,3', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 2, 3)).to.deep.equal([2, 3]);
	});

	it('1,2,3', () => {
		const root = range.bstAdd(undefined, 2);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		expect(range.bstRange(root, 1, 3)).to.deep.equal([1, 2, 3]);
	});

	it('2,3', () => {
		const root = range.bstAdd(undefined, 4);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		range.bstAdd(root, 2);
		range.bstAdd(root, 7);
		range.bstAdd(root, 5);
		range.bstAdd(root, 8);
		range.bstAdd(root, 6);
		expect(range.bstRange(root, 2, 3)).to.deep.equal([2, 3]);
	});

	it('6,7,8', () => {
		const root = range.bstAdd(undefined, 4);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		range.bstAdd(root, 2);
		range.bstAdd(root, 7);
		range.bstAdd(root, 5);
		range.bstAdd(root, 8);
		range.bstAdd(root, 6);
		expect(range.bstRange(root, 6, 8)).to.deep.equal([6, 7, 8]);
	});

	it('3,4,5,6', () => {
		const root = range.bstAdd(undefined, 4);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		range.bstAdd(root, 2);
		range.bstAdd(root, 7);
		range.bstAdd(root, 5);
		range.bstAdd(root, 8);
		range.bstAdd(root, 6);
		expect(range.bstRange(root, 3, 6)).to.deep.equal([3, 4, 5, 6]);
	});

	it('all', () => {
		const root = range.bstAdd(undefined, 4);
		range.bstAdd(root, 1);
		range.bstAdd(root, 3);
		range.bstAdd(root, 2);
		range.bstAdd(root, 7);
		range.bstAdd(root, 5);
		range.bstAdd(root, 8);
		range.bstAdd(root, 6);
		expect(range.bstRange(root, 1, 10)).to.deep.equal([
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
		]);
	});
});
