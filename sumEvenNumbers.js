function sumEvenNumbers(start = 1, end = 100) {
    // Add your code here
    let sum=0;
    for(let i=start;i<=end;i++){
        if(i%2==0){
            sum+=i;
        }
    }
    return sum;
}

console.log(sumEvenNumbers());
module.exports = sumEvenNumbers;
