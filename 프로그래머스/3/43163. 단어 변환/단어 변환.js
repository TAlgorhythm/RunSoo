function solution(begin, target, words) {
    if (!words.includes(target)) return 0; 

    const visited = new Array(words.length).fill(false);
    let queue = [{ word: begin, steps: 0 }]; 

    while (queue.length > 0) {
        const { word, steps } = queue.shift(); 

        if (word === target) return steps; 

        words.forEach((nextWord, index) => {
            if (!visited[index] && oneDiff(word, nextWord)) {
                visited[index] = true; 
                queue.push({ word: nextWord, steps: steps + 1 }); 
            }
        });
    }

    return 0;
}

function oneDiff(a, b) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) count++;
        if (count > 1) return false;
    }
    return count === 1;
}