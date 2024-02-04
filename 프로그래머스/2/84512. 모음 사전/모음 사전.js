function solution(word) {
    var answer = 0;
    
    let prec = new Array(5).fill(0);
    
    prec[4]=1;
    for (let i=3; i>=0; i--){
        prec[i] = prec[i+1]*5+1;
    }
    
    let alphabet = ['A', 'E', 'I', 'O', 'U'];
    
    for (let i=0; i<word.length; i++){
        answer+=alphabet.indexOf(word[i])*prec[i]+1;
    }
    
    return answer;
}