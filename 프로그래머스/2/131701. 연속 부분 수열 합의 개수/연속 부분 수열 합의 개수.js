function solution(elements) {
    var answer = 0;
    
    let sums = new Set();
    
    for (let len=1; len<=elements.length; len++){
        for (let i=0; i<elements.length*2; i++){
            let sum = 0;
            for (let j=i; j<i+len; j++){
                sum+=elements[j%elements.length];
            }
            sums.add(sum);
        }
    }
    answer=sums.size;
    
    return answer;
}