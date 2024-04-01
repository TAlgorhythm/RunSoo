const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [N, M] = arr[0].split(" ").map(Number);
  const chess = arr.slice(1, N + 1);
  const patterns = ["BWBWBWBW", "WBWBWBWB"];
  let minCnt = Infinity;

  for (let x = 0; x <= N - 8; x++) {
    for (let y = 0; y <= M - 8; y++) {
      let cnt = [0, 0];
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (chess[x + i][y + j] !== patterns[i % 2][j]) cnt[0]++;
          if (chess[x + i][y + j] !== patterns[(i + 1) % 2][j]) cnt[1]++;
        }
      }
      minCnt = Math.min(minCnt, ...cnt);
    }
  }
  return minCnt;
}

console.log(solution(input));