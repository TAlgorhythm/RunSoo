const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const set = new Set();
  for (let i = 1; i < arr.length; i++) {
    set.add(arr[i]);
  }
  const words = [...set];
  words.sort((a, b) => a.length - b.length || a.localeCompare(b));
  const result = words.join("\n");
  return result;
}

console.log(solution(input));