const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const strArr = input[1]
    .trim()
    .split(" ")
    .sort((a, b) => Number("" + b + a) - Number("" + a + b));
  let result = strArr.reduce((acc, curr) => acc + curr);

  return BigInt(result).toString();
}

console.log(solution(input));