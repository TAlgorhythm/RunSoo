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
  if (target.length >= from100) {
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

  // 아니면 어떤 수 만들지 -> 가장 가까운 더 큰 수, 작은 수
  const bigger = new Array(target.length).fill(Math.min(...[...buttons]));
  const smaller = new Array(target.length).fill(Math.max(...[...buttons]));
  for (let i = 0; i < idx; i++) {
    bigger[i] = target[i];
    smaller[i] = target[i];
  }

  let big = Infinity;
  let small = -1;
  const buttonArr = [...buttons];
  for (let i = 0; i < buttonArr.length; i++) {
    if (buttonArr[i] > target[idx]) big = Math.min(buttonArr[i], big);
    if (buttonArr[i] < target[idx]) small = Math.max(buttonArr[i], small);
  }

  if (big !== Infinity) {
    bigger[idx] = big;
    press = Math.min(press, Number(bigger.join("")) - N);
    if (idx === 0) {
      bigger.fill(Math.max(...buttonArr));
      bigger[0] = 0;
      press = Math.min(press, N - Number(bigger.join(""))) - 1;
    }
  }
  if (small !== -1) {
    smaller[idx] = small;
    press = Math.min(press, N - Number(smaller.join("")));
    if (idx === 0) {
      smaller.fill(Math.min(...buttonArr));
      if (buttons.has(0)) buttons.delete(0);
      press =
        Math.min(
          press,
          Number(
            smaller[0] > 0
              ? smaller[0]
              : Math.min(...[...buttons]) + smaller.join("")
          ) - N
        ) + 1;
    }
  }

  return Math.min(from100, press + target.length);
}

console.log(solution(input));
