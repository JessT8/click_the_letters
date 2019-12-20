//Global Variables
var word = "test";
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var wordArray = word.split("");
var letterBoxes = document.querySelectorAll(".letterBox");

//add letters and click events to letter box
var addLetterBoxesProperties = function(){
     for(var i = 0; i< letterBoxes.length ; i ++){
        letterBoxes[i].innerHTML = letters[i];
        // letterBoxes[i].addEventListener('click',checkLetter);
     }
}