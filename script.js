//Global Variables
var listOfWords = ["One","Two","Three","Four","Five"];
var word = "";
var displayLettersLeft = document.querySelector("#lettersLeft");
var displayClicked = document.querySelector("#lettersClicked");
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var wordArray = [];
var letterBoxes = document.querySelectorAll(".letterBox");
var word = document.querySelectorAll(".letterBox");
var pos = [];


var displayText = function(){
    word = listOfWords[0];
    wordArray = word.split("");
    displayLettersLeft.innerText = word;
}
displayText();
//win condition
var checkLetter = function(){
      var correctLetter = false;
      //if current letter click is the letter in the array
      if(this.innerHTML === wordArray[0].toUpperCase()){
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
        listOfWords.shift();
        //when all words entered
        if(listOfWords.length === 0)
        gameEnded = true;
        else{
            displayClicked.innerText= "";
            displayText();
        }
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
        if (pos[i] === 878) {
        var randomLetter = Math.floor(Math.random()*letters.length);
        pos[i]=0;
        } else {
                pos[i]++;
                letterBoxes[i].style.left = pos[i] + 'px';
            }
            if(pos[i]===0){
                        letterBoxes[i].innerHTML = letters[randomLetter];
            }
    }
  }

 setInterval(moving, 5);

var creatingBox = setInterval(createLetterBox, 725);
// create box
setInterval(function()
{
    if(letterBoxes.length >= 6){
          clearInterval(creatingBox);
    }
},500);

setInterval(creatingBox, 300);