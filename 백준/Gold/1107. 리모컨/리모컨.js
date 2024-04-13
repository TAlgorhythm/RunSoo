const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(input[0]);
  // 목표 채널 배열
  const target = Array.from(input[0].trim()).map((el) => Number(el)); // ['5', '0', '0', '0', '0', '0']
  const M = Number(input[1]);

  if (M === 0) {
    return Math.min(Math.abs(100 - N), target.length);
  }

  // 고장난 버튼
  const broken = Array.from(
    input[2]
      .trim()
      .split(" ")
      .map((el) => Number(el))
  );
  // 멀쩡 버튼
  const buttons = new Set();
  for (let i = 0; i <= 9; i++) {
    buttons.add(i);
  }
  for (let i = 0; i < broken.length; i++) {
    buttons.delete(broken[i]);
  }

  // 1. 100에서 +, - 해서 갈 때 횟수
  const from100 = Math.abs(100 - N);
  // // 직접 누르는 것보다 이게 더 작으면 리턴
  if (target.length >= from100 || buttons.size === 0) {
    return from100;
  }

  // 2. 숫자 직접 입력할 때 횟수 구하기
  // // 숫자 다 입력 가능한지 확인
  let idx = -1; // 처음으로 불가능한 인덱스
  for (let i = 0; i < target.length; i++) {
    if (!buttons.has(target[i])) {
      idx = i;
      break;
    }
  }

  if (idx === -1) {
    return target.length;
  }
  let press = Infinity;

  let result = from100;

  // 아니면 어떤 수 만들지 -> 가장 가까운 더 큰 수, 작은 수
  let bigger = N;
  let smaller = N;

  // 가능한지
  function checkPress(number) {
    const numArr = Array.from("" + number).map((el) => Number(el));
    for (let i = 0; i < numArr.length; i++) {
      if (!buttons.has(numArr[i])) {
        return false;
      }
    }
    return true;
  }

  // 큰 수 구하기
  while (true) {
    bigger++;
    if (String(bigger).length + bigger - N > result) break;
    if (checkPress(bigger)) {
      result = Math.min(result, String(bigger).length + bigger - N);
    }
  }

  while (true) {
    smaller--;
    if (String(smaller).length + N - smaller > result) break;
    if (checkPress(smaller)) {
      result = Math.min(result, String(smaller).length + N - smaller);
    }
  }

  return result;
}

console.log(solution(input));