const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(arr[0]);
  const primeArr = [];
  let prime = 2;
  let sum = 0;

  while (prime <= N) {
    let isPrime = true;
    for (let i = 0; i < primeArr.length; i++) {
      if (prime % primeArr[i] === 0) {
        isPrime = false;
        break;
      }
      if (prime < primeArr[i] ** 2) break;
    }
    if (isPrime) {
      primeArr.push(prime);
    }
    prime++;
  }

  let start = 0;
  let end = 0;
  let answer = 0;

  while (end < primeArr.length) {
    if (sum < N) {
      sum += primeArr[end];
      end++;
    } else if (sum > N) {
      sum -= primeArr[start];
      start++;
    } else {
      answer++;
      sum += primeArr[end];
      end++;
    }
  }

  while (sum >= N) {
    if (sum === N) {
      answer++;
    }
    sum -= primeArr[start];
    start++;
  }

  return answer;
}

console.log(solution(input));