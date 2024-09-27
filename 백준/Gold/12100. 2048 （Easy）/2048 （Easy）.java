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
	        for (int r = 0; r < N; r++) {
	            for (int c = 0; c < N; c++) {
	                maxBlock = Math.max(maxBlock, board[r][c]);
	            }
	        }
	        return;
	    }

		int[][] upBoard = copyArr(board);
		int[][] downBoard = copyArr(board);
		int[][] leftBoard = copyArr(board);
		int[][] rightBoard = copyArr(board);

		moveUp(upBoard);
		dfs(upBoard, cnt + 1);

		moveDown(downBoard);
		dfs(downBoard, cnt + 1);

		moveLeft(leftBoard);
		dfs(leftBoard, cnt + 1);

		moveRight(rightBoard);
		dfs(rightBoard, cnt + 1);

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

	public static void moveDown(int[][] board) {
		for (int c = 0; c < N; c++) {
			Queue<Integer> cQ = new LinkedList<>();
			int rIdx = N - 1;
			for (int r = N - 1; r >= 0; r--) {
				if (board[r][c] != 0)
					cQ.offer(board[r][c]);
				board[r][c] = 0;
			}
			while (!cQ.isEmpty()) {
				Integer top = cQ.poll();
				if (top.equals(cQ.peek())) {
					top += cQ.poll();
					maxBlock = Math.max(maxBlock, top);
				}
				board[rIdx--][c] = top;
			}
		}
	}

	public static void moveLeft(int[][] board) {
		for (int r = 0; r < N; r++) {
			Queue<Integer> rQ = new LinkedList<>();
			int cIdx = 0;
			for (int c = 0; c < N; c++) {
				if (board[r][c] != 0)
					rQ.offer(board[r][c]);
				board[r][c] = 0;
			}
			while (!rQ.isEmpty()) {
				Integer top = rQ.poll();
				if (top.equals(rQ.peek())) {
					top += rQ.poll();
					maxBlock = Math.max(maxBlock, top);
				}
				board[r][cIdx++] = top;
			}
		}
	}

	public static void moveRight(int[][] board) {
		for (int r = 0; r < N; r++) {
			Queue<Integer> rQ = new LinkedList<>();
			int cIdx = N - 1;
			for (int c = N - 1; c >= 0; c--) {
				if (board[r][c] != 0)
					rQ.offer(board[r][c]);
				board[r][c] = 0;
			}
			while (!rQ.isEmpty()) {
				Integer top = rQ.poll();
				if (top.equals(rQ.peek())) {
					top += rQ.poll();
					maxBlock = Math.max(maxBlock, top);
				}
				board[r][cIdx--] = top;
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