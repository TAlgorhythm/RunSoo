function solution(topping) {
    var answer = 0;
    
    const map1 = new Map();
    const map2 = new Map();
    
    map1.set(topping[0], 1);
    for (let i=1; i<topping.length; i++){
        if (map2.has(topping[i])){
            map2.set(topping[i], map2.get(topping[i])+1);
        } else {
            map2.set(topping[i], 1);
        }
    }
    
     if (map1.size===map2.size) answer++;
    
    for (let idx=1; idx<topping.length-1; idx++){
        if (map1.has(topping[idx])){
            map1.set(topping[idx], map1.get(topping[idx])+1);
        } else {
            map1.set(topping[idx], 1);
        }
        if (map2.get(topping[idx])>1){
            map2.set(topping[idx], map2.get(topping[idx])-1);
        } else {
            map2.delete(topping[idx]);
        }
        if (map1.size===map2.size) answer++;
    }
    
    return answer;
}