const fs = require('fs');

// const file = './input/greedy_jobs_4.txt'; // 20
// const file = './input/greedy_jobs_10.txt'; // 74649
// const file = './input/greedy_jobs_20.txt'; // 178314
// const file = './input/greedy_jobs_1280.txt'; // 1141923488
const file = './input/greedy_jobs.txt';

const fileData = fs.readFileSync(file, 'utf8');
const jobs = fileData
	.split('\n')
	.slice(1)
	.filter(p => p)
	.map(p => p.split(' ').map(Number));

function diffRank(jobs) {
	// calculate the weight
	for (let job of jobs) {
		job[2] = job[0] - job[1];
	}

	// sort by diff weight first, then break ties based on weight
	jobs.sort((i, j) => {
		if (i[2] > j[2]) return -1;
		if (i[2] < j[2]) return 1;
		if (i[0] > j[0]) return -1;
		if (i[0] < j[0]) return 1;
		return 0;
	});
}

diffRank(jobs);

jobs[0][3] = jobs[0][1];
for (let i = 1; i < jobs.length; i++) {
	jobs[i][3] = jobs[i - 1][3] + jobs[i][1];
}

let total = jobs.reduce((sum, j) => sum + j[0] * j[3], 0);
// console.log(jobs);
console.log(total);
