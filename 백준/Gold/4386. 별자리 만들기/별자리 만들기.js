const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  // 노드의 개수
  const n = Number(arr[0]);
  const position = arr
    .slice(1)
    .map((el) => el.split(" ").map((num) => Number(num)));

  const distance = (a, b) => {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  };

  // 모든 간선의 가중치
  const edges = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([i, j, distance(position[i], position[j])]);
    }
  }

  edges.sort((a, b) => a[2] - b[2]);

  const root = Array.from({ length: n }, (_, idx) => idx);
  const rank = new Array(n).fill(0);

  const find = (a) => {
    if (root[a] !== a) {
      root[a] = find(root[a]);
    }
    return root[a];
  };

  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rank[rootA] > rank[rootB]) {
      root[rootB] = rootA;
    } else if (rank[rootA] < rank[rootB]) {
      root[rootA] = rootB;
    } else {
      root[rootB] = rootA;
      rank[rootA] += 1;
    }
  };

  let cost = 0;
  for (let i = 0; i < edges.length; i++) {
    if (find(edges[i][0]) !== find(edges[i][1])) {
      union(edges[i][0], edges[i][1]);
      cost += edges[i][2];
    }
  }
  return cost;
}

console.log(solution(input));