const fs = require("fs");
// TODO: 제출 시 경로 변환("/dev/stdin")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const str1 = input[0].trim();
  const str2 = input[1].trim();
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array.from({ length: len1 + 1 }, () =>
    new Array(len2 + 1).fill(0)
  );

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcsLen = dp[len1][len2];
  let result = `${lcsLen}\n`;

  let i = len1;
  let j = len2;
  let lcs = "";

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  result += lcs;
  return result;
}

console.log(solution(input));