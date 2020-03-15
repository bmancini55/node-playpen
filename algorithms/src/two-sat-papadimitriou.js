module.exports = {
	twoSatPapadimitriou,
};

/**
 * Solves the 2-SAT problem uusing Papadimitriou's local search algorithm.
 * 2-SAT looks to see if there is an assignment of variables that satisfy
 * the intersection of clauses where terms are unioned. In the 2-SAT problem
 * the clause union two variables.  For example (x1 || !x3) && (!x2 || x3)
 * has two clauses and is satisfyable by x1=true, x2=false or x1=true, x3=true.
 *
 * This algorithm:
 * 	1. runs log2(n) iterations where
 *  2.   a random assignment of variables is selected
 *  3.   for 2*n^2 iterations
 *  4.      checks each clause for correctness
 *  5.      if all are correct, return the assignment
 *  6.      otherwise...
 *  7.        choose a failing clause arbitraily
 *  8.        flip a variable in the clause uniformly at random
 *
 * It is important to randomly flip the variables. This implementation cycles
 * the clauses by on the last failing clause to prevent cycling on the same
 * clauses.
 *
 * The input encoding is an array of clauses where the values are encoded
 * as a reference to the variable.  A negative value indicates a negation of
 * the variable the clause.  For example [1, -5] means variable (1 && !5). The
 * variables are 1 based, and not zero based.
 *
 * @param {number} n
 * @param {Array<[number,number]} clauses
 */
function twoSatPapadimitriou(n, clauses) {
	// use to start next clause
	let entropy = 0;

	// iterate for log2(n) loops
	for (let i = 0; i < Math.log2(n); i++) {
		// find a random assignment of variables which results
		// in an arrray [,1,0,1,0] which would equate to
		// x1=true, x2=false, x3=true, x4=false
		const assignments = genAssignmentRandom(n);

		// iterate 2n^2 times to see if we can find an assignment
		for (let j = 0; j < 2 * n * n; j++) {
			// look through each clause, and if we find a bad one
			// we abort looking for others. We indicate the bad
			// clause by both a vriable and the index to assist
			// with rotation (so that we start looking at the next clause
			// in a future iteration instead of testing the same clause
			// over and over again).
			let badClause;
			for (let i = 0; i < clauses.length; i++) {
				// as we mentioned, rotate through the clauses but loop
				// back around so we aren't testing the same clause over
				// and over again
				const clauseIndex = (entropy + i) % clauses.length;
				const clause = clauses[clauseIndex];
				if (!testClause(assignments, clause)) {
					badClause = clause;
					entropy += clauseIndex + 1;
					break;
				}
			}

			if (!badClause) {
				// we didn't have a bad clause we succeeded!!!
				return true;
			} else {
				// we had a bad clause, so we need to randomly (uniformly)
				// select one of the variables and flip its value
				const flipClause = badClause;
				const flipVar = coinFlip();
				const flip = Math.abs(flipClause[flipVar]);
				assignments[flip] = assignments[flip] ^ 1;
			}
		}
	}
	return false;
}

/**
 * Uniformly flip a 0 or 1
 */
function coinFlip() {
	return Math.floor(Math.random() * 2);
}

/**
 * Test if the caluse is true given the assignments. This uses the encoding
 * where the clauses reference the variable number and use a negative sign
 * to indicate that the term is logically negated.
 * @param {*} assignments
 * @param {*} clause
 */
function testClause(assignments, clause) {
	const [x1, x2] = clause;
	return (
		(x1 < 0 ? !assignments[Math.abs(x1)] : assignments[Math.abs(x1)]) ||
		(x2 < 0 ? !assignments[Math.abs(x2)] : assignments[Math.abs(x2)])
	);
}

/**
 * Generates a random assignment of n variables. It is zero based, but the
 * variables are 1 based, so position 0 will be undefined.
 * @param {number} n
 */
function genAssignmentRandom(n) {
	const results = [];
	for (let i = 1; i <= n; i++) {
		results[i] = coinFlip();
	}
	return results;
}
