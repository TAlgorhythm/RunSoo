const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function solution(arr) {
  const [R, C] = arr[0].split(" ").map(Number);
  const board = Array.from({ length: R }, () => []);
  for (let r = 0; r < R; r++) {
    board[r] = arr[r + 1]
      .trim()
      .split("")
      .map((el) => el.charCodeAt(0) - 65);
  }
  const alphabet = new Array("Z".charCodeAt(0) - "A".charCodeAt(0) + 1).fill(
    false
  );
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  let maxCnt = 0;
  const dfs = (r, c, cnt, alphabet) => {
    let flag = false;
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < R && nc >= 0 && nc < C && !alphabet[board[nr][nc]]) {
        flag = true;
        alphabet[board[nr][nc]] = true;
        dfs(nr, nc, cnt + 1, alphabet);
        alphabet[board[nr][nc]] = false;
      }
    }
    if (!flag) {
      maxCnt = Math.max(maxCnt, cnt);
      return;
    }
  };
  alphabet[board[0][0]] = true;
  dfs(0, 0, 1, alphabet);
  return maxCnt;
}

console.log(solution(input));