const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(arr[0]);
  const A = arr[1].split(" ").map(Number);
  const B = [];
  for (let i = 0; i < N; i++) {
    if (B.length === 0 || B[B.length - 1] < A[i]) {
      B.push(A[i]);
    } else {
      let start = 0;
      let end = B.length - 1;
      while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (B[mid] >= A[i]) {
          end = mid;
        } else {
          start = mid + 1;
        }
      }
      B[start] = A[i];
    }
  }
  return B.length;
}

console.log(solution(input));