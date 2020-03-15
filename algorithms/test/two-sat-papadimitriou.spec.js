const { expect } = require('chai');
const { twoSatPapadimitriou } = require('../src/two-sat-papadimitriou');

describe('twoSatPapadimitriou', () => {
	it('should return for satisfiable', () => {
		const n = 2;
		const clauses = [[1, -2], [-1, 2]];
		const result = twoSatPapadimitriou(n, clauses);
		expect(result).to.be.true;
	});

	it('should return false for unsatisfiable', () => {
		const n = 2;
		const clauses = [[1, 1], [-1, -1]];
		const result = twoSatPapadimitriou(n, clauses);
		expect(result).to.be.false;
	});

	it('should return false for unsatisfiable', () => {
		const n = 4;
		const clauses = [[1, 2], [1, -2], [-1, 2], [-1, -2]];
		const result = twoSatPapadimitriou(n, clauses);
		expect(result).to.be.false;
	});
});
