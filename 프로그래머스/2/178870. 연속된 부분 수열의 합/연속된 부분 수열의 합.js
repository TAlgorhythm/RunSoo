function solution(sequence, k) {
    let start = 0, end = 0, sum = 0;
    let minLength = Infinity;
    let result = [];

    while (end < sequence.length) {
        sum += sequence[end];

        while (sum >= k) {
            if (sum === k) {
                if (end - start + 1 < minLength) {
                    minLength = end - start + 1;
                    result = [start, end];
                }
            }
            sum -= sequence[start];
            start++;
        }
        end++;
    }

    return result.length === 0 ? [] : result;
}
