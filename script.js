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
      var displayEndGame = endGame();
      if(displayEndGame){
        alert("You won!");
      }
      return correctLetter;
}

var endGame = function() {
    var gameEnded = false;
    //when word array is empty
    if(wordArray.length === 0){
        gameEnded = true;
    }
    return gameEnded;
}

//add letters and click events to letter box
var addLetterBoxesProperties = function(){
     for(var i = 0; i< letterBoxes.length ; i ++){
        letterBoxes[i].innerHTML = letters[i];
         letterBoxes[i].addEventListener('click',checkLetter);
     }
}
addLetterBoxesProperties();

var moveBoxes = function(){
    for(var i = 0; i< letterBoxes.length ; i ++){
        /*getBoundClientRect return the size of an element and its position relative to the viewport*/
        var currentPosition = parseInt(letterBoxes[i].style.left);
        var amountToMove = 50
       letterBoxes[i].style.left = currentPosition + amountToMove + "px";
// letterBoxes[i].style.backgroundColor = "blue";
     }
      console.log( letterBoxes[0].style.left);
}
var pos = 0;
var moving = function() {
    if (pos === 1000) {
      clearInterval(this);
    } else {
      pos++;
      for(var i = 0; i< letterBoxes.length ; i ++){
        letterBoxes[i].style.left = pos + 'px';
      }
    }
  }
setInterval(moving, 5);
var createLetterBox = function(){
    var box = document.createElement('div');
    var row = document.querySelector('.row');

    box.innerHTML = letters[2];
    box.addEventListener('click',checkLetter);
    box.classList.add("letterBox");
    row.appendChild(box);
}

var creatingBox = setInterval(createLetterBox, 1000);
// setInterval(myMove,2000);
setInterval(creatingBox, 100);



setInterval(function()
{
    if(letterBoxes.length >= 7){
          clearInterval(creatingBox);
    }
},3000);