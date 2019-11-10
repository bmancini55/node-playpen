const { expect } = require('chai');
const sut = require('../src/knapsack');

describe('knapsack', () => {
	for (let method of [
		'knapsackNaive',
		'knapsackOptimized',
		'knapsackRecursive',
	]) {
		describe(method, () => {
			const knapsack = sut[method];

			it('should return 0 if no items fit', () => {
				let c = 2;
				let items = [[1, 3]];
				let result = knapsack(items, c);
				expect(result).to.equal(0);
			});

			it('should return value if single value fits', () => {
				let c = 2;
				let items = [[1, 2]];
				let result = knapsack(items, c);
				expect(result).to.equal(1);
			});

			it('should find max when final included', () => {
				let c = 2;
				let items = [[1, 2], [2, 1]];
				let result = knapsack(items, c);
				expect(result).to.equal(2);
			});

			it('should find max final not included', () => {
				let c = 2;
				let items = [[2, 1], [1, 2]];
				let result = knapsack(items, c);
				expect(result).to.equal(2);
			});

			it('should find max when final included', () => {
				let c = 3;
				let items = [[1, 2], [2, 2], [3, 1]];
				let result = knapsack(items, c);
				expect(result).to.equal(5); // items 2 and 3 with weight 2+3 = 5
			});

			it('should find max when final not included', () => {
				let c = 3;
				let items = [[2, 2], [3, 1], [1, 2]];
				let result = knapsack(items, c);
				expect(result).to.equal(5); // items 1 and 2 with weight 2+3=5
			});

			it('should find max for more complex', () => {
				let c = 6;
				let items = [[3, 4], [2, 3], [4, 2], [4, 3]];
				let result = knapsack(items, c);
				expect(result).to.equal(8);
			});
		});
	}
});
