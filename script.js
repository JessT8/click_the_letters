//Global Variables
var word = "something";
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordArray = word.split("");
var letterBoxes = document.querySelectorAll(".letterBox");
var word = document.querySelectorAll(".letterBox");
var pos = [];


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
        if (pos[i] === 900) {
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