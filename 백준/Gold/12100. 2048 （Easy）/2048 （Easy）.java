import java.io.*;
import java.util.*;

public class Main {
	static int[] dr = { -1, 1, 0, 0 };
	static int[] dc = { 0, 0, -1, 1 };
	static int maxBlock = 0;
	static int N;

	public static void main(String[] args) throws Exception, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		int[][] board = new int[N][N];
		for (int r = 0; r < N; r++) {
			String[] tmp = br.readLine().split(" ");
			for (int c = 0; c < N; c++) {
				board[r][c] = Integer.parseInt(tmp[c]);
				maxBlock = Math.max(board[r][c], maxBlock);
			}
		}

		dfs(board, 0);

		System.out.println(maxBlock);
	}

	public static void dfs(int[][] board, int cnt) {
		if (cnt == 5) {
			// 이동이 5번 이루어진 후 최종 보드 상태에서 maxBlock 갱신
			for (int r = 0; r < N; r++) {
				for (int c = 0; c < N; c++) {
					maxBlock = Math.max(maxBlock, board[r][c]);
				}
			}
			return;
		}

		for (int d = 0; d < 4; d++) {
			int[][] newBoard = copyArr(board);

			for (int rot = 0; rot < d; rot++) {
				newBoard = rotate(newBoard);
			}

			moveUp(newBoard);
			dfs(newBoard, cnt + 1);
		}
	}

	public static int[][] rotate(int[][] board) {
		int[][] newBoard = new int[N][N];
		for (int r = 0; r < N; r++) {
			for (int c = 0; c < N; c++) {
				newBoard[c][N - 1 - r] = board[r][c];
			}
		}
		return newBoard;
	}

	public static void moveUp(int[][] board) {
		for (int c = 0; c < N; c++) {
			Queue<Integer> cQ = new LinkedList<>();
			int rIdx = 0;
			for (int r = 0; r < N; r++) {
				if (board[r][c] != 0)
					cQ.offer(board[r][c]);
				board[r][c] = 0;
			}
			while (!cQ.isEmpty()) {
				Integer top = cQ.poll();
				if (top.equals(cQ.peek())) {
					top += cQ.poll();
				}
				maxBlock = Math.max(maxBlock, top);
				board[rIdx++][c] = top;
			}
		}
	}

	public static int[][] copyArr(int[][] arr) {
		int[][] curArr = new int[arr.length][arr[0].length];

		for (int r = 0; r < arr.length; r++) {
			for (int c = 0; c < arr[0].length; c++) {
				curArr[r][c] = arr[r][c];
			}
		}

		return curArr;
	}
}