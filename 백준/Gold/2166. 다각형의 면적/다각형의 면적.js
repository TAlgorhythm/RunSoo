const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(arr[0]);
  const nodes = arr
    .slice(1)
    .map((el) => el.split(" ").map((num) => Number(num)));
  let area = 0;
  for (let i = 0; i < N - 1; i++) {
    area += nodes[i][0] * nodes[i + 1][1] - nodes[i][1] * nodes[i + 1][0];
  }
  area += nodes[N - 1][0] * nodes[0][1] - nodes[N - 1][1] * nodes[0][0];
  area = Math.abs(area) / 2;
  return (Math.round(area * 100) / 100).toFixed(1);
}

console.log(solution(input));