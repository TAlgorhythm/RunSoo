const fs = require("fs");
// TODO: 제출 시 경로 변환("/dev/stdin")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const N = Number(input[0]);
  const trees = input.slice(1).map((line) => line.split(" ").map(Number));
  trees.sort((a, b) => b[2] - a[2]);

  let minCnt = Infinity;

  // minR, maxR, minC, maxC 구하는 함수
  const getFence = (arr) => {
    let minR = Infinity;
    let maxR = -Infinity;
    let minC = Infinity;
    let maxC = -Infinity;
    for (const [r, c, len] of arr) {
      minR = Math.min(minR, r);
      maxR = Math.max(maxR, r);
      minC = Math.min(minC, c);
      maxC = Math.max(maxC, c);
    }
    return [minR, maxR, minC, maxC];
  };
  // 울타리 길이 구하는 함수
  const getFenceLength = (arr) => {
    const [minR, maxR, minC, maxC] = getFence(arr);
    return 2 * (maxR - minR + maxC - minC);
  };

  // 울타리 밖에 있는지 아닌지 구하는 함수
  const isOutside = (arr, tree) => {
    const [minR, maxR, minC, maxC] = getFence(arr);
    if (tree[0] < minR || tree[0] > maxR || tree[1] < minC || tree[1] > maxC)
      return true;
    return false;
  };

  // 조합 -> 주어진 배열에서 r개 선택해서 조합 생성
  function getCombination(arr, r) {
    const result = [];

    function combine(startIdx, combination) {
      if (combination.length === r) {
        result.push(combination.slice());
        return;
      }

      for (let i = startIdx; i < arr.length; i++) {
        combination.push(arr[i]);
        combine(i + 1, combination);
        combination.pop();
      }
    }

    combine(0, []);

    return result;
  }

  for (let r = 2; r < 5; r++) {
    const corners = getCombination(trees, r);
    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      const fence = getFenceLength(corner);
      let cnt = 0;
      let material = 0;
      const inside = [];
      trees.forEach((tree) => {
        if (isOutside(corner, tree)) {
          cnt++;
          material += tree[2];
        } else if (corner.findIndex((el) => el === tree) === -1) {
          inside.push(tree);
        }
      });
      while (material < fence && inside.length > 0) {
        const tree = inside.shift();
        cnt++;
        material += tree[2];
      }
      if (material >= fence) {
        minCnt = Math.min(minCnt, cnt);
      }
    }
  }
  if (minCnt === Infinity) return N - 1;
  else return minCnt;
}

console.log(solution(input));