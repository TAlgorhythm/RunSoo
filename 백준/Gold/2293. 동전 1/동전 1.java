import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] input = br.lines().toArray(String[]::new);
        System.out.println(solution(input));
    }

    public static int solution(String[] arr) {
        String[] firstLine = arr[0].split(" ");
        int n = Integer.parseInt(firstLine[0]);
        int k = Integer.parseInt(firstLine[1]);

        int[] values = new int[n];
        for (int i = 1; i <= n; i++) {
            values[i - 1] = Integer.parseInt(arr[i]);
        }
        Arrays.sort(values);

        int[][] dp = new int[n][k + 1];

        for (int r = 0; r < n; r++) {
            dp[r][0] = 1;
        }
        for (int i = 1; i <= k; i++) {
            if (i % values[0] == 0) {
                dp[0][i] = 1;
            } else {
                dp[0][i] = 0;
            }
        }

        for (int r = 1; r < n; r++) {
            for (int c = 1; c <= k; c++) {
                dp[r][c] = dp[r - 1][c] + (c - values[r] >= 0 ? dp[r][c - values[r]] : 0);
            }
        }

        return dp[n - 1][k];
    }
}