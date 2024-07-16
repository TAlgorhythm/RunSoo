const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [N, M] = arr[0].split(" ").map(Number);
  const rodes = arr.slice(1).map((el) => el.split(" ").map(Number));
  rodes.sort((a, b) => a[2] - b[2]);
  let added = 0;
  const parent = Array.from({ length: N + 1 }, (_, idx) => idx);
  const rank = new Array(N + 1).fill(0);

  if (N === 2) return 0;

  const findParent = (num) => {
    if (num === parent[num]) return num;
    return findParent(parent[num]);
  };

  const union = (a, b) => {
    const aParent = findParent(a);
    const bParent = findParent(b);
    if (aParent === bParent) return false;
    if (rank[aParent] !== rank[bParent]) {
      if (rank[aParent] < rank[bParent]) parent[aParent] = bParent;
      else if (rank[aParent] > rank[bParent]) parent[bParent] = aParent;
    } else {
      rank[aParent]++;
      parent[bParent] = aParent;
    }
    return true;
  };

  let lastAdded = 0;
  const visited = new Array(N + 1).fill(false);
  let visitedCnt = 0;

  for (let i = 0; i < M; i++) {
    const [a, b, cost] = rodes[i];
    const result = union(a, b);
    if (result) {
      lastAdded = cost;
      added += cost;
      if (!visited[a]) {
        visited[a] = true;
        visitedCnt++;
      }
      if (!visited[b]) {
        visited[b] = true;
        visitedCnt++;
      }
    }
  }
  return added - lastAdded;
}

console.log(solution(input));
