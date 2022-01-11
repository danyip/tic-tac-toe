console.log('tic-tac-toe-hellllo');


//GLOBAL VARIABLES

const player1 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: 'images/icons/Capsicum.svg'
}

const player2 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: 'images/icons/Banana.svg'
}

const gameData = {
    currentGame: 1,
    previous: {},
}

let boardState = []; // pushing the id of each spot as it is played - this is to store previous games
let drawCount = 0; // counting the draws
let p1Turn = true; // Variable to store whos turn it is
let gameCount = 0;
let player1Selected = false;
let player2Selected = false;

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


//GLOBAL FUNCTIONS

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

        //TRYING TO STOP FAST CLICKING FROM PUSHING BAD DATA...
        if (boardState.includes(boardSpotId)){ 
            return;
        }

        const currentPlayer = p1Turn? player1 : player2; // set the current player base on whos turn it is
         console.log(currentPlayer.icon);
        // mark spot and remove clickability

        const $newImg = $('<img class="placed-icon">');
        $newImg.attr('src', `${currentPlayer.icon}`);
        $(this).append($newImg)


        // $(this).css({
        //     background: `url(${currentPlayer.icon})`,

        // }).off('click');

        $('body').css('background', );

        // push the spot into the game array
        boardState.push(boardSpotId);

        // push the spot into the current players spots array
        currentPlayer.spots.push(boardSpotId)

        
        if (winCheck(currentPlayer)){
            //RUN THE WIN FUNCTION
            updatePage();

        } else if (drawCheck()){
            //RUN THE DRAW FUNCTION
            updatePage();
        } 
        
        p1Turn = !p1Turn;// swap turns
    }

    

    const updatePage = function(){
        $('.board-spot').off('click'); // turn off the click event on the board

        // updatescores on page
        $('#player1-data .score').html(`${player1.winCount}`);
        $('#player2-data .score').html(`${player2.winCount}`);
        $('#draw-data .score').html(`${drawCount}`);
        
    }

    const resetBoard = function(){
        // reset the board for next round
        $('.placed-icon').remove(); // remove images from divs
        $('.board-spot').on('click', handler); // turn the clicks back on
        $('#game-number').html(gameData.currentGame) // update the game counter

        // reset the arrays storing moves played
        player1.spots = []; 
        player2.spots = [];
        gameData.currentGame++

        p1Turn = true; // back to player 1 to start //TODO: make this track who started last.

    }

    //TEMP RESET BOARD
    $('#reset').on('click', resetBoard)
    
    

    // WELCOME PAGE ICON SELECTION
    $('input[type=radio]').on('click',function(){
        console.log($(this).siblings());
        $('.icon').css({
            width: '100px',
            opacity: '50%'
        });

        $(this).siblings().css({
            width: '120px',
            opacity: '100%'
        })
    })

    //SUBMIT BUTTON
    $('#start-wrapper input[type=button]').on('click', function(){
        
        
        const currentPlayer = !player1Selected ? player1 : player2

        const enteredName = $('input[type="text"]').val();
        const selectedIcon = $('input[name="icons"]:checked').siblings().attr('src');
        
        player1.name = enteredName;
        player1.icon = selectedIcon;

        $('#player1-data .player-name').html(`${enteredName}`) // change players icon
        $('#player1-data img').attr('src', `${selectedIcon}`) // change players icon
        
        console.log(selectedIcon, enteredName);

        updatePage()

        $('#start-screen-cover').css('display', 'none');

        $('.board-spot').on('click', handler);

    })

})



/*

ORDER OF OPERATIONS
1. page load
2. display welcome screen / select game type - single or multiplayer
3. select player 1 name and icon
    a. if multi player - select player 2 name and icon
4. hide the welcome screen and start the game








*/





