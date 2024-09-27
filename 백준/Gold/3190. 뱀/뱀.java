import java.io.*;
import java.util.*;

public class Main {
	public static class Spot {
		int r, c;

		Spot(int r, int c) {
			this.r = r;
			this.c = c;
		}

		// 객체 비교시에 주의하기
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null || getClass() != obj.getClass())
				return false;
			Spot spot = (Spot) obj;
			return r == spot.r && c == spot.c;
		}

		@Override
		public int hashCode() {
			return Objects.hash(r, c);
		}
	}

	public static class Direction {
		int sec;
		String dir;

		Direction(int sec, String dir) {
			this.sec = sec;
			this.dir = dir;
		}
	}

	public static class Snake {
		Deque<Spot> body;
		int dr, dc;

		Snake() {
			this.body = new LinkedList<>();
			this.body.offer(new Spot(0, 0));
			this.dr = 0;
			this.dc = 1;
		}

		void turnRight() {
			if (dr == -1 && dc == 0) {
				this.dr = 0;
				this.dc = 1;
			} else if (dr == 1 && dc == 0) {
				this.dr = 0;
				this.dc = -1;
			} else if (dr == 0 && dc == -1) {
				this.dr = -1;
				this.dc = 0;
			} else {
				this.dr = 1;
				this.dc = 0;
			}
		}

		void turnLeft() {
			if (dr == -1 && dc == 0) {
				this.dr = 0;
				this.dc = -1;
			} else if (dr == 1 && dc == 0) {
				this.dr = 0;
				this.dc = 1;
			} else if (dr == 0 && dc == -1) {
				this.dr = 1;
				this.dc = 0;
			} else {
				this.dr = -1;
				this.dc = 0;
			}
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		int K = Integer.parseInt(br.readLine());

		boolean[][] apples = new boolean[N][N];
		for (int a = 0; a < K; a++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			int r = Integer.parseInt(st.nextToken());
			int c = Integer.parseInt(st.nextToken());
			apples[r-1][c-1] = true;
		}
		int L = Integer.parseInt(br.readLine());
		Map<Integer, String> dirMap = new HashMap<>();
		for (int d = 0; d < L; d++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			int sec = Integer.parseInt(st.nextToken());
			String dir = st.nextToken();
			dirMap.put(sec, dir);
		}

		Snake snake = new Snake();

		int duration = 0;
		Set<Spot> trajectory = new HashSet<>();
		trajectory.add(new Spot(0, 0));
		while (true) {
			duration++;

			// 새 머리
			int nr = snake.body.peekLast().r + snake.dr;
			int nc = snake.body.peekLast().c + snake.dc;

			if (trajectory.contains(new Spot(nr, nc)) || nr < 0 || nr >= N || nc < 0 || nc >= N) {
				break;
			}

			snake.body.offer(new Spot(nr, nc));
			trajectory.add(new Spot(nr, nc));

			if (!apples[nr][nc]) {
				Spot tail = snake.body.poll();
				trajectory.remove(tail);
			} else {
				apples[nr][nc]=false;
			}

			if (dirMap.containsKey(duration)) {
				if (dirMap.get(duration).equals("L"))
					snake.turnLeft();
				else if (dirMap.get(duration).equals("D"))
					snake.turnRight();
			}
		}
		System.out.println(duration);

	}
}