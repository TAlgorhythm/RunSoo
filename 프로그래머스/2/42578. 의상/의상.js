function solution(clothes) {
    const map = new Map();
    
    for (let i=0; i<clothes.length; i++){
        map.set(clothes[i][1], (map.get(clothes[i][1])||0)+1);
    }
    
    let num = 1;
    for (const count of map.values()) {
        num *= (count + 1);
    }
    
    return num-1;
}