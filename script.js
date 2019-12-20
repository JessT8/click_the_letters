//Global Variables
var word = "abcd";
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordArray = word.split("");
var letterBoxes = document.querySelectorAll(".letterBox");
var word = document.querySelectorAll(".letterBox");

//win condition
var checkLetter = function(){
      var correctLetter = false;
      var displayClicked = document.querySelector("#lettersClicked");
      var displayLettersLeft = document.querySelector("#lettersLeft");
      //if current letter click is the letter in the array
      if(this.innerHTML === wordArray[0]){
        correctLetter = true;
        displayClicked.innerText += wordArray.shift();
        displayLettersLeft.innerText = wordArray.join("");
      }
      return correctLetter;
}

//add letters and click events to letter box
var addLetterBoxesProperties = function(){
     for(var i = 0; i< letterBoxes.length ; i ++){
        letterBoxes[i].innerHTML = letters[i];
         letterBoxes[i].addEventListener('click',checkLetter);
     }
}
addLetterBoxesProperties();