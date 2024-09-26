import java.io.*;
import java.util.*;

public class Main {
	static class Spot {
		int r, c;

		Spot(int r, int c) {
			this.r = r;
			this.c = c;
		}
	}

	static class State {
		Spot R, B;
		int cnt;

		State(Spot R, Spot B, int cnt) {
			this.R = R;
			this.B = B;
			this.cnt = cnt;
		}
	}

	static int[] dr = { -1, 1, 0, 0 };
	static int[] dc = { 0, 0, -1, 1 };

	public static void main(String[] args) throws Exception, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		// 초기화
		Spot R = new Spot(-1, -1);
		Spot B = new Spot(-1, -1);
		Spot O = new Spot(-1, -1);
		char[][] board = new char[N][M];
		for (int r = 0; r < N; r++) {
			char[] charArr = br.readLine().toCharArray();
			for (int c = 0; c < M; c++) {
				board[r][c] = charArr[c];
				switch (board[r][c]) {
				case 'R':
					R = new Spot(r, c);
					break;
				case 'B':
					B = new Spot(r, c);
					break;
				case 'O':
					O = new Spot(r, c);
					break;
				}
			}
		}

		// 입력받기 끝

		bfs(R, B, O, board);
	}

	static void bfs(Spot R, Spot B, Spot O, char[][] board) {
		Queue<State> queue = new LinkedList<>();
		Set<String> visited = new HashSet<>();

		queue.add(new State(R, B, 0));
		visited.add(R.r + " " + R.c + " " + B.r + " " + B.c);

		while (!queue.isEmpty()) {
			State cur = queue.poll();
			Spot r = cur.R;
			Spot b = cur.B;
			int cnt = cur.cnt;

			if (cnt > 10) {
				System.out.println(-1);
				return;
			}

			for (int d = 0; d < 4; d++) {
				Spot nR = move(r, d, board);
				Spot nB = move(b, d, board);

				if (board[nB.r][nB.c] == 'O')
					continue;

				if (board[nR.r][nR.c] == 'O') {
					System.out.println(cnt < 10 ? cnt + 1 : -1);
					return;
				}

				if (nR.r == nB.r && nR.c == nB.c) {
					adjustPosition(nR, nB, r, b, d);
				}

				String curState = nR.r + " " + nR.c + " " + nB.r + " " + nB.c;
				if (!visited.contains(curState)) {
					visited.add(curState);
					queue.add(new State(nR, nB, cnt + 1));
				}
			}
		}

		System.out.println(-1);
	}

	static Spot move(Spot spot, int d, char[][] board) {
		int r = spot.r;
		int c = spot.c;

		while (board[r + dr[d]][c + dc[d]] != '#' && board[r][c] != 'O') {
			r += dr[d];
			c += dc[d];
			if (board[r][c] == 'O')
				break;
		}
		return new Spot(r, c);
	}

	static void adjustPosition(Spot R, Spot B, Spot r, Spot b, int d) {
		switch (d) {
		case 0:
			if (r.r > b.r)
				R.r += 1;
			else
				B.r += 1;
			break;
		case 1:
			if (r.r < b.r)
				R.r -= 1;
			else
				B.r -= 1;
			break;
		case 2:
			if (r.c > b.c)
				R.c += 1;
			else
				B.c += 1;
			break;
		case 3:
			if (r.c < b.c)
				R.c -= 1;
			else
				B.c -= 1;
			break;
		}
	}

}