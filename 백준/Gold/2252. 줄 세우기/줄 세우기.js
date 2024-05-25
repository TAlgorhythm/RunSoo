const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 위상정렬
function solution(arr) {
  const [N, M] = arr[0].split(" ").map(Number);
  // N명, M은 키 비교한 회수
  const degree = new Array(N + 1).fill(0);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= M; i++) {
    const [a, b] = arr[i].split(" ").map(Number);
    degree[b]++;
    graph[a].push(b);
  }
  const queue = [];
  const result = [];
  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length > 0) {
    const top = queue.shift();
    result.push(top);
    for (let i = 0; i < graph[top].length; i++) {
      if (degree[graph[top][i]] !== 0) {
        degree[graph[top][i]]--;
        if (degree[graph[top][i]] === 0) {
          queue.push(graph[top][i]);
        }
      }
    }
  }
  return result.join(" ");
}

console.log(solution(input));