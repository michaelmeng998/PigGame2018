/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

my logic:

first create a array to stroe the legit scores, and create a variable to store a specific rounds values. Next implement a count function that chooses which player gets to roll the dice. Call a random # generator and return a randowm number from 1 to 6. add to the round var. If its a 1, make the stored round # a 0, and change the counter. Do this until one of the array values becomes greater than or equal to 100.

*/


/*

CODING CHALLENGE 6

1. A player loses his entire score when he rolls two 6 in a row. next players turn after this event.

for coding challenge 1, it is possible to add a temporary variable to store the first score. If the player continues to roll, store the second one in a temp variable and check if the two variables match each other. if they do match, make the total score equal to 0. then call the next player function.

2. Add an input field to the html where players can set the winning score, so that they can change the predefined score of 100. Hint, can use the .value property to read in this value.

3. add another dice to the game. player loses his current score when one of them is a 1.

*/


var scores, roundscore, activeplayer, gameplaying, temp, winning_score;

init();

winning_score = document.getElementById('winning-score').value;

console.log("test 1: " + winning_score);


//dice = Math.floor(Math.random() * 6) + 1;

/*document object gives us access to dom*/

//dom manipulation right here, also efficient code, only have to write this document call once

// document.querySelector('#current-' + activeplayer).textContent = dice;


//manipulate html in js
//document.querySelector('#current-' + activeplayer).innerHTML = '<em>' + dice + '</em>';

//ths is just to read content in html browser
//var x = document.querySelector('#score-0').textContent;

//console.log(x);

//style is method, display is property, and none s value

document.querySelector('.dice').style.display = 'none';

// document.querySelector('.btn-roll').addEventListener('click', btn);

//can also just wrtie function into event listening method, called an anonymous function

//now putting computations into this method that is called when event click occurs

//*******this is to set scores to zero in beggining

document.querySelector('.btn-roll').addEventListener('click', function(){/*do something*/

// 1. Random number needed only when someone hits a button.

    
if (gameplaying) {
    

dice = Math.floor(Math.random() * 6) + 1;

//2. display the result
    
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

//3. update the round score only if rolled number was not a 1
    
    //note, using double equal as it does not perform type coercion
    
    if (dice !== 1) {
        
        //check for two 6's
        
        if(dice === 6 && temp === 6){
            //lose entire score
            scores[activeplayer] = 0;
            document.querySelector('#score-' + activeplayer).textContent = 0;
            temp = 0;
            nextplayer();
        }
        
        else{
        //add score
        roundscore += dice;
        document.querySelector('#current-' + activeplayer).textContent = roundscore;
        
        temp = dice;
        }
    }
    else{
        //next player
        
        nextplayer();
        
        /*
        
        //can use a ternary operator instead of an if statement
        
        activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
        
        roundscore = 0;
        
        //setting in UI
        
        document.getElementById('current-0').textContent = '0';
        
        document.getElementById('current-1').textContent = '0';
        
        //removing and adding classes:
        
        //pass in name of class you want to remove
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        
        //document.querySelector('.player-1-panel').classList.add('active');
        
        //now using toggle, which is more efficient for this case. add if not there, remove if there
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
        
        */
    
    }
    
}

});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gameplaying){
    
   //add current score to the global score
    scores[activeplayer] += roundscore;
    
    
    //update the ui, need to know where data is in html dom
    
    document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];
    
    
    //check if the player won the game
    
    if (scores[activeplayer] >= winning_score) {
        document.querySelector('#name-' + activeplayer).textContent = 'Winner!';
        
        console.log('winner!!!');
        
        document.querySelector('.dice').style.display = 'none';
        
        document.querySelector('.player-' + activeplayer + '-panel').classList.add ('winner');
        
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
        
    // document.querySelector('.btn-roll').style.display = 'none';
        
    // document.querySelector('.btn-hold').style.display = 'none';
        
        gameplaying = false;
        
    } else {
        
         // next player after a hold, remember the DRY principle, dont repeat yourself, reate a next player function
        
        nextplayer();
        
        temp = 0;
        
        console.log('next player function called');
    }
        
    }
    
});

function nextplayer() {
    
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
        
        roundscore = 0;
        
        //setting in UI
        
        document.getElementById('current-0').textContent = '0';
        
        document.getElementById('current-1').textContent = '0';
        
        //removing and adding classes:
        
        //pass in name of class you want to remove
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        
        //document.querySelector('.player-1-panel').classList.add('active');
        
        //now using toggle, which is more efficient for this case. add if not there, remove if there
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
    

}

document.querySelector('.btn-new').addEventListener('click', init);

/*
note not using cuntion call operator
() inside thge eventlistener. Just want to tell
when someone clicks the button just call the function
for me. We dont want it immediately called.
*/

function init() {
    
    console.log('init function is called!');
    
scores = [0,0];
roundscore = 0;
activeplayer = 0;
temp = 0;
    
gameplaying = true;
    
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0'; 
document.getElementById('name-0').textContent = 'Player 1' ;
document.getElementById('name-1').textContent = 'Player 2';
    
//document.querySelector('.btn-roll').style.display = 'unset';
        
//document.querySelector('.btn-hold').style.display = 'unset';
    
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.add ('active');


        

        
  
}


/*need to implement a state variable in this game, a state variable
just tells us the conditon of a system, it will help the program
remember if the game is playing or not playing
*/
