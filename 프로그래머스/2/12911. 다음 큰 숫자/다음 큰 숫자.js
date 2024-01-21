function solution(n) {
    var answer = 0;
    
    function oneCnt(number) {
        return number.toString(2).split("1").length-1;
    }
    
    answer=n+1;
    
    while (true){
        if (oneCnt(answer)===oneCnt(n)){
            return answer;
        }
        answer++;
    }
}