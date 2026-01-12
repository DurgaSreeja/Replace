// const prompt=require("prompt-sync")();

function getUserInput() {
  return parseInt(prompt("Enter a number : "));
}

function output (num){
  console.log(`Thank you, your number is: [${num}]`);
}

function inputValidation(getUserInput, output) {
  let num=0;
 do {
    num=getUserInput()
 } while (num<=0);
 output(num)
}

// inputValidation(getUserInput,output);
module.exports = inputValidation;
