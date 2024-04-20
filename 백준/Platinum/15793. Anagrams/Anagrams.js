const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const strA = arr[0].trim();
  const strB = arr[1].trim();
  const numA = new Array(strA.length)
    .fill()
    .map((_, idx) => strA.charCodeAt(idx) - "A".charCodeAt(0));
  const numB = new Array(strB.length)
    .fill()
    .map((_, idx) => strB.charCodeAt(idx) - "A".charCodeAt(0));
  const arrA = new Array("Z".charCodeAt(0) - "A".charCodeAt(0) + 1).fill(0);
  const arrB = new Array("Z".charCodeAt(0) - "A".charCodeAt(0) + 1).fill(0);

  numA.forEach((el) => arrA[el]++);
  numB.forEach((el) => arrB[el]++);

  let target = strA.length;
  let move = 0;

  let idx = 0;
  while (target > 0) {
    if (arrA[idx] !== 0) {
      if (arrB[idx] !== 0) {
        const both = Math.min(arrA[idx], arrB[idx]);
        arrA[idx] -= both;
        arrB[idx] -= both;
        target -= both;
      }
      arrA[idx + 1 < arrA.length ? idx + 1 : 0] += arrA[idx];
      move += arrA[idx];
      arrA[idx] = 0;
    }
    idx++;
    if (idx === arrA.length) idx = 0;
  }
  return move;
}

console.log(solution(input));