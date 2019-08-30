// @ts-check

exports.dijkstra = dijkstra;

/**
 * @typedef {import("./graph-adj-list-directed-weighted").Graph} Graph
 */

/**
 * Runs Dijkstra's algorithms
 * @param {Graph} g
 * @param {string} s
 * @returns {Map<string, number>}
 */
function dijkstra(g, s) {
	// set of visited nodes
	let x = new Set([s]);

	// computed shorted paths for each node
	let a = new Map([[s, 0]]);

	// m is total number of nodes
	let m = g.getNodes().length;

	// loop until all nodes are processed
	while (x.size !== m) {
		let minWeight = Number.MAX_SAFE_INTEGER;

		// w is the unexplored node with the lowest cumulative weight
		let w;

		// for each visited node v in X
		for (let v of x.values()) {
			// get path length to v
			let av = a.get(v);

			// get all edges of v -> w
			let vws = g.getEdges(v);

			// for each edge v -> w
			for (let vw of vws) {
				// if w has already been visited, ignore edge
				if (x.has(vw.head)) continue;

				// otherwise if this edge is the lowest weight edge
				// market it as the minimum weight edge
				if (av + vw.weight < minWeight) {
					w = vw.head;
					minWeight = av + vw.weight;
				}
			}
		}

		// add the lowest cumulative weight node and set its weight
		x.add(w);
		a.set(w, minWeight);
	}
	return a;
}
