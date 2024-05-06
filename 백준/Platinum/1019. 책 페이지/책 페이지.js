const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(input[0]);
  let result = new Array(10).fill(0);

  function floorToTen(n, r) {
    return Math.floor(n / Math.pow(10, r)) * Math.pow(10, r);
  }

  const fixed = [];

  const digit = N.toString().length;
  for (let i = digit - 1; i >= 0; i--) {
    let tmp = floorToTen(N, i);
    if (i !== digit - 1) tmp -= floorToTen(N, i + 1);
    const target = Math.floor(tmp / Math.pow(10, i));
    for (let j = 0; j < i; j++) {
      result = result.map((el) => el + target * Math.pow(10, i - 1));
    }
    for (let k = 0; k <= target - 1; k++) {
      result[k] += Math.pow(10, i);
    }

    for (const fix of fixed) {
      result[fix] += target * Math.pow(10, i);
    }

    fixed.push(target);
  }

  for (const fix of fixed) {
    result[fix] += 1;
  }

  for (let i = 0; i < digit; i++) {
    result[0] -= Math.pow(10, i);
  }

  return result.reduce((acc, curr) => acc + curr + " ", "");
}

console.log(solution(input));