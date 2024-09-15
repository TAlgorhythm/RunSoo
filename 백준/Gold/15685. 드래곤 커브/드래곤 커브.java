import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {
	public static Set<List<Integer>> totCoor = new HashSet<>();
	public static int[] dLen = new int[11];
	public static void main(String[] args) throws Exception, IOException{
		// 입력 받기
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		int[][] curves = new int[N][4];
		for (int i=0; i<N; i++) {
			String[] str = br.readLine().split(" ");
			for (int c=0; c<4; c++) {
				curves[i][c] = Integer.parseInt(str[c]);
			}
		}
		
		// dLen[0] 설정
		dLen[0]=2;
		
		// 드래곤 좌표 만들기
		for (int curve=0; curve<N; curve++) {
			// 이 드래곤 커브의 좌표들 담을 배열
			int[][] dCoor = new int[getDLen(curves[curve][3])][2];
			// 0세대 좌표 담기
			dCoor[0][0] = curves[curve][0]; dCoor[0][1] = curves[curve][1];
			dCoor[1][0] = dCoor[0][0]; dCoor[1][1]=dCoor[0][1];
			switch (curves[curve][2]) {
			case 0:
				dCoor[1][0]+=1;
				break;
			case 1:
				dCoor[1][1]-=1;
				break;
			case 2:
				dCoor[1][0]-=1;
				break;
			case 3:
				dCoor[1][1]+=1;
				break;
			default:
				break;
			}
			
			// 나머지 세대 드래곤 좌표 구하기
			makeDCurve(curves[curve][3], dCoor, 0);
		}
		
		// 찾은 좌표들로 칸 찾기
		int result = 0;
		for (List<Integer> coor: totCoor) {
			if (hasSquare(coor.get(0), coor.get(1))) result++;
		}
		System.out.println(result);
	}
	
	public static int getDLen(int g) {
		if (dLen[g]!=0) return dLen[g];
		return dLen[g] = (getDLen(g-1)-1)*2+1;
	}
	
	public static void makeDCurve(int g, int[][] dCoor, int curG) {
		if (g==0 || curG==g) {
			for (int[] coor: dCoor) {
				totCoor.add(Arrays.asList(coor[0], coor[1]));
			}
			return;
		}
		int lastIdx = getDLen(curG)-1;
		int lx = dCoor[lastIdx][0];  int ly = dCoor[lastIdx][1];
		for (int i=1; i<=lastIdx; i++) {
			int ox = dCoor[lastIdx-i][0]; int oy = dCoor[lastIdx-i][1];
			int dx = ox-lx; int dy = oy-ly;
			int nx = lx-dy; int ny = ly+dx;
			if (nx>=0 && nx<=100 && ny>=0 && ny<=100) {
				dCoor[lastIdx+i][0] = nx; dCoor[lastIdx+i][1]=ny;
			}
		}
		makeDCurve(g, dCoor, curG+1);
	}
	
	public static boolean hasSquare(int x, int y) {
		if (!totCoor.contains(Arrays.asList(x+1, y))) return false;
		if (!totCoor.contains(Arrays.asList(x, y+1))) return false;
		if (!totCoor.contains(Arrays.asList(x+1, y+1))) return false;
		return true;
	}
}