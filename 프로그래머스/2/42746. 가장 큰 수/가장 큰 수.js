function solution(numbers) {
    numbers.sort((a, b)=>Number(b+""+a)-Number(a+""+b));
    if (numbers[0]===0) return "0";
    return numbers.reduce((a, b)=> a+b, "");
}