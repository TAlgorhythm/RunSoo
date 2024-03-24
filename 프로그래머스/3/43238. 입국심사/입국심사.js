function solution(n, times) {
    // 시간을 구해야 해...
    // 가능한 최소시간 => 1 최대시간 => 가장 짧은애가... 다 검사해!
    times.sort((a, b)=>a-b);
    let min = 1;
    let max = times[0]*n;

    while (min<=max){
        let mid = Math.floor((min+max)/2);
        let cnt = times.reduce((acc, cur) => {
            return acc + Math.floor(mid / cur); 
        }, 0);
        if (n > cnt) { 
            min = mid + 1;
        } else { 
            max = mid - 1;
        }
    }
    return min;
}