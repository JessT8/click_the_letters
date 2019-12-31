var listOfWords;

var setWords = function(){
    var wordList = [['SUN','SKY','ONE','ICE','KEY','PIN'],
                    ['CITY','BEAM','GLOW','MOON','STAR','FIRE'],
                    ['SHINE','GLEAM','LIGHT','GLINT','BLINK','GREAT']];
   for(var i = 0;i<wordList.length; i++){
    wordList[i].sort(function(a,b){
        return 0.5 - Math.random();});
    }

    for(var i = 0; i<wordList.length;i++){
        for(var j =0; j <3; j++){
            listOfWords[i].push(wordList[i][j]);
        }
    }
}