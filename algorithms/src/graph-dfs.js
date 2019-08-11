exports.dfsVisit = dfsVisit;
exports.rdfsVisit = rdfsVisit;
exports.rdfsFinish = rdfsFinish;

/**
 * DFS shows the order of visiting of nodes using a stack implementation
 *
 * @param {Graph} g graph
 * @param {string} start
 * @returns {number[]} visited
 */
function dfsVisit(g, start) {
	let explored = new Set();
	let visited = [];
	let stack = [];

	let node = g.getNode(start);
	stack.push(node);
	while (stack.length) {
		let i = stack.pop();
		explored.add(i);
		visited.push(i);

		let edges = g.getEdges(i);
		for (let edge of edges) {
			if (!explored.has(edge)) {
				stack.push(edge);
			}
		}
	}
	return visited;
}

/**
 * Recursive DFS shows the order of visiting of nodes
 *
 * @param {Graph} g graph
 * @param {string} start
 * @returns {number[]} visited
 */
function rdfsVisit(g, start) {
	let explored = new Set();
	let visited = [];

	dfs(g, start);

	function dfs(g, i) {
		explored.add(i);
		visited.push(i);
		let edges = g.getEdges(i);
		for (let j of edges) {
			if (!explored.has(j)) {
				dfs(g, j);
			}
		}
	}

	return visited;
}

/**
 * Recursive DFS shows the order of node completions. IE:
 * Sorted by when sub-crawls are complete IE: the sink is first.
 *
 * @param {Graph} g graph
 * @param {string} start
 * @returns {number[]} visited
 */
function rdfsFinish(g, start) {
	let explored = new Set();
	let finish = [];

	dfs(g, start);

	function dfs(g, i) {
		explored.add(i);
		let edges = g.getEdges(i);
		for (let j of edges) {
			if (!explored.has(j)) {
				dfs(g, j);
			}
		}
		finish.push(i);
	}

	return finish;
}
