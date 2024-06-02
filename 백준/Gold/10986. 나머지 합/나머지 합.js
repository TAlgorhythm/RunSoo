const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [N, M] = arr[0].split(" ").map(Number);
  const nums = arr[1].split(" ").map(Number);
  const sums = new Array(N).fill(0);
  const rest = new Array(M).fill(0); // 나머지 0부터 M-1까지
  sums[0] = nums[0];
  rest[sums[0] % M]++;
  for (let i = 1; i < N; i++) {
    sums[i] = nums[i] + sums[i - 1];
    rest[sums[i] % M]++;
  }
  let result = rest[0];
  for (let i = 0; i < M; i++) {
    result += (rest[i] * (rest[i] - 1)) / 2;
  }
  return result;
}

console.log(solution(input));