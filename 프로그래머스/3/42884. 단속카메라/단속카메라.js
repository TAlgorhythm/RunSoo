function solution(routes) {
    
    routes.sort((a, b)=>a[1]-b[1]);
    let cam = -30001;
    let answer = 0;
    
    for (let i=0; i<routes.length; i++){
        if (cam < routes[i][0]){
            answer++;
            cam = routes[i][1];
        }
    }
    
    return answer;
}