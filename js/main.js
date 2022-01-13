// TODO: Make this actually take the best move....
const bestMove = function(thisPlayerArray, otherPlayerArray, possibleMoves){

    const minimax = function(thisPlayerArray, otherPlayerArray, possibleMoves, counter, aiTurn){
        
        // CHECK FOR BASE CASE (recursion end state)
        if (winTestArrow(thisPlayerArray, winningCombinations)){ // if the current players spots contain a win

            return (aiTurn ? 10 - counter : counter - 10)   // if its the AI's turn return SCORE: (10 - depth)
                                                            // if its not the AI's turn return SCORE: (depth - 10)

        } else if (possibleMoves.length === 0){             // else if there is no more moves left to play return SCORE: (0)
            return 0
        };

        const scoreList = []; // create a scorelist to store results of the below for each

        possibleMoves.forEach(function(move){
            
            const remainingPossibleMoves = possibleMoves.slice(0); // make a copy of the remaining moves to play
            let moveIndex = possibleMoves.indexOf(move) // grab the index of the current move
            remainingPossibleMoves.splice(moveIndex, 1); // take the current move out of the remaining moves

            // console.log(counter);
                        
            const newPlayerArray = thisPlayerArray.slice(0); // make a copy of the players current array
            newPlayerArray.push(move); // add on the move
            
            // call minimax on the new board state and push the results into the scoreList at the matching index
                                    // switch turns by passing the other player first             increment depth  flip the turn
            scoreList[moveIndex] = minimax(otherPlayerArray, newPlayerArray, remainingPossibleMoves, counter + 1, !aiTurn);
    
            // console.log('scorelist', scoreList);
        })
        
        // process the scorelist to find the largest score
        let largestScore = 0; 

        let largestScoreIndex = 0;

        scoreList.forEach((score, index) => { // loop the scorelist
            if (Math.abs(score) > largestScore){ // if the absolute value of the current score is greater then largestScore
                largestScore = score;  // update largest score
                largestScoreIndex = index;  // update the index to match
                
                // if (counter === 0){
                //     console.log('largestScore', largestScore)
                //     console.log('largestScoreIndex',largestScoreIndex)
                // }
            }
        })
        
       
        if (counter === 0){ // for the first call return the INDEX of the largest score, for each recursive call return the largest score.
            console.log('scorelist in counter check', scoreList); 
            console.log('possible moves in counter check', possibleMoves);
            return largestScoreIndex
        } else {
            return largestScore;
        };
        
    }
    
    // initalize minimax with the current game state. result will be the index of the largest score. 
    const result = minimax(thisPlayerArray, otherPlayerArray, possibleMoves, 0, false);

    console.log('result', result);
    
    console.log(possibleMoves[result]);
    
    return possibleMoves[result]; //return the id of the board position that aligns to the highest scoring move.

}  
// WIN CHECK FOR MINIMAX
const winTestArrow = function(playersMovesArray, winCombos){
    
    if (winCombos.some(combo => {
        return combo.every(index => {
            return playersMovesArray.includes(index);
        });
    })) {
        return true;                    
    };
};

// GLOBAL VARIABLES
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


    // Check the playersSpots array against all the winning combinations and return true if any of them are a match.
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
            $("#game-over-cover img").attr('src', ``);
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

        $('#icon-grid').removeClass('input-req-box-shadow')

        $('.icon').removeClass('icon-big');
        $('.icon').addClass('icon-small');

        $(this).siblings().removeClass('icon-small')
        $(this).siblings().addClass('icon-big')

    })

    //SUBMIT BUTTON ############## GAME STARTS HERE ##################
    $('#start-wrapper input[type=button]').on('click', function(){

        const enteredName = $('#name-field').val();
        const selectedIcon = $('input[name="icons"]:checked').siblings().attr('src');

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

                $('#player2-data .player-name').html(player2.name) // change players name
                $('#player2-data img').attr('src', player2.icon) // change players icon

                 player2Selected = true;

                $('#start-screen-cover').css('display', 'none'); // hide the screen cover
                $('main').show() 

                $('.board-spot').on('click', handler); // turn on the board
            }

            $('.icon').removeClass('icon-big'); // reset icon states for player 2
            $('.icon').removeClass('icon-small'); // reset icon states for player 2
            $('#start-screen-cover h1').html('Hello Player 2') //change the message to player 2
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
        
        //CHOOSE A SPOT
        const aiPick = aiLogicV3();
            
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




