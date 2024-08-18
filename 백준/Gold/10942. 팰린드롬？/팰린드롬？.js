const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(input[0]);
  const nArr = input[1].split(" ").map(Number);
  const M = Number(input[2]);
  const query = input.slice(3).map((el) => el.split(" ").map(Number));

  const dp = Array.from({ length: N }, () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }

  for (let i = 0; i < N - 1; i++) {
    if (nArr[i] === nArr[i + 1]) {
      dp[i][i + 1] = 1;
    }
  }

  for (let len = 3; len <= N; len++) {
    for (let i = 0; i <= N - len; i++) {
      const j = i + len - 1;
      if (nArr[i] === nArr[j] && dp[i + 1][j - 1] === 1) {
        dp[i][j] = 1;
      }
    }
  }

  let answer = "";
  for (const [i, j] of query) {
    answer += dp[i - 1][j - 1] + "\n";
  }

  return answer;
}

console.log(solution(input));