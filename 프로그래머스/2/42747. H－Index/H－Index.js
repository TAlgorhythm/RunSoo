function solution(citations) {
    let h = citations.length; // 최대값
    
    while (true){
        let isCited = 0;
        for (let i=0; i<citations.length; i++){
            if (citations[i]>=h) isCited++;
        }
        if (isCited<h) h--;
        else break;
    }
    
    return h;
}