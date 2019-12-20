# click_the_letters

#### Build a game of clicking letters

### Setup
- create an `index.html`.
- create a `script.js` file.
- create a `style.css`.

### Create a working game
- create a game that display a word and a list of letters that allow players to click on them.

- Create a div row for the list of letters and clicking on them will disable the click and remove the visibility of the letter.

- When the player clicks each letters, it checks if it's the first letter of the word and if it is, the first letter of the word changes color to indicate that it has been clicked.

##Detecting a win state

```
if letter is the current letter, remove the letter
  if text is not the last text
    current letter is the next letter in text
  else 
    player wins 
```

##### Second Version
Move the list letters across the screen and ensure that each letters moved across the screen have a letter that corresponds to the first letter of the word displayed. 


- modify the game so that another word appears after the player has clicked all letters of the word 

##### New winning state
- player only wins if the last word in an array of words ran out

```
if letter is the current letter, remove the letter
  if text is not the last text
    current letter is the next letter in text
  else 
   if current word is not the last word
     new current word is the next current word
   else 
     player wins 
```

### Further - Randomize words
-randomize the word display on the screen

### Further - allow players to play again
- When the game ends, allow players to play again

### Further - Keep a score for the player
- The player gains a score if they click on the correct letters
- deduct the score when the player click on the wrong letter

### Further - Add a life for the player
- if the player enters the wrong word, the player loses a life and the game will lose the game.

### Further - Add a timer for the player
- if the player runs out of time, the player loses.
- validate that timer does not start unless the player clicks on the start button 
- setInterval() only on click
- modify start button to reset everything to original timing

### Further - Display the score
- Display the score of the player when the game ends.

### Further - Add sounds 
- Add a sound when player clicks on something
```
var clickStartSound =function(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
  ```

### Further - Request a list of words
- Get a list of words using API
- Research the API to use from `https://github.com/public-apis/public-apis`
- ensure list of words available to ensure that the words are available in case API does not work

### Further - Difficulty level
- ensure the word length increases as the level progresses
- ensure the word length is limited
- Make the game harder as the player progresses i.e the letters become invisible and visible and letters moving faster across the screen

-set a global variable of the speed of the movement 
-increment the speed of movement as the level of difficulty gets higher