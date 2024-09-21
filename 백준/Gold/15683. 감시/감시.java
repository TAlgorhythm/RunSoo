import java.io.*;
import java.util.*;

public class Main {
    static class Tv {
        int r, c, type, dirCnt;

        Tv(int r, int c, int type) {
            this.r = r;
            this.c = c;
            this.type = type;
            if (type == 5)
                this.dirCnt = 1;
            else if (type == 2)
                this.dirCnt = 2;
            else
                this.dirCnt = 4;
        }

        @Override
        public String toString() {
            return "Tv{r=" + r + ", c=" + c + ", type=" + type + "}";
        }
    }

    static List<Tv> tvs = new ArrayList<>();
    static int minBlindSpot = Integer.MAX_VALUE;
    static int N, M;
    static int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}; // 상, 하, 좌, 우

    public static void main(String[] args) throws Exception, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        int[][] room = new int[N][M];

        for (int r = 0; r < N; r++) {
            st = new StringTokenizer(br.readLine());
            for (int c = 0; c < M; c++) {
                room[r][c] = Integer.parseInt(st.nextToken());
                if (room[r][c] > 0 && room[r][c] < 6) {
                    tvs.add(new Tv(r, c, room[r][c]));
                }
            }
        }

        dfs(0, room);
        System.out.println(minBlindSpot);
    }

    public static void dfs(int idx, int[][] room) {
        if (idx == tvs.size()) {
            minBlindSpot = Math.min(minBlindSpot, countBlindSpots(room));
            return;
        }

        Tv curTv = tvs.get(idx);
        int[][] directionsForType = getDirectionsForType(curTv.type);

        for (int[] dirs : directionsForType) {
            int[][] copiedRoom = copyArr(room);
            for (int dir : dirs) {
                watch(curTv.r, curTv.c, dir, copiedRoom);
            }
            dfs(idx + 1, copiedRoom);
        }
    }

    public static void watch(int r, int c, int dir, int[][] room) {
        int nr = r + directions[dir][0];
        int nc = c + directions[dir][1];

        while (nr >= 0 && nr < N && nc >= 0 && nc < M) {
            if (room[nr][nc] == 6) break; 
            if (room[nr][nc] == 0) room[nr][nc] = -1; 
            nr += directions[dir][0];
            nc += directions[dir][1];
        }
    }

    public static int[][] copyArr(int[][] arr) {
        int[][] result = new int[arr.length][arr[0].length];
        for (int i = 0; i < arr.length; i++) {
            result[i] = arr[i].clone();
        }
        return result;
    }

    public static int countBlindSpots(int[][] room) {
        int count = 0;
        for (int[] row : room) {
            for (int cell : row) {
                if (cell == 0) count++;
            }
        }
        return count;
    }

    public static int[][] getDirectionsForType(int type) {
        if (type == 1) return new int[][] {{0}, {1}, {2}, {3}};
        if (type == 2) return new int[][] {{0, 1}, {2, 3}}; 
        if (type == 3) return new int[][] {{0, 3}, {3, 1}, {1, 2}, {2, 0}}; 
        if (type == 4) return new int[][] {{0, 2, 3}, {0, 1, 3}, {1, 2, 3}, {0, 1, 2}}; 
        if (type == 5) return new int[][] {{0, 1, 2, 3}}; 
        return new int[0][];
    }
}