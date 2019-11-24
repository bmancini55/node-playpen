const { expect } = require('chai');
const { obstWeight, obst } = require('../src/optimal-binary-search-tree');

describe('Optimal Binary Search Tree', () => {
	describe('obstWeight', () => {
		it('should return weight for a 1 node tree', () => {
			let keys = [1];
			let probs = [0.2];
			expect(obstWeight(keys, probs)).to.closeTo(0.2, 0.01);
		});

		it('should return weight for a 2 node tree', () => {
			let keys = [1, 2];
			let probs = [0.2, 0.1];
			expect(obstWeight(keys, probs)).to.closeTo(0.4, 0.01);
		});

		it('should return weight for a 3 node tree', () => {
			let keys = [1, 2, 3];
			let probs = [0.2, 0.1, 0.4];
			expect(obstWeight(keys, probs)).to.be.closeTo(1.1, 0.01);
		});

		it('should return weight for a 4 node tree', () => {
			let keys = [1, 2, 3, 4];
			let probs = [0.2, 0.1, 0.4, 0.3];
			expect(obstWeight(keys, probs)).to.be.closeTo(1.7, 0.01);
		});

		it('should return weight of larger', () => {
			let keys = [1, 2, 3, 4, 5, 6, 7];
			let probs = [0.2, 0.05, 0.17, 0.1, 0.2, 0.03, 0.25];
			expect(obstWeight(keys, probs)).to.be.closeTo(2.23, 0.01);
		});
	});

	describe('obst', () => {
		it('should return single node', () => {
			let keys = [1, 2, 3, 4];
			let probs = [0.2, 0.1, 0.4, 0.3];
			expect(obst(keys, probs)).to.deep.equal({
				value: 3,
				left: {
					value: 1,
					left: undefined,
					right: {
						value: 2,
						left: undefined,
						right: undefined,
					},
				},
				right: {
					value: 4,
					left: undefined,
					right: undefined,
				},
			});
		});
	});
});
