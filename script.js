//Global Variables
var word = "";
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var letterColors = [ '#FFD34AFF', '#8FFFF5FF','#E94D46FF','#5FB2E2FF'];
var replacedLetters;
var wordArray = [];

var startPage = document.querySelector("#startPage");
var startingHeader = document.querySelector("#startingHeader");
var startButton = document.querySelector("#startButton");

//game factors containing health, timer and score
var gameFactors = document.querySelector(".outerContainer");
var display = document.querySelector("#gameStarted");
var levelDisplay = document.querySelector("#levelHeader");
var displayLettersLeft = document.querySelector("#lettersLeft");
var displayClicked = document.querySelector("#lettersClicked");

//row containers contain all the animated letters
var rowContainers = document.querySelector(".rowContainer");
var movingLetters;
var rows;
var pos;

//health related variables
var health = document.querySelector(".healthImg");
var healthArray;
var healthPoints;

var score;
var scoreDisplay = document.querySelector("#scoreDisplay");

var time;
var displayTime = document.querySelector("#timerDisplay");
//variable to stop time based code
var stop;
var level;
var speed;

var setGlobalVariable = function(){

    listOfWords =[[],[],[]];
    setWords();
    document.body.classList.add("backgroundImg");
    wordArray = [];
    rows = [];
    word = "";
    gameFactors.classList.add("hide");
    for(var i = 0; i < 3 ; i++){
        var rowDiv = '.row'+(i+1);
        var row = document.querySelector(rowDiv);
        row.innerHTML = "";
        rows.push(row);
    }

    rowContainers.classList.add('hide');
    display.classList.add("hide");
    pos = [[],[],[]];
    movingLetters = document.querySelectorAll(".letters");
    //clear all time related functions i.e. timer, moving of div and creation of div
    stop = true;
    time = 60;
    score = 0;
    level = 1;
    speed = (level+1) * 0.5;
    healthPoints = 3;
    //set displays
    levelDisplay.innerHTML = "Level "+ level;
    lettersLeft.innerHTML = "";
    displayClicked.innerText = "";
    displayTime.innerHTML = time;
    health.innerHTML = "❤️ ❤️ ❤️";
    healthArray = health.innerHTML.split(" ")
    scoreDisplay.innerHTML = "Score : 0";

}

//make game easier
var setReplaceLetterArray = function(){
    replacedLetters = letters.slice();
    //replace some letters with letter needed
    for(var i = 0 ; i < 6; i++)
    {
        var letterIndex = Math.floor(Math.random()*letters.length);
        replacedLetters[letterIndex] = wordArray[0].toUpperCase();
    }
}
var displayText = function(){
    word = listOfWords[level-1][0];
    wordArray = word.split("");
    //replace some letters with letter needed
     setReplaceLetterArray();
    displayLettersLeft.innerText = word;
}

var minusHealth= function(){
        healthPoints--;
        healthArray[healthPoints] = "🤍";
        health.innerHTML = healthArray.join(" ");
        health = document.querySelector(".healthImg");
}
//check letters clicked
var checkLetter = function(){
      var soundEffect;
      //if current letter click is the letter in the array
      if(this.innerHTML === wordArray[0].toUpperCase()){
        soundEffect = new Audio("Audio/correct.m4a");
        correctLetter = true;
        displayClicked.innerText += wordArray.shift();
        displayLettersLeft.innerText = wordArray.join("");
         this.innerText = "";
         //add 100 for every correct letters
         score = score + 100;
         scoreDisplay.innerHTML = "Score : "+ score;
      }else{
        soundEffect = new Audio("Audio/wrong.m4a");
        minusHealth();
      }
      //hide letter div and play sound effect
      this.classList.add("hide");
      soundEffect.play();

      //call function to check if game ended
      var displayEndGame = endGame();
      if(displayEndGame){
        //final score calculation including health
        score = score + (time * level) + (300* healthPoints);
        startingHeader.innerText = "You won!\nTotal score : "+ score +"\nPlay again?";
        startEvent();
      }
      //check if health points left is 0
      if(healthPoints <= 0){
        startingHeader.innerText = "You ran out of life!\nTotal score : "+ score +"\nPlay again?"
        startEvent();
      }
}

var setColor = function(){
   var randomColor = Math.floor(Math.random()*letterColors.length);
   return letterColors[randomColor];
}

var setLetter = function(){
   var randomLetter = Math.floor(Math.random()*letters.length);
   return replacedLetters[randomLetter];
}

var createLetterDiv = function(){
            var box = document.createElement('div');
            box.innerHTML =  setLetter();
            box.addEventListener('click',checkLetter);
            box.className = "letters";
            var randomIndex = Math.floor(Math.random()*rowContainers.childElementCount);
               rows[randomIndex].appendChild(box);
               pos[randomIndex].push(0);
               box.style.backgroundColor = setColor();
            //update global variable
            rowContainers = document.querySelector(".rowContainer");
            movingLetters = document.querySelectorAll(".letters");
}
//end game when all letters have been entered
var endGame = function() {
    var gameEnded = false;
    //when word array is empty
    if(wordArray.length === 0){
        listOfWords[level-1].shift();
        //when all words entered
        if(listOfWords[level-1].length === 0){
            if(level === 3){
               gameEnded = true;
           }else{
            //next level
            score = score + (time * level);
            level++;
            time = 60;
            displayClicked.innerText= "";
            displayText();
            levelDisplay.innerHTML = "Level "+ level;
            speed = (level+1) * 0.5;
           }
            }
        else{
            //next word in current level
            displayClicked.innerText= "";
            displayText();
        }
    }else{
    //next letter in current word
    setReplaceLetterArray();
     }
    return gameEnded;
}
//create the letters at an interval
var createLetters = function(){

    //create every 725 milliseconds
    var id = setInterval(creatingLetter, 725);

    function creatingLetter(){
        //clear when created 6 div to use and reuse
        if(movingLetters.length >= 6 || stop){
              clearInterval(id);
        }
        else{
            createLetterDiv();
            console.log("creating");
        }
    }
}

var moveLetter = function(){

        var id =  setInterval(movingAnimation, 5);
        function movingAnimation() {
            if(!stop){
                for(var i = 0; i<pos.length; i++){
                    var currentContainer =rowContainers.children[i];
                    for(var j = 0; j<currentContainer.childElementCount;j++){
                        var letter = currentContainer.querySelectorAll('div')[j];
                        if (pos[i][j] >= 878) {
                            //relocate position
                            pos[i].shift();
                            var randomIndex = Math.floor(Math.random()*rowContainers.childElementCount);
                            pos[randomIndex].push(0);
                            //hide letter before setting it
                            letter.classList.add('hide');
                            rows[randomIndex].appendChild(letter);
                            letter.innerHTML = setLetter();
                            letter.style = 0 + "px";
                            letter.classList.remove('hide');
                            letter.style.backgroundColor = setColor();
                            j = 0;
                    }
                    else{
                        //setting of speed of letters moving
                            pos[i][j] += speed;
                            letter.style.left = pos[i][j] + 'px';
                        }
                }
            }
           } else{
                    clearInterval(id);
                }
        }
}

var animationBeforeStartGame = function(){
     startPage.style.animationPlayState= "running";
     startPage.style.WebkitAnimationPlayState = "running";
      setTimeout(startGame, 800);
}
var startGame= function(){
    startPage.style.animationPlayState= "paused";
    startPage.style.WebkitAnimationPlayState = "paused";
    startPage.classList.add("hide");
    display.classList.remove("hide");
    gameFactors.classList.remove("hide");
    rowContainers.classList.remove('hide');
    createLetters();
    document.body.classList.remove("backgroundImg");
    stop = false;
    moveLetter();
    timer();
}

var startEvent = function(){
    startPage.classList.remove("hide");
     display.classList.add("hide");
     setGlobalVariable();
     displayText();
}

var timer = function(){
    var id = setInterval(timePassed, 1000)
    function timePassed(){
        if(time === 0 ||  stop){
            clearInterval(id);
            if(time === 0){
                startingHeader.innerText = "Times up!\nTotal score : "+score+"\nPlay again?";
                    startEvent();
            }
        }else{
        time--;
        displayTime.innerText = time;
       }
    }
}

startButton.addEventListener("click", animationBeforeStartGame);
setGlobalVariable();
startEvent();