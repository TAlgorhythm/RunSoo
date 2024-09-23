import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
	static int[] dr = { -1, -1, 0, 1, 1, 1, 0, -1 };
	static int[] dc = { 0, -1, -1, -1, 0, 1, 1, 1 };

	static int maxAte = 0;

	static class Fish {
		int idx, r, c, dir;
		boolean alive;

		Fish(int idx, int r, int c, int dir, boolean alive) {
			this.idx = idx;
			this.r = r;
			this.c = c;
			this.dir = dir;
			this.alive = alive;
		}
	}

	static class Shark {
		int r, c, dir, ate;

		Shark(int r, int c, int dir, int ate) {
			this.r = r;
			this.c = c;
			this.dir = dir;
			this.ate = ate;
		}
	}

	public static void main(String[] args) throws Exception, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		List<Fish> fishes = new ArrayList<>();
		int[][] map = new int[4][4];

		for (int r = 0; r < 4; r++) {
			String[] str = br.readLine().split(" ");
			for (int c = 0; c < 4; c++) {
				int fishIdx = Integer.parseInt(str[2 * c]);
				int fishDir = Integer.parseInt(str[2 * c + 1]) - 1;
				map[r][c] = fishIdx;
				fishes.add(new Fish(fishIdx, r, c, fishDir, true));
			}
		}

		Collections.sort(fishes, new Comparator<Fish>() {
			@Override
			public int compare(Fish f1, Fish f2) {
				return f1.idx-f2.idx;
			}
		});

		Fish initialFish = fishes.get(map[0][0] - 1);
		Shark shark = new Shark(0, 0, initialFish.dir, initialFish.idx);
		initialFish.alive = false;
		map[0][0] = -1;

		dfs(fishes, map, shark);

		System.out.println(maxAte);
	}

	public static void dfs(List<Fish> fishes, int[][] map, Shark shark) {
		maxAte = Math.max(maxAte, shark.ate);

		moveAllFish(fishes, map);

		boolean canMove = false;
		for (int dis = 1; dis <= 3; dis++) {
			int nr = shark.r + dr[shark.dir] * dis;
			int nc = shark.c + dc[shark.dir] * dis;

			if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && map[nr][nc] > 0) {
				canMove = true;

				int[][] newMap = copyArray(map);
				List<Fish> newFishes = copyList(fishes);

				Fish eatenFish = newFishes.get(newMap[nr][nc] - 1);
				Shark newShark = new Shark(nr, nc, eatenFish.dir, shark.ate + eatenFish.idx);
				eatenFish.alive = false;

				newMap[shark.r][shark.c] = 0;
				newMap[nr][nc] = -1;

				dfs(newFishes, newMap, newShark);
			}
		}

		if (!canMove) {
			return;
		}
	}

	public static void moveAllFish(List<Fish> fishes, int[][] map) {
		for (Fish fish : fishes) {
			if (!fish.alive)
				continue;
			moveFish(fish, fishes, map);
		}
	}

	public static void moveFish(Fish fish, List<Fish> fishes, int[][] map) {
		for (int d = 0; d < 8; d++) {
			int ndir = (fish.dir + d) % 8;
			int nr = fish.r + dr[ndir];
			int nc = fish.c + dc[ndir];

			if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && map[nr][nc] != -1) {
				int targetFishIdx = map[nr][nc];
				if (targetFishIdx == 0) {
					map[fish.r][fish.c] = 0;
				} else {
					Fish targetFish = fishes.get(targetFishIdx - 1);
					targetFish.r = fish.r;
					targetFish.c = fish.c;
					map[fish.r][fish.c] = targetFish.idx;
				}
				map[nr][nc] = fish.idx;
				fish.r = nr;
				fish.c = nc;
				fish.dir = ndir;
				break;
			}
		}
	}

	public static List<Fish> copyList(List<Fish> fishes) {
		List<Fish> newList = new ArrayList<>();
		for (Fish fish : fishes) {
			newList.add(new Fish(fish.idx, fish.r, fish.c, fish.dir, fish.alive));
		}
		return newList;
	}

	public static int[][] copyArray(int[][] map) {
		int[][] newMap = new int[4][4];
		for (int r = 0; r < 4; r++) {
			for (int c = 0; c < 4; c++) {
				newMap[r][c] = map[r][c];
			}
		}
		return newMap;
	}
}