import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
       
        int[] results = new int[12];
        results[1] = 1;
        results[2] = 2;
        results[3] = 4;
        for (int i=4; i<=11; i++){
            results[i] = results[i-1]+results[i-2]+results[i-3];
        }
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<n; i++){
            int cases = Integer.parseInt(br.readLine());
            sb.append(results[cases]+"\n");
        }
        System.out.println(sb);
    }
}