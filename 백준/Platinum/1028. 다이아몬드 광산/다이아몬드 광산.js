const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [R, C] = arr[0].split(" ").map(Number);
  const diamond = arr.slice(1).map((el) => el.split("").map(Number));
  const dl = Array.from({ length: R }, () => new Array(C).fill(0));
  const dr = Array.from({ length: R }, () => new Array(C).fill(0));
  let maxLen = 0;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (diamond[r][c] === 1) {
        maxLen = Math.max(maxLen, 1);
        if (r - 1 >= 0 && c + 1 < C && diamond[r - 1][c + 1] === 1) {
          dl[r][c] = dl[r - 1][c + 1] + 1;
          maxLen = Math.max(maxLen, dl[r][c]);
        } else {
          dl[r][c] = 1;
        }
        if (r - 1 >= 0 && c - 1 >= 0 && diamond[r - 1][c - 1] === 1) {
          dr[r][c] = dr[r - 1][c - 1] + 1;
          maxLen = Math.max(maxLen, dr[r][c]);
        } else {
          dr[r][c] = 1;
        }
      }
    }
  }
  if (maxLen === 0) return 0;
  while (maxLen > 0) {
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (dl[r][c] >= maxLen && dr[r][c] >= maxLen) {
          if (
            dl[r - maxLen + 1][c - maxLen + 1] >= maxLen &&
            dr[r - maxLen + 1][c + maxLen - 1] >= maxLen
          ) {
            return maxLen;
          }
        }
      }
    }
    maxLen--;
  }
}

console.log(solution(input));