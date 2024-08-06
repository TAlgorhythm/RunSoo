function solution(m, n, puddles) {
    const rest = 1000000007;
    const dp = Array.from({ length: n }, () => Array(m).fill(0));
    
    dp[0][0] = 1; 

    puddles.forEach(([x, y]) => {
        dp[y - 1][x - 1] = -1;
    });

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (dp[i][j] === -1) {
                dp[i][j] = 0; 
                continue;
            }

            if (i > 0) {
                dp[i][j] += dp[i - 1][j];
                dp[i][j] %= rest;
            }

            if (j > 0) {
                dp[i][j] += dp[i][j - 1];
                dp[i][j] %= rest;
            }
        }
    }
    
    return dp[n - 1][m - 1];
}