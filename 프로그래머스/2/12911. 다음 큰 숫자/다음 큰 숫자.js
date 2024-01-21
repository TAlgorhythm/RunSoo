function solution(n) {
    var answer = 0;
    
    let nStr = n.toString(2);
    // console.log(nStr);
    
    let ansStr = new Array(nStr.length+1).fill('0');
    
    let change = -1;
    let cnt1 = 0;
    
    for (let i=0; i<nStr.length; i++){
        if (nStr[i]==='1'){
            cnt1++;
        } else if (nStr[i]==='0' && i<nStr.length-1 && nStr[i+1]==='1'){
            change=i;
            break;
        }
    }
    // console.log('change', change);
    
    
    if (change!==-1){
        ansStr[change+1]='1';
        for (let i=1; i<change; i++){
        ansStr[i]=nStr[i-1]+'';
    }
    for (let i=0; i<cnt1+1; i++){
        ansStr[ansStr.length-1-i]='1';
    }
    } else {
        ansStr[0]='1';
        for (let i=0; i<cnt1-1; i++){
            ansStr[ansStr.length-1-i]='1';
        }
    }
    
    // console.log(ansStr);
    
    let next = '';
    for (let i=0; i<ansStr.length; i++){
        next+=ansStr[i];
    }
    
    answer = parseInt(next, 2);
    
    return answer;
}