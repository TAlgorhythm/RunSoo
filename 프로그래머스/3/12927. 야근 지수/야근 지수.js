function solution(n, works) {
    works.sort((a,b)=>a-b);
    
    while (n>0 && works.length>0){
        n--;
        const max = works.pop();
        if (max-1>0) {
            if (works[works.length-1]<=max-1){
                works.push(max-1);
            } else {
                works.splice(works.indexOf(max), 0, max-1);
            }
        }
    }
    
    return works.reduce((a, b)=> a+b**2, 0);
}