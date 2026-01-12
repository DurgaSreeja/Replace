// const prompt = require("prompt-sync")();

function getUserInput() {
  return parseInt(prompt("Guess a number from 1-10: "));
};

function output (text){
  console.log(text);
}
function correctNumber(){
  return Math.floor(Math.random() * 10) + 1;
}
function guessingGame(correctNumber, getUserInput, output) {
  while (true) {
    const guess = getUserInput();

    if (guess === correctNumber) {
      output("Congratulations! You guessed it right.");
      break;
    } else if (guess > correctNumber) {
      output("Wrong guess. Try again! The number guessed is high.");
    } else {
      output("Wrong guess. Try again! The number guessed is low.");
    }
  }
}
// guessingGame(correctNumber(),getUserInput,output)
module.exports = guessingGame;
