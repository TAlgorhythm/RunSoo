const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [X, Y] = arr[0].split(" ").map(Number);
  if (X === Y) return 0;
  if (X + 1 === Y) return 1;
  const maxUp = Math.floor(Math.sqrt(Y - X));
  let result = 2 * maxUp - 1;
  if (maxUp ** 2 !== Y - X) {
    const diff = Y - X - maxUp ** 2;
    result += Math.ceil(diff / maxUp);
  }
  return result;
}

console.log(solution(input));