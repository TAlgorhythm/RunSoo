const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [N, M] = input[0].split(" ").map(Number);
  const board = input.slice(1).map((el) => el.trim().split(""));

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  let rPos = [0, 0];
  let bPos = [0, 0];
  let flag = 0;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] === "R") {
        rPos = [r, c];
        flag++;
      }
      if (board[r][c] === "B") {
        bPos = [r, c];
        flag++;
      }
      if (flag === 2) break;
    }
    if (flag === 2) break;
  }

  const move = (dir, rPos, bPos) => {
    let [rR, cR] = rPos;
    let [rB, cB] = bPos;
    let rInHole = false;
    let bInHole = false;

    while (board[rR + dr[dir]][cR + dc[dir]] !== "#" && board[rR][cR] !== "O") {
      rR += dr[dir];
      cR += dc[dir];
      if (board[rR][cR] === "O") {
        rInHole = true;
        break;
      }
    }

    while (board[rB + dr[dir]][cB + dc[dir]] !== "#" && board[rB][cB] !== "O") {
      rB += dr[dir];
      cB += dc[dir];
      if (board[rB][cB] === "O") {
        bInHole = true;
        break;
      }
    }

    if (bInHole) return "B";
    if (rInHole) return "R";

    if (rR === rB && cR === cB) {
      if (dir === 0) {
        // 위로 이동
        if (rPos[0] > bPos[0]) rR++;
        else rB++;
      } else if (dir === 1) {
        // 아래로 이동
        if (rPos[0] > bPos[0]) rB--;
        else rR--;
      } else if (dir === 2) {
        // 왼쪽으로 이동
        if (rPos[1] > bPos[1]) cR++;
        else cB++;
      } else if (dir === 3) {
        // 오른쪽으로 이동
        if (rPos[1] > bPos[1]) cB--;
        else cR--;
      }
    }

    return [
      [rR, cR],
      [rB, cB],
    ];
  };

  const queue = [];
  const visited = new Set();
  queue.push([rPos, bPos, 1]);
  visited.add(`${rPos[0]},${rPos[1]},${bPos[0]},${bPos[1]}`);

  while (queue.length > 0) {
    const [rCur, bCur, cnt] = queue.shift();

    if (cnt > 10) return -1;

    for (let i = 0; i < 4; i++) {
      const result = move(i, rCur, bCur);
      if (result === "R") return cnt;
      if (result === "B") continue;

      const [[nrR, ncR], [nrB, ncB]] = result;
      const newState = `${nrR},${ncR},${nrB},${ncB}`;

      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push([[nrR, ncR], [nrB, ncB], cnt + 1]);
      }
    }
  }

  return -1;
}

console.log(solution(input));