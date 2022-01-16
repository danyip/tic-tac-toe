const minimax = function(thisPlayerArray, otherPlayerArray, possibleMoves, counter, aiTurn){
        
        // BASE CASE - if this is met, end the recursion
        if (possibleMoves.length === 0){ // check for a draw

            return 0 // draws area a 0 score
        }

        // IF BASE CASE IS NOT MET
        let bestScore = aiTurn? -Infinity : Infinity; 
        let bestScoreIndex

        possibleMoves.forEach(function(move){ // Loop though each possible move
            
            const remainingPossibleMoves = possibleMoves.slice(0);// make a copy of the remaining moves to play
            let moveIndex = possibleMoves.indexOf(move) // grab the index of the move we are testing
            remainingPossibleMoves.splice(moveIndex, 1); // take out the move we are testing
            
            const newPlayerArray = thisPlayerArray.slice(0); // make a copy of the players current array
            newPlayerArray.push(move); // add on the move

            let score
            if (winTestArrow(newPlayerArray, winningCombinations)){
                
                score = (aiTurn ? 10 - counter : counter - 10)

            } else {
                score = minimax(otherPlayerArray, newPlayerArray, remainingPossibleMoves, counter + 1, !aiTurn);
            }
            
            if (aiTurn){

                if (score > bestScore){
                    bestScore = score;
                    bestScoreIndex = moveIndex;
                }
            } else {

                if (score < bestScore){
                    bestScore = score;
                    bestScoreIndex = moveIndex;
                }
            }

        })

        // CHECK THE DEPTH
        if (counter === 0){ // if we are on the first call of minimax

            return bestScoreIndex // return the index of the position with the largest score

        } else { // if we are on a recursive call of minimax

            return bestScore; // return the larges score value
        }
    } // end minimax()

const bestMove = function(thisPlayerArray, otherPlayerArray, possibleMoves){

    // CALL MINIMAX and store the value (the value will be the index of the move that maximises the AI score or minimises the players score)
    const result = minimax(thisPlayerArray, otherPlayerArray, possibleMoves, 0, true); 
    
    return possibleMoves[result]; // return the id of the spot to play

} // end bestMove()

// WIN CHECKER FOR MINIMAX
const winTestArrow = function(playersMovesArray, winCombos){
    
    return winCombos.some(combo => {
        return combo.every(index => {
            return playersMovesArray.includes(index);
        });
    })
};


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
let boardState = []; // pushing the id of each spot as it is played
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

        array.unshift(p1Turn) // add whos turn it is

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

        array.unshift(p1Turn); // add whos turn it is

        gameData.previous['game'+ gameData.currentGame] = array; // create a key value pair to store the array
        
        return true;
    }
}

// DOCUMENT READY FUCNTION
$(function(){

    //GAME SPOT CLICK HANDLER
    const handler = function(event){
        
        const boardSpotId = event.originalEvent.target.id; // for readability

        $('.hover-icon').remove(); // turns off the hover effect on the spot

        // check if the spot has already been clicked and abort if it has
        if (boardState.includes(boardSpotId)){ 
            return;
        };
        
        // set the current player based on whos turn it is
        const currentPlayer = p1Turn? player1 : player2; 
        
        // mark the spot with the players logo
        const $newImg = $('<img class="placed-icon">');
        $newImg.attr('src', `${currentPlayer.icon}`);
        $(this).append($newImg);

        // update the game data        
        boardState.push(boardSpotId); // push the spot into the game array
        currentPlayer.spots.push(boardSpotId) // push the spot into the current players spots array

        // check for a win or draw
        if (winCheck(currentPlayer)){
            
            updatePage(); // this function turns off the click events and updates the scoreboard

            // fill in the game over screen and display it
            $("#game-over-cover p").html(`${currentPlayer.name} is the winner!`);
            $("#game-over-cover img").attr('src', `${currentPlayer.icon}`);
            $("#game-over-cover").css('display', 'flex');
            return;

        } else if (drawCheck()){

            updatePage(); // this function turns off the click events and updates the scoreboard

            // fill in the game over screen and display it
            $("#game-over-cover p").html(`It's a tie!`);
            $("#game-over-cover img").attr('src', `images/icons/tie.svg`);
            $("#game-over-cover").css('display', 'flex');
            return;
        } 
        
        // swap turns
        p1Turn = !p1Turn;

        // if it's a single player game, trigger the AI to make a move
        if (singlePlayerGame) {
            aiMove();
        };

    }

    // TURN OFF GAME BOARD AND UPDATE SCORES 
    const updatePage = function(){

        $('.board-spot').off('click'); // turn off the click events on the board

        // updatescores on page
        $('#player1-data .score').html(`${player1.winCount}`);
        $('#player2-data .score').html(`${player2.winCount}`);
        $('#draw-data .score').html(`${drawCount}`);
        
    }

    // PREPARES THE BOARD FOR A NEW GAME
    const resetBoard = function(){
        
        $('.placed-icon').remove(); // remove icons from board

        $('.board-spot').on('click', handler); // turn the clicks back on

        // reset the arrays storing moves played
        player1.spots = []; 
        player2.spots = [];

        p1Turn = true; // back to player 1 to start
    }

    // ICON SELECTION EFFECT
    $('input[type=radio]').on('click',function(){

        $('#icon-grid').removeClass('input-req-box-shadow') // removes the input required border if it exists

        $('.icon').removeClass('icon-big');
        $('.icon').addClass('icon-small');

        $(this).siblings().removeClass('icon-small')
        $(this).siblings().addClass('icon-big')

    })

    //SUBMIT BUTTON ############## GAME STARTS HERE ##################
    $('#start-wrapper input[type=button]').on('click', function(){

        const enteredName = $('#name-field').val();
        const selectedIcon = $('input[name="icons"]:checked').siblings().attr('src');

        // conditionals for the submit button to force name and icon selection
        if (enteredName.length === 0 && selectedIcon === undefined){ 
            $('#name-field').addClass('input-req-box-shadow');
            $('#icon-grid').addClass('input-req-box-shadow');
            return
        } else if (selectedIcon === undefined){
            $('#icon-grid').addClass('input-req-box-shadow');
            return
        } else if (enteredName.length === 0){
            $('#name-field').addClass('input-req-box-shadow');
            return
        }

        // check if the first player has selected
        if (!player1Selected){
            player1.name = enteredName; //set the name in the players object
            player1.icon = selectedIcon; //set the icon in ple players object

            $('#player1-data .player-name').html(`${enteredName}`) // change players name
            $('#player1-data img').attr('src', `${selectedIcon}`) // change players icon

            $('input[name="icons"]:checked').parent().css('visibility', 'hidden') // hide the icon that was clicked
            
            $('input[name="icons"]:checked').prop('checked', false) // turn off its radio selection

            player1Selected = true;

            // check if its a single player game
            if(singlePlayerGame){ // Set the ai to player 2

                player2.name = 'Beep Bop Computer'; //set the name in the players object
                player2.icon = 'images/icons/robot.svg'; //set the icon in ple players object

                $('#player2-data .player-name').html(player2.name) // change players name
                $('#player2-data img').attr('src', player2.icon) // change players icon

                 player2Selected = true;

                $('#start-screen-cover').css('display', 'none'); // hide the screen cover
                $('main').show() 

                $('.board-spot').on('click', handler); // turn on the board
            }

            $('.icon').removeClass('icon-big'); // reset icon states for player 2
            $('.icon').removeClass('icon-small'); // reset icon states for player 2
            $('#start-screen-cover h1').html('Player 2') //change the message to player 2
            $('#name-field').val('')

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
        
        // choose a spot
        const aiPick = aiLogicV3();
            
        // mark the spot and finish the turn
        const $newImg = $('<img class="placed-icon">'); //make a new img
        $newImg.attr('src', `${player2.icon}`); //assign it the p2 image
        $(`#${aiPick}`).append($newImg);//append it to the div
        

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
    // AI MIDDLE FIRST THEN RANDOM
    const aiLogicV2 = function(){
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
    // LINKED TO MINIMAX
    const aiLogicV3 = function(){
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

        return bestMove(player2.spots, player1.spots, availableSpots)         
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
    
    // REMOVE INPUT BOX SHADOW
    $('#name-field').focus(function(){
        $(this).removeClass('input-req-box-shadow')
    })

    $('#start-screen-cover').hide()
  
})




