function solution(numbers) {
    let answer = new Array(numbers.length).fill(-1);
    
    let idx = [];
    
    for (let i=0; i<numbers.length; i++){
        while (idx.length && numbers[idx[idx.length-1]]<numbers[i]){
            answer[idx.pop()] = numbers[i];
        }
        idx.push(i);
    }
    
    return answer;
}