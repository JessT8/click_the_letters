//Global Variables
//var listOfWords = ["One","Two","Three","Four","Five"];
var listOfWords = ["O"]
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
        startEvent();
      }
      return correctLetter;
}


//create the letters at an interval
var createLetters = function(){

    //create every 725 milliseconds
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

//end game when all letters have been entered
var endGame = function() {
    var gameEnded = false;
    //when word array is empty
    if(wordArray.length === 0){
        listOfWords.shift();
        //when all words entered
        if(listOfWords.length === 0){
               gameEnded = true;
          }
        else{
            displayClicked.innerText= "";
            displayText();

        }
    }
    return gameEnded;
}
     var display = document.querySelector("#gameStarted");
     var startPage = document.querySelector("#startPage");
var stop = false;
     var moveLetter = function(){

        var id =  setInterval(movingAnimation, 5);
        function movingAnimation() {
            if(!stop){
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
                else{
                    clearInterval(id);
                }
            }
        }
var startGame= function(){

     startPage.classList.add("hide");
     display.classList.remove("hide");
     row.classList.remove("hide");
    createLetters();
    stop = false;
    moveLetter();
}
    var startButton = document.querySelector("#startButton");
    startButton.addEventListener("click",startGame);
var startEvent = function(){
     startPage.classList.remove("hide");
     display.classList.add("hide");
   row.innerHTML = "";
     letterBoxes = document.querySelectorAll(".letterBox");
     listOfWords = ["O"];
     displayClicked.innerText = "";
     stop = true;
     row.classList.add("hide");
     listOfWords = ["O"];
     word = "";
     displayText();
          pos = [];


}
startEvent();










//API REQUIRES API KEY THAT WILL ONLY BE AVAILABLE 7 DAYS LATER! DO LATER!
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