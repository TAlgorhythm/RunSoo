function solution(operations) {
    let heap = [];
    const op = operations.map(operation => operation.split(" "));
    
    op.forEach(num => {
        if (num[0]==='I'){
            heap.push(Number(num[1]));
        } else {
            const val = (num[1]==='1' ? Math.max : Math.min)(...heap);
            const idx = heap.indexOf(val);
            heap.splice(idx, 1);
        }
    })
    
    return heap.length ? [Math.max(...heap), Math.min(...heap)]: [0, 0];
}