const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  arr = arr
    .slice(0, arr.length - 1)
    .map((el) => el.trim().split(" ").slice(1, el.length).map(Number));
  let answer = "";
  for (let tc = 0; tc < arr.length; tc++) {
    const stack = [];
    let maxArea = 0;
    let index = 0;

    while (index < arr[tc].length) {
      if (
        stack.length === 0 ||
        arr[tc][stack[stack.length - 1]] <= arr[tc][index]
      ) {
        stack.push(index++);
      } else {
        const top = stack.pop();
        const area =
          arr[tc][top] *
          (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
        maxArea = Math.max(maxArea, area);
      }
    }

    while (stack.length > 0) {
      const top = stack.pop();
      const area =
        arr[tc][top] *
        (stack.length === 0 ? index : index - stack[stack.length - 1] - 1);
      maxArea = Math.max(maxArea, area);
    }
    answer += maxArea + "\n";
  }
  return answer;
}

console.log(solution(input));
