# click_the_letters

#### Build a game of clicking letters

### Setup
- create an `index.html`.
- create a `script.js` file.
- create a `style.css`.

### Create a working game
- create a game that display a word and letters that allow players to click on them.

- Create a div row for the list of letters and clicking on them will remove the the letter.

- When the player clicks each letters, it checks if it's the first letter of the word and if it is, the first letter of the word in the display changes to indicate that it has been clicked.

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

### Randomize words
-randomize the word display on the screen

### allow players to play again
- When the game ends, allow players to play again

###  Keep a score for the player
- The player gains a score if they click on the correct letters
- deduct the score when the player click on the wrong letter

### Display the score
- Display the score of the player when the game ends.

###Add a life for the player
- if the player clicks the wrong letter, the player loses a life and if there are none left, the player loses
- Include the scores for the health left when the player wins the game

###Add sounds 
- Add a sound when player clicks on something

### Further - Add a timer for the player
- if the player runs out of time, the player loses.
- validate that timer does not start unless the player clicks on the start button 
- setInterval() only on click
- modify start button to reset everything to original timing
- Include the time as scores to be added every level of the game

### Difficulty level
- ensure the word length increases as the level progresses
- ensure the word length is limited
- Make the game harder as the player progresses i.e the letters become invisible and visible and letters moving faster across the screen

-set a global variable of the speed of the movement 
-increment the speed of movement as the level of difficulty gets higher