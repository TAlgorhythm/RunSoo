function solution(n, computers) {
    let answer = 0;
    const visited = new Array(n).fill(false);

    function bfs(start) {
        const queue = [start];
        visited[start] = true;

        while (queue.length) {
            const node = queue.shift();
            for (let i = 0; i < n; i++) {
                if (computers[node][i] === 1 && !visited[i]) {
                    queue.push(i);
                    visited[i] = true;
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            answer++;
            bfs(i);
        }
    }

    return answer;
}
