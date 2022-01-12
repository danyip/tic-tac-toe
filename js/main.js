
// TODO LIST
    //TODO: put some conditionals on the submit button to force a name and icon selection 

    //TODO: clear the player name field before player 2

    //TODO: style the text box and submit/rematch buttons

    //TODO: add a min width media query to the game board

    // Use LocalStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity

    // Support custom board sizes: default is 3x3 but you could allow users to choose a larger board

    // Support networked multiplayer: https://www.firebase.com/ has a nice quickstart guide

    // Create an AI opponent: teach Javascript to play an unbeatable game against you

    // Start by implementing a few simple rules which can be easily checked and are always good moves, such as "always take the center square if it's available" - you can google these rules for yourself

    // You can build in as many AI player rules as you like but you'll quickly end up with a longwinded list of if-else-if statements. To make a truly unbeatable AI opponent you'll need to look into implementing a recursive full-game-tree algorithm like MiniMax - for advanced/bold students only!


    /*

    minimax

    if the game is over, return if it is a win (1) loss(-1) or draw(0) 

    if the game is not over, play each available spot from the players perspective

    available spots array

    scores array

    

    if (player 1 turn is false){
        maximise the score
    } else {
        minimise the score
    }

    

    const best = function(availableSpots, whosturn){
    
        const availableSpots = all the available moves    

        const scores = []

        for availableSpot[i] {
            check for a win

            }
        
        if (the game is over){
            return score
            }    
    }
    
    */

// RECURSION SIMPLE COUNT DOWN
const recursionTest = function(number){ // function that takes a number and counts down 

    console.log(number);    // log the number

    const newNumber = number - 1   // modify the number in some way for the next round, 

    if (newNumber > 0){ // if the base case is met
        recursionTest(newNumber) // run the test again with the new number
        // return // end the current function
    }

    console.log('the end'); // if the base case hasnt been met - do this
}


const recursionTest1 = function(number){ // function that takes a number and counts down 

    console.log(number);    // log the number

    const newNumber = number - 1   // modify the number in some way for the next round, 

    if (number === 0){ // if the base case is met
        console.log('the end');
        return
    }

    recursionTest1(newNumber)
}

// RECURSION TEST ARRAY
// print out items at each index of an array and return the largest number

// const arr = [4,3,6,11,88,4,2]

let largestNum = 0;

const recursionArray = function(array, index){

    if (index === array.length-1){ // base case - if we are at the end of the array
        console.log(largestNum); // log the largest number variable
        return  // exit the function
    }
    
    if (array[index] > largestNum){ // if the value at the current index is not 
        largestNum = array[index];
        console.log('after index:', index, 'the largest number is:' , largestNum);
    }

    recursionArray(array, index + 1)

};

//RECURSION TEST
// take an array of possible moves and test if they are wins


//check win function
// const winTest = function(playersMovesArray, winCombos){
//     if (winCombos.some(function(array){
//         return array.every(function(index){ //if every index in a winning combination exists within the players array its a win
//             return playersMovesArray.includes(index);
//         })
//     })){
//          return true;
//     };

const winTestArrow = function(playersMovesArray, winCombos){
    
    if (winCombos.some(combo => {
        return combo.every(index => {
            return playersMovesArray.includes(index);
        });
    })) {
        return true;
    };
};

const p1test = ['a1']
const p2test = ['c3']
const fakeCurrentState = ['a1', 'c3']
const dummyPossibleMoves = ['a2','a3', 'b1', 'b2', 'b3', 'c1', 'c2']


const checkSpaces = function(){ // takes an array of possible moves and returns the highest scoring move
    
    const scores = []// to store a score for each possible move
    let currentScore = 10;


    const testSpots = function(dummyPossibleMoves){

        const possibleMove = playersMovesArray.slice(0) // make a slice of the players current spots

        possibleMove.push(array[i]) // add in the spot to test

        if (winCheck(possibleMove, winningCombinations)){ //run the win check on the new array
            scores[i] = currentScore;
            return; 
        };

        currentScore--

    }; 
 
};







const result = function(thisPlayerArray, otherPlayerArray, possibleMove, currentBoard){

    let p1 = true;
    let counter = 0
    const score = []

    

    const processMove = function(thisPlayerArray, otherPlayerArray, possibleMove, currentBoard){
        counter++

        possibleMove.forEach(function(spot){
            // debugger
            const newPlayerArray = thisPlayerArray.slice(0); // make a copy of the players current array
            newPlayerArray.push(spot); // add on the proposed move
            
            const newCurrentBoard = currentBoard.slice(0); // copy the current board
            newCurrentBoard.push(spot); // add on the proposed move
    
            const remainingPossibleMoves = possibleMove.slice(0); //make a copy of the remaining moves to play
            remainingPossibleMoves.splice(possibleMove.indexOf(spot), 1); // take out the current move
    
            
            console.log('possible moves:', possibleMove);
            console.log('spot:' ,spot);
            console.log('remaining possible moves', remainingPossibleMoves);
            console.log('player array', newPlayerArray);
            console.log('other player', otherPlayerArray);
            
    
            if (winTestArrow(newPlayerArray, winningCombinations)){
                console.log(`its a win on ${p1} turn and it took ${counter} steps
                
                `);
                score[possibleMove.indexOf(spot)] = p1
                return
            };
    
            if (currentBoard.length === 9){
                console.log(`its a draw on ${p1} turn and it took ${counter} steps
            
                `);
                score[possibleMove.indexOf(spot)] = 'draw'
                return
            };
    
            console.log(`no result
        
            `);
    
            p1 = !p1
            processMove(otherPlayerArray, newPlayerArray, remainingPossibleMoves, newCurrentBoard)
    
        });
     
    }

    processMove(thisPlayerArray, otherPlayerArray, possibleMove, currentBoard)

    console.log(score);

}








/*

for each possible spot
    check if it is a win > return 

    if not a win return the new array and the board state and have another go



*/


















//GLOBAL VARIABLES

const player1 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: ''
}

const player2 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: ''
}

const gameData = {
    currentGame: 1,
    previous: {},
}

const winningCombinations = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1'],
]

let boardState = []; // pushing the id of each spot as it is played - this is to store previous games
let drawCount = 0; // counting the draws
let p1Turn = true; // Variable to store whos turn it is
let player1Selected = false; // Has player 1 entered their name and chosen an icon
let player2Selected = false; // Has player 2 entered their name and chosen an icon
let singlePlayerGame = false; // Triggers a game against the AI


// CHECKING FOR WINS
const winCheck = function(player){

    /*
    Check the playersSpots array against all the winning combinations and return true if any of them are a match.
    */
    if (winningCombinations.some(function(array){
        return array.every(function(index){
            return player.spots.includes(index)
        })
    })){
        
        player.winCount ++ // increment the players win counter


        const array = boardState.splice(0); // splice out the board state array

        array.unshift(p1Turn) // add whos turn it is //TODO: this is happening at the wrong time, need to happen at the start of the game not the end.

        gameData.previous['game'+ gameData.currentGame] = array; // create a key value pair to store the array
        
        return true;
    }
}
// CHECK FOR DRAW
const drawCheck = function(){
    if (boardState.length === 9){ // if the boardState array reaches length 9 and this function gets called it is a draw
        
        console.log('draw');
        drawCount++; // increment the drawCount by 1
        
        const array = boardState.splice(0); // splice out the board state array

        array.unshift(p1Turn); // add whos turn it is //TODO: this is happening at the wrong time, need to happen at the start of the game not the end.

        gameData.previous['game'+ gameData.currentGame] = array; // create a key value pair to store the array
        
        return true;
    }
}

// DOCUMENT READY FUCNTION
$(function(){


    //This probably needs a rename...  but its basically the function that runs each click.
    const handler = function(event){
        
        const boardSpotId = event.originalEvent.target.id; // for readability

        $('.hover-icon').remove(); // turns off the hover effect on the spot

        if (boardState.includes(boardSpotId)){ // check if the spot has already been clicked
            return;
        };

        const currentPlayer = p1Turn? player1 : player2; // set the current player base on whos turn it is
        
        // mark the spot with the players logo
        const $newImg = $('<img class="placed-icon">');
        $newImg.attr('src', `${currentPlayer.icon}`);
        $(this).append($newImg);

                
        boardState.push(boardSpotId); // push the spot into the game array
        currentPlayer.spots.push(boardSpotId) // push the spot into the current players spots array

        if (winCheck(currentPlayer)){
            updatePage();
            $("#game-over-cover p").html(`${currentPlayer.name} is the winner!`);
            $("#game-over-cover img").attr('src', `${currentPlayer.icon}`);
            $("#game-over-cover").css('display', 'flex');
            return;

        } else if (drawCheck()){
            updatePage();
            $("#game-over-cover p").html(`It's a draw!`);
            $("#game-over-cover").css('display', 'flex');
            return;
        } 
        
        p1Turn = !p1Turn;// swap turns

        if (singlePlayerGame) {
            aiMove();
        };

    }

    const updatePage = function(){
        $('.board-spot').off('click'); // turn off the click events on the board

        // updatescores on page
        $('#player1-data .score').html(`${player1.winCount}`);
        $('#player2-data .score').html(`${player2.winCount}`);
        $('#draw-data .score').html(`${drawCount}`);
        
    }

    const resetBoard = function(){
        
        $('.placed-icon').remove(); // remove images from divs
        $('.board-spot').on('click', handler); // turn the clicks back on
        $('#game-number').html(gameData.currentGame) // update the game counter

        // reset the arrays storing moves played
        player1.spots = []; 
        player2.spots = [];
        gameData.currentGame++


        p1Turn = true; // back to player 1 to start //TODO: make this track who started last.
    }

    // WELCOME PAGE ICON SELECTION 
    $('input[type=radio]').on('click',function(){
        
        $('.icon').removeClass('icon-big');
        $('.icon').addClass('icon-small');

        $(this).siblings().removeClass('icon-small')
        $(this).siblings().addClass('icon-big')

    })

    //SUBMIT BUTTON ############## GAME STARTS HERE ##################
    $('#start-wrapper input[type=button]').on('click', function(){

        const enteredName = $('input[type="text"]').val();
        const selectedIcon = $('input[name="icons"]:checked').siblings().attr('src');

        if (!player1Selected){
            player1.name = enteredName; //set the name in the players object
            player1.icon = selectedIcon; //set the icon in ple players object

            $('#player1-data .player-name').html(`${enteredName}`) // change players name
            $('#player1-data img').attr('src', `${selectedIcon}`) // change players icon

            $('input[name="icons"]:checked').parent().css('visibility', 'hidden') // hide the icon that was clicked
            
            $('input[name="icons"]:checked').prop('checked', false) // turn off its radio selection

            player1Selected = true;

            if(singlePlayerGame){ // Set the ai to player 2

                player2.name = 'Beep Bop Computer'; //set the name in the players object
                player2.icon = 'images/icons/robot.svg'; //set the icon in ple players object

                $('#player2-data .player-name').html('Beep Bop Computer') // change players name
                $('#player2-data img').attr('src', 'images/icons/robot.svg') // change players icon

                 player2Selected = true;

                $('#start-screen-cover').css('display', 'none'); // hide the screen cover
                $('main').show() 

                $('.board-spot').on('click', handler); // turn on the board
            }

             
            $('.icon').removeClass('icon-big'); // reset icon states for player 2
            $('.icon').removeClass('icon-small'); // reset icon states for player 2
            $('#start-screen-cover h1').html('Hello Player 2') //change the message to player 2

        } else {
            player2.name = enteredName; //set the name in the players object
            player2.icon = selectedIcon; //set the icon in ple players object

            $('#player2-data .player-name').html(`${enteredName}`) // change players name
            $('#player2-data img').attr('src', `${selectedIcon}`) // change players icon

            player2Selected = true;

            $('#start-screen-cover').css('display', 'none'); // hide the screen cover 

            $('.board-spot').on('click', handler); // turn on the board
            $('main').show()
        }

    })

    // REMATCH BUTTON
    $(`#game-over-cover input[type="button"]`).on('click', function(){
          resetBoard();
          $("#game-over-cover").hide();
    })

    // AI TAKES A TURN
    const aiMove = function(){
        
        //CHOOSE A SPOT
        const aiPick = aiLogic();
            
        //MARK THE SPOT AND FINISH THE TURN
        const $newImg = $('<img class="placed-icon">'); //make a new img
        $newImg.attr('src', `${player2.icon}`); //assign it the p2 image

        // setTimeout(function(){
            $(`#${aiPick}`).append($newImg);//append it to the div
        // }, 1000)

         

        boardState.push(aiPick); // push the spot into the game array
        player2.spots.push(aiPick); // push the spot into the current players spots array

            if (winCheck(player2)){
                updatePage();
                $("#game-over-cover p").html(`${player2.name} is the winner!`)
                $("#game-over-cover img").attr('src', `${player2.icon}`)
                $("#game-over-cover").css('display', 'flex')
                return;

            } else if (drawCheck()){
                updatePage();
                $("#game-over-cover p").html(`It's a draw!`)
                $("#game-over-cover").css('display', 'flex')
                return;
            } 

            p1Turn = !p1Turn;
            
            
    };

    // AI CHOOSES A SPOT - randomly...
    const aiLogicV1 = function(){
        //make an array of all board spots
        const gameBoard = []; 
        $('.board-spot').each(function(){
            gameBoard.push($(this).attr('id'))
        });

         
        const availableSpots = gameBoard.slice(0);//make a copy of all board spots so i can
        boardState.forEach(function(spot){ //loop the current board state
            let i = availableSpots.indexOf(spot); //grab each taken spots array index in available spots
            availableSpots.splice(i, 1) //remove them from the available spots
        });

        // choose a random spot from the available spots
        const randomSpot = Math.floor(Math.random()*availableSpots.length);
        return availableSpots[randomSpot];

    };

    const aiLogic = function(){
        //make an array of all board spots
        const gameBoard = []; 
        $('.board-spot').each(function(){
            gameBoard.push($(this).attr('id'))
        });

         
        const availableSpots = gameBoard.slice(0);//make a copy of all board spots so i can
        boardState.forEach(function(spot){ //loop the current board state
            let i = availableSpots.indexOf(spot); //grab each taken spots array index in available spots
            availableSpots.splice(i, 1) //remove them from the available spots
        });

        // always choose the middle square if its available
        if(availableSpots.includes('b2')){
            return 'b2'
        };



        // choose a random spot from the available spots
        const randomSpot = Math.floor(Math.random()*availableSpots.length);
        return availableSpots[randomSpot];
        
    };

    // MULTIPLAYER BUTTON
    $('#welcome-cover #multiplayer').on('click', function(){
        singlePlayerGame = false;
        $('#welcome-cover').hide();
        $('#start-screen-cover').show();
    });

    // SINGLE PLAYER BUTTON
    $('#welcome-cover #single-player').on('click', function(){
        singlePlayerGame = true;
        $('#welcome-cover').hide();
        $('#start-screen-cover').show();
    });

    // HOVER SPOT
    $('.board-spot').on('mouseover', function(){

        // check if the spot already has a child element to see if it has been played
        if ($(this).children().length === 1){
            return; //if it does then do nothing
        }
        
        const icon = p1Turn? player1.icon : player2.icon; // set the icon variable to the appropriate players icon

        const $newImg = $('<img class="hover-icon">'); // make a new image in html
        $newImg.attr('src', `${icon}`); // add the image based on whos turn it is
        $(this).append($newImg); // attached the image
    })

    // REMOVE HOVER
    $('.board-spot').on('mouseout', function(){
        $('.hover-icon').remove();
    })
       
  
})




