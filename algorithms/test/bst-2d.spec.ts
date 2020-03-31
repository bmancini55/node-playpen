import { expect } from 'chai';
import * as bst2d from '../src/bst-2d';

describe('bst-2d', () => {
	it('should return ranges', () => {
		const bst = new bst2d.Bst2d();
		bst.add(1, 10);
		bst.add(2, 7);
		bst.add(5, 8);
		bst.add(3, 4);
		expect(bst.range(0, 3, 3, Number.MAX_SAFE_INTEGER)).to.deep.equal([
			[1, 10],
			[2, 7],
			[3, 4],
		]);
	});

	it('should return ranges', () => {
		const bst = new bst2d.Bst2d();
		bst.add(3, 6);
		bst.add(17, 15);
		bst.add(13, 15);
		bst.add(6, 12);
		bst.add(2, 7);
		expect(bst.range(0, 6, 6, Number.MAX_SAFE_INTEGER)).to.deep.equal([
			[2, 7],
			[3, 6],
			[6, 12],
		]);
	});
});
