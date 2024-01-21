function solution(n) {
    var answer = 0;
    
    let arr = n.toString().split("");
    let ansArr = arr.sort((a, b)=>b-a);
    
    answer = Number(ansArr.reduce((a, b)=>a+""+b));
    
    return answer;
}