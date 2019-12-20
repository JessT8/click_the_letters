//Global Variables
var word = "";
var displayLettersLeft = document.querySelector("#lettersLeft");
var displayText = function(){
    word = "SOMETHING";
    displayLettersLeft.innerText = word;
}
displayText();
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var wordArray = word.split("");
var letterBoxes = document.querySelectorAll(".letterBox");
var word = document.querySelectorAll(".letterBox");

var pos = [];



//win condition
var checkLetter = function(){
      var correctLetter = false;
      var displayClicked = document.querySelector("#lettersClicked");
      //if current letter click is the letter in the array
      if(this.innerHTML === wordArray[0]){
        correctLetter = true;
        displayClicked.innerText += wordArray.shift();
        displayLettersLeft.innerText = wordArray.join("");
        // this.style.backgroundcolor = "Grey";
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


var createLetterBox = function(){
    var box = document.createElement('div');
    var row = document.querySelector('.row');
    pos.push(0);
    var randomLetter = Math.floor(Math.random()*letters.length);
    box.innerHTML = letters[randomLetter];
    box.addEventListener('click',checkLetter);
    box.className = "letterBox";
    row.appendChild(box);
    letterBoxes = document.querySelectorAll(".letterBox");
}
var moving = function() {
   for(var i = 0; i< letterBoxes.length ; i ++){
        if (pos[i] === 887) {
        var randomLetter = Math.floor(Math.random()*letters.length);
        letterBoxes[i].innerHTML = letters[randomLetter];
          pos[i]=0;
        } else {
                pos[i]++;
                letterBoxes[i].style.left = pos[i] + 'px';
            }
    }
  }

 setInterval(moving, 5);

var creatingBox = setInterval(createLetterBox, 750);
// create box
setInterval(function()
{
    if(letterBoxes.length >= 6){
          clearInterval(creatingBox);
    }
},500);

setInterval(creatingBox, 100);