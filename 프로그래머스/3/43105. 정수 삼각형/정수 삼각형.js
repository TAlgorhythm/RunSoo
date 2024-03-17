function solution(triangle) {
    let prevRow = [triangle[0][0]];
    
    for (let i = 1; i < triangle.length; i++) {
        const currentRow = new Array(i + 1);
        for (let j = 0; j <= i; j++) {
            const left = j > 0 ? prevRow[j - 1] + triangle[i][j] : Number.MIN_SAFE_INTEGER;
            const right = j < i ? prevRow[j] + triangle[i][j] : Number.MIN_SAFE_INTEGER;

            currentRow[j] = Math.max(left, right);
        }
        prevRow = currentRow; 
    }
    
    return Math.max(...prevRow);
}