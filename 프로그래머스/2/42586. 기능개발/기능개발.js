function solution(progresses, speeds) {
    var answer = [];
    
    const queue = new Array();
    for (let i=0; i<progresses.length; i++){
        queue.push([progresses[i], i]);
    }

    let idx=0;
    while (queue.length>0){
    // for (let j=0; j<progresses.length; j++){
        let done = 0;
        let len = queue.length;
        let front = 0;
        for (let i=0; i<len; i++){
            const progress = queue.shift();
            const result = progress[0]+speeds[progress[1]];
            if (result>=100 && front==0) {
                done++;
            }
            else {
                queue.push([result, progress[1]]);
                front++;
            }
            
        }
        if (done>0) answer.push(done);
        idx++;
    }
    
    return answer;
}