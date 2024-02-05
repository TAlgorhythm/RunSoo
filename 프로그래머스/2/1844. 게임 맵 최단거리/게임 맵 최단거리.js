function solution(maps) {
    let answer = 1;
    
    let n = maps.length;
    let m = maps[0].length;
    
    let dx=[-1, 0, 1, 0], dy = [0, 1, 0, -1];
    
    let queue = [];
    
    queue.push([0, 0]);
    
    let visited = maps;
    
    while(queue.length>0){
        let size = queue.length;
        
        for (let i=0; i<size; i++){
            let [x, y] = queue.shift();
            for (let j=0; j<4; j++){
                if (x+dx[j]>=0 && x+dx[j]<n && y+dy[j]>=0 && y+dy[j]<m && visited[x+dx[j]][y+dy[j]]===1){
                    if (x+dx[j]==n-1 && y+dy[j]===m-1){
                        return answer+1;
                    }
                    queue.push([x+dx[j], y+dy[j]]);
                    visited[x+dx[j]][y+dy[j]]=0;
                }
            }
            
        }
        answer++;
    }
    
    return -1;
}