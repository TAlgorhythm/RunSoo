const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 경로 압축
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }
    }
  }
}

function isBetween(p, dot) {
  const [x1, y1, x2, y2] = p;
  const [x, y] = dot;

  const xMax = Math.max(x1, x2);
  const xMin = Math.min(x1, x2);
  const yMax = Math.max(y1, y2);
  const yMin = Math.min(y1, y2);
  return xMin <= x && x <= xMax && yMin <= y && y <= yMax;
}

function intersect(p1, p2) {
  const [x1, y1, x2, y2] = p1;
  const [x3, y3, x4, y4] = p2;

  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (d === 0) {
    // 평행
    const a1 = (y2 - y1) / (x2 - x1);
    const a2 = (y4 - y3) / (x4 - x3);
    const b1 = y1 - a1 * x1;
    const b2 = y3 - a2 * x3;

    if (a1 === a2 && b1 === b2) {
      // 두 선분이 같은 직선에 있는 경우, 겹치는지 확인
      return (
        isBetween(p1, [x3, y3]) ||
        isBetween(p1, [x4, y4]) ||
        isBetween(p2, [x1, y1]) ||
        isBetween(p2, [x2, y2])
      );
    }
    return false;
  }

  // 교차점
  const x =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
  const y =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;

  return isBetween(p1, [x, y]) && isBetween(p2, [x, y]);
}

function solution(arr) {
  const N = Number(arr[0]);
  const lines = arr.slice(1).map((el) => el.split(" ").map(Number));

  const uf = new UnionFind(N);

  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (intersect(lines[i], lines[j])) {
        uf.union(i, j);
      }
    }
  }

  const countArr = Array.from({ length: N }, () => 0);
  const set = new Set();
  let maxCnt = 0;

  for (let i = 0; i < N; i++) {
    const root = uf.find(i);
    set.add(root);
    countArr[root]++;
    maxCnt = Math.max(maxCnt, countArr[root]);
  }

  return `${set.size}\n${maxCnt}`;
}

console.log(solution(input));