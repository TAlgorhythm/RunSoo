const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(input) {
  const [V, E] = input[0].split(" ").map((el) => Number(el)); // 정점 개수, 간선 개수
  const edges = [];
  input
    .slice(1)
    .forEach((el) => edges.push(el.split(" ").map((num) => Number(num))));
  edges.sort((a, b) => a[2] - b[2]);

  const root = Array.from({ length: V + 1 }, (_, idx) => idx);
  const rank = new Array(V + 1).fill(0);

  const find = (a) => {
    if (root[a] !== a) {
      root[a] = find(root[a]);
    }
    return root[a];
  };

  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA !== rootB) {
      if (rank[rootA] > rank[rootB]) {
        root[rootB] = rootA;
      } else if (rank[rootA] < rank[rootB]) {
        root[rootA] = rootB;
      } else {
        root[rootB] = rootA;
        rank[rootA] += 1;
      }
    }
  };

  let result = 0;
  for (let i = 0; i < edges.length; i++) {
    if (find(edges[i][0]) !== find(edges[i][1])) {
      union(edges[i][0], edges[i][1]);
      result += edges[i][2];
    }
  }
  return result;
}

console.log(solution(input));