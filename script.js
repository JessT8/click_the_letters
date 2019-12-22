//Global Variables
var listOfWords = ["One","Two","Three","Four","Five"];
var word = "";
var displayLettersLeft = document.querySelector("#lettersLeft");
var displayClicked = document.querySelector("#lettersClicked");
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var wordArray = [];
var letterBoxes = document.querySelectorAll(".letterBox");
var word = document.querySelectorAll(".letterBox");
var row = document.querySelector('.row');
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
         this.innerText = "";
      }
      var displayEndGame = endGame();
      if(displayEndGame){
        alert("You won!");
      }
      return correctLetter;
}


//create the letters at an interval
var createLetters = function(){

    //create every 725 miliseconds
    var id = setInterval(creatingLetter, 725);

    function creatingLetter(){
        //clear when created 6 div to use and reuse
        if(letterBoxes.length >= 6){
              clearInterval(id);
        }
        else{
            var box = document.createElement('div');
            pos.push(0);
            var randomLetter = Math.floor(Math.random()*letters.length);
            box.innerHTML = letters[randomLetter];
            box.addEventListener('click',checkLetter);
            box.className = "letterBox";
            row.appendChild(box);
            letterBoxes = document.querySelectorAll(".letterBox");
        }
    }
}
var moving = function() {
   for(var i = 0; i< letterBoxes.length ; i ++){
        if (pos[i] === 878) {
            var randomLetter = Math.floor(Math.random()*letters.length);
            pos[i]=0;
            //ensure that there is at least 1 letter that matches the current letters needed to be clicked
            if(i === 0){
                letterBoxes[i].innerHTML = wordArray[0].toUpperCase();
            }
        } else {
                pos[i]++;
                letterBoxes[i].style.left = pos[i] + 'px';
            }
            if(pos[i]===0 && i !== 0){
               letterBoxes[i].innerHTML = letters[randomLetter];
            }
    }
  }

 var moveBox = setInterval(moving, 5);




var endGame = function() {
    var gameEnded = false;
    //when word array is empty
    if(wordArray.length === 0){
        listOfWords.shift();
        //when all words entered
        if(listOfWords.length === 0){
               gameEnded = true;
              clearInterval(moveBox);
              row.innerHTML = "";
              listOfWords = ["One","Two","Three","Four","Five"];
              word = "";

          }
        else{
            displayClicked.innerText= "";
            displayText();

        }
    }
    return gameEnded;
}

//Create box
createLetters();

/*https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=5&limit=10&api_key=YOURAPIKEY*/