import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception, IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        char[][] room = new char[N][N];
        
        for (int r = 0; r < N; r++) {
            room[r] = br.readLine().toCharArray();
        }
        
        int aR = 0; 
        int aC = 0; 
        
        // 가로 방향 탐색
        for (int r = 0; r < N; r++) {
            int count = 0;
            for (int c = 0; c < N; c++) {
                if (room[r][c] == '.') {
                    count++;
                } else {
                    if (count >= 2) aR++; 
                    count = 0; 
                }
            }
            if (count >= 2) aR++; 
        }
        
        // 세로 방향 탐색
        for (int c = 0; c < N; c++) {
            int count = 0;
            for (int r = 0; r < N; r++) {
                if (room[r][c] == '.') {
                    count++;
                } else {
                    if (count >= 2) aC++;
                    count = 0; 
                }
            }
            if (count >= 2) aC++; 
        }

        System.out.println(aR + " " + aC);
    }
}