import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	static int w, h;
	static char[][] room;
	static List<Integer[]> dirt;
	static int[] order;
	static boolean[] writen;
	static int[][] length;
	static int mincnt;
	static int[] dr = {-1, 1, 0, 0};
	static int[] dc = {0, 0, -1, 1};
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		w = Integer.parseInt(st.nextToken());
		h = Integer.parseInt(st.nextToken());
		while (!(w==0 && h==0)) {
			room = new char[h][w];
			for (int r=0; r<h; r++) {
				room[r]=br.readLine().toCharArray();
			}
			dirt = new ArrayList<>();
			for (int r=0; r<h; r++) {
				for (int c=0; c<w; c++) {
					if (room[r][c]=='o') {
						dirt.add(0, new Integer[] {r, c});
					} else if (room[r][c]=='*') {
						dirt.add(new Integer[] {r, c});
					}
				}
			}
			
			order = new int[dirt.size()];
			writen = new boolean[dirt.size()];
			order[0]=0; // 0번째 순서는 dirt중 0번째
			writen[0]=true;
			length = new int[dirt.size()][dirt.size()];
			mincnt=Integer.MAX_VALUE;
			write(1);
			if (mincnt!=Integer.MAX_VALUE) {
				System.out.println(mincnt);
			} else {
				System.out.println(-1);
			}
//			for (int r=0; r<length.length; r++) {
//				System.out.println(Arrays.toString(length[r]));
//			}
			st = new StringTokenizer(br.readLine());
			w = Integer.parseInt(st.nextToken());
			h = Integer.parseInt(st.nextToken());
		}
	}
	private static void write(int idx) {
		if (idx==order.length) {
			int tmp=0;
			for (int i=0; i<dirt.size()-1; i++) {
				if (length[order[i]][order[i+1]]==0) {
					length[order[i]][order[i+1]]=bfs(dirt.get(order[i]), dirt.get(order[i+1]));
					length[order[i+1]][order[i]]=length[order[i]][order[i+1]];
					if (length[order[i]][order[i+1]]==-1) {
						tmp=Integer.MAX_VALUE;
						break;
					}
					tmp+=length[order[i]][order[i+1]];
				} else {
					if (length[order[i]][order[i+1]]==-1) {
						tmp=Integer.MAX_VALUE;
						break;
					}
					tmp+=length[order[i]][order[i+1]];
				}
			}

			mincnt = Math.min(mincnt, tmp);
			return;
		}
		
		for (int i=1; i<dirt.size(); i++) {
			if (!writen[i]) {
				writen[i]=true;
				order[idx]=i;
				write(idx+1);
				writen[i]=false;
			}
		}
	}
	private static int bfs(Integer[] start, Integer[] end) {
		boolean[][] visited = new boolean[h][w];
		Queue<Integer[]> q = new LinkedList<Integer[]>();
		q.add(new Integer[] {start[0], start[1]});
		visited[start[0]][start[1]]=true;
		int cnt=0;
		while (!q.isEmpty()) {
			int size = q.size();
			cnt++;
			for (int i=0; i<size; i++) {
				Integer[] top = q.poll();
				if (top[0]==end[0] && top[1]==end[1]) {
					return cnt-1;
				}
				for (int d=0; d<4; d++) {
					int nr = top[0]+dr[d];
					int nc = top[1]+dc[d];
					if (nr>=0 && nr<h && nc>=0 && nc<w && !visited[nr][nc]) {
						if (room[nr][nc]=='.'|| room[nr][nc]=='o' || room[nr][nc]=='*') {
							visited[nr][nc]=true;
							q.add(new Integer[] {nr, nc});
						}
					}
				}
			}
		}
		return -1;
	}
}