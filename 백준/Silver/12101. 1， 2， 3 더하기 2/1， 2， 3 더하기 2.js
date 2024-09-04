const fs = require("fs");
// TODO: 제출 시 경로 변환("/dev/stdin")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [n, k] = arr[0].split(" ").map(Number);
  if (n <= 0 || k <= 0) return -1;
  
  const result = Array.from({ length: n + 1 }, () => []);
  
  // 기본 케이스 채우기
  if (n >= 1) result[1].push("1");
  if (n >= 2) {
    result[2].push("2");
    result[2].push("1+1");
  }
  if (n >= 3) {
    result[3].push("3");
    result[3].push("2+1");
    result[3].push("1+2");
    result[3].push("1+1+1");
  }

  // n이 4 이상일 때 결과 생성
  for (let j = 4; j <= n; j++) {
    for (const i of result[j - 1]) {
      result[j].push(i + "+1");
    }
    for (const i of result[j - 2]) {
      result[j].push(i + "+2");
    }
    for (const i of result[j - 3]) {
      result[j].push(i + "+3");
    }
  }

  result[n].sort();

  // k번째 방법이 없는 경우
  if (result[n].length < k) return -1;
  
  // k번째 방법 반환
  return result[n][k - 1];
}

console.log(solution(input));