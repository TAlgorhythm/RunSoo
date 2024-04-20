import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	static int N, M;
	static int[][] height;
	static boolean[][] visited;
	static int[] dr = {-1, 1, 0, 0};
	static int[] dc = {0, 0, -1, 1};
	static int[][] waterheight;
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		height = new int[N][M];
		for (int r=0; r<N; r++) {
			st = new StringTokenizer(br.readLine());
			for (int c=0; c<M; c++) {
				height[r][c]=Integer.parseInt(st.nextToken());
			}
		}
		////////////////////
		visited = new boolean[N][M];
		
		waterheight = new int[N][M];
		
		for (int r=1; r<N-1; r++) {
			for (int c=1; c<M-1; c++) {
				if (height[r][c]<height[r-1][c] && height[r][c]<height[r][c-1] && !visited[r][c]) {
//					System.out.println("r: "+r+", c: "+c);
					bfs(r, c);
				}
			}
		}
//		for (int r=0; r<N; r++) {
//			System.out.println(Arrays.toString(visited[r]));
//		}
//		
//		for (int r=0; r<N; r++) {
//			System.out.println(Arrays.toString(waterheight[r]));
//		}
		
		int allwater = 0;
		for (int r=0; r<N; r++) {
			for (int c=0; c<M; c++) {
				allwater+=waterheight[r][c];
			}
		}
		
		System.out.println(allwater);
	}
	private static void bfs(int ir, int ic) {
		int maxh = height[ir][ic]; // 물 중 최대 높이
		outer: while (true) {
			int minwall = Integer.MAX_VALUE;
			boolean[][] cvisit = new boolean[N][M];
			int wcnt=0; // 물
			int cnt=0; // 칸(물인) 개수
			Queue<Integer[]> queue = new LinkedList<Integer[]>();
			queue.add(new Integer[] {ir, ic});
			cnt++;
			wcnt+=maxh-height[ir][ic];
			cvisit[ir][ic]=true;
			while (!queue.isEmpty()) {
				Integer[] top = queue.poll();
//				System.out.println(Arrays.toString(top));
				for (int d=0; d<4; d++) {
					int nr = top[0]+dr[d];
					int nc = top[1]+dc[d];
					if (!cvisit[nr][nc]) {
						if (height[nr][nc]>maxh) {
							minwall = Math.min(minwall, height[nr][nc]);
						} else {
							if (nr==0 || nr==N-1 || nc==0 || nc==M-1) {
								break outer;
							}
							wcnt+= maxh-height[nr][nc];
							cnt++;
							cvisit[nr][nc]=true;
							queue.add(new Integer[] {nr, nc});
						}
					}
				}
			}
			// 지금 물 양 계산하자
			// (가장 낮은 벽 - 물 최대 높이) * 칸 수 더해줘야
			wcnt+=(minwall-maxh)*cnt;
			waterheight[ir][ic]=wcnt;
			
//			System.out.println("maxh: "+maxh);
//			System.out.println("minwall: "+minwall);
//			System.out.println("cnt: "+cnt);
			
			maxh = minwall;
			
			
			for (int r=0; r<N; r++) {
				for (int c=0; c<M; c++) {
					if (cvisit[r][c]) {
						visited[r][c]=true;
					}
				}
			}
		}
	}
}