function solution(money) {
    const N = money.length;
    const dp1 = new Array(N).fill(0); // 0번 집 턴다
    const dp2 = new Array(N).fill(0); // 0번 집 안턴다
    
    dp1[0] = money[0];
    dp1[1] = Math.max(money[0], money[1]);
    for (let i=2; i<N-1; i++){
        dp1[i] = Math.max(dp1[i-1], dp1[i-2]+money[i]);
    }
    
    dp2[1] = money[1];
    for (let i=2; i<N; i++){
        dp2[i] = Math.max(dp2[i-1], dp2[i-2]+money[i]);
    }
    
    return Math.max(dp1[N-2], dp1[N-3], dp2[N-1], dp2[N-2]);
}