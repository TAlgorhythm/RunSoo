function solution(gems) {
    let answer = new Array(2).fill(0);
    
    const set = new Set();
    gems.forEach(el=>set.add(el));
    
    let minLen = gems.length+1;
    let maxLen = set.size;
    let start = 0;
    let end = maxLen-1;
    
    const map = new Map();
    for (let i=start; i<=end; i++){
        if (map.has(gems[i])){
            map.set(gems[i], map.get(gems[i])+1);
        } else {
            map.set(gems[i], 1);
        }
    }
    
    while (start<gems.length){
        if (map.size<maxLen) {
            end++;
            if (end===gems.length) break;
            if (map.has(gems[end])){
                map.set(gems[end], map.get(gems[end])+1);
            } else {
                map.set(gems[end], 1);
            }
        }
        
        if (map.size===maxLen) {
            if (minLen>end-start+1){
                minLen = end-start+1;
                answer = [start+1, end+1];
            }
            if (start<end) {
                if (map.get(gems[start])===1){
                    map.delete(gems[start]);
                } else {
                    map.set(gems[start], map.get(gems[start])-1);
                }
                start++;
            }
            else {
                end++;
                if (end===gems.length) break;
                if (map.has(gems[end])){
                    map.set(gems[end], map.get(gems[end])+1);
                } else {
                    map.set(gems[end], 1);
                }
            }
        }
    }
    
    
    return answer;
}