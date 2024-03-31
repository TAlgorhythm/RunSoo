const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(arr[0]);
  let i = 665;
  let cnt = 0;
  while (true) {
    const check = i.toString();
    if (check.match(/666/)) {
      cnt++;
      if (cnt === N) return i;
    }
    i++;
  }
}

console.log(solution(input));