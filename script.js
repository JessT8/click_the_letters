//Global Variables
var listOfWords;
var word = "";
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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
var healthArray = health.innerHTML.split(" ");
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

    // listOfWords = [
    // ["Cat","Dog","Key"],
    // ["Take", "Four", "Blue"],
    // ["Great", "Eight","Blink"]
    // ];
    listOfWords = [
    ["C","D","K"],
    ["T", "F", "B"],
    ["G", "E","B"]
    ];
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
    stop = true;
    time = 60;
    score = 0;
    level = 1;
    speed = (level+1) * 0.5;
    levelDisplay.innerHTML = "Level "+ level;
    healthPoints = 3;
    //clear all displays
    lettersLeft.innerHTML = "";
    displayClicked.innerText = "";
    displayTime.innerHTML = time;
    health.innerHTML = "❤️ ❤️ ❤️";
    scoreDisplay.innerHTML = "Score : 0";
}

setGlobalVariable();

var displayText = function(){
    word = listOfWords[level-1][0];
    wordArray = word.split("");
    replacedLetters = letters.slice();
    //replace some letters with letter needed
    for(var i = 0 ; i < 6; i++)
    {
        var letterIndex = Math.floor(Math.random()*letters.length);
        replacedLetters[letterIndex] = wordArray[0];
    }
    displayLettersLeft.innerText = word;
}

//win condition
var checkLetter = function(){
      var correctLetter = false;
      //if current letter click is the letter in the array
      if(this.innerHTML === wordArray[0].toUpperCase()){
        correctLetter = true;
        displayClicked.innerText += wordArray.shift();
        displayLettersLeft.innerText = wordArray.join("");
         this.innerText = "";
         score = score + 100;
         scoreDisplay.innerHTML = "Score : "+ score;
      }else{
        healthPoints--;
        healthArray[healthPoints] = "🤍";
        health.innerHTML = healthArray.join(" ");
        health = document.querySelector(".healthImg");
      }
      var displayEndGame = endGame();
      if(displayEndGame){
        startingHeader.innerText = "You won!\nTotal score : "+ score +"\nPlay again?";
        startEvent();

      }
      if(healthPoints <= 0){
        startEvent();
        startingHeader.innerText = "You ran out of life!\nPlay again?"
      }
      return correctLetter;
}

var createLetterDiv = function(){
            var box = document.createElement('div');
            var randomLetter = Math.floor(Math.random()*letters.length);
            box.innerHTML = replacedLetters[randomLetter];
            box.addEventListener('click',checkLetter);
            box.className = "letters";
               var randomIndex = Math.floor(Math.random()*rowContainers.childElementCount);
               rows[randomIndex].appendChild(box);
               pos[randomIndex].push(0);
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
              console.log(stop);
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
                           var randomLetter = Math.floor(Math.random()*letters.length);
                            pos[i].shift();
                            var randomIndex = Math.floor(Math.random()*rowContainers.childElementCount);
                            rows[randomIndex].appendChild(letter);
                            pos[randomIndex].push(0);
                            letter.classList.add('hide');
                            letter.innerHTML = replacedLetters[randomLetter];
                            j = 0;
                    }
                    else if(pos[i][j] < 878 && !letter.classList.contains('hide')){
                            pos[i][j] += speed;
                            letter.style.left = pos[i][j] + 'px';
                        }
                        if(letter.classList.contains('hide')){
                            letter.classList.remove('hide');
                            letter.style = 0 + "px";
                        }
                }
            }
           } else{
                    clearInterval(id);
                }
        }
}
var startGame= function(){

    startPage.classList.add("hide");

    display.classList.remove("hide");
    gameFactors.classList.remove("hide");
    rowContainers.classList.remove('hide');
    createLetters();
    stop = false;
    moveLetter();
    timer();
}
startButton.addEventListener("click",startGame);

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
                startEvent();
                startingHeader.innerText = "Times up!\nPlay again?"
            }
        }else{
        time--;
        displayTime.innerText = time;
       }
    }
}
startEvent();









// var responseHandler = function() {
//   console.log("response text", this.responseText);
//   var response = JSON.parse( this.responseText );
//    console.log( response );
// };

// var requestFailed = function(){
//   console.log("response text", this.responseText);
//   console.log("status text", this.statusText);
//   console.log("status code", this.status);
// };

// var doSubmit = function(event){
//     var input = document.querySelector('#url');
//     var  url = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength="+5+"&maxLength="+5+"&limit=10";//&api_key=YOURAPIKEY";

//         // make a new request
//     var request = new XMLHttpRequest();

//     // listen for the request response
//     request.addEventListener("load", responseHandler);
//     request.addEventListener("error", requestFailed);

//     // ready the system by calling open, and specifying the url
//     request.open("GET", url);

//     // send the request
//     request.send();
// }

// doSubmit();


                  // for(var i = 0; i< movingLetters.length ; i ++){
                  //   if (pos[i] === 878) {
                  //       var randomLetter = Math.floor(Math.random()*letters.length);
                  //       pos[i]=0;
                  //   } else {
                  //           pos[i]++;
                  //           movingLetters[i].style.left = pos[i] + 'px';
                  //       }
                  //       if(pos[i]===0 && i !== 0){
                  //          movingLetters[i].innerHTML = letters[randomLetter];
                  //       }
                  //    }