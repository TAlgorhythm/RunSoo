function solution(numbers) {
    var answer = 0;
    
    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    const prime = new Set();
    
    let nums = numbers.split('');
    
    function permutate(arr, num){
        if (arr.length >=1) {
            for (let i=0; i<arr.length; i++){
                const result = num + arr[i];
                const newArr = [...arr];
                newArr.splice(i, 1);
                if (isPrime(result)) prime.add(Number(result));
                permutate(newArr, result);
            }
        }
    }
    
    permutate(nums, '');
    
    return prime.size;
}