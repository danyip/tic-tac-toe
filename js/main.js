console.log('tic-tac-toe-hellllo');

const player1 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: 'red'
}

const player2 = {
    name: '',
    spots: [],
    winCount: 0,
    icon: 'blue'
}


let boardState = []; // pushing the id of each spot as it is played - this is to store previous games
// let player1Spots = []; // pushing the id of each spot into each players arrays
// let player2Spots = [];

// let player1WinCount = 10;
// let player2WinCount = 0;
let drawCount = 0;
let p1Turn = true; // Variable to store whos turn it is

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


// check win
const winCheck = function(player){

    if (winningCombinations.some(function(array){
        return array.every(function(index){
            return player.spots.includes(index)
        })
    })){
        console.log('Win');
        player.winCount ++
        return true;
    }}

// check draw
const drawCheck = function(){
    if (boardState.length === 9){
        drawCount ++
        return true;
    }
}


$(function(){

    const handler = function(event){
        console.log(boardState);
        const boardSpotId = event.originalEvent.target.id; // for readability
        
        const currentPlayer = p1Turn? player1 : player2;

        // mark spot and remove clickability
        $(this).css('background', currentPlayer.icon).off('click');

        // push the spot into the game array
        boardState.push(boardSpotId);

        //push the spot into the current players spots array
        currentPlayer.spots.push(boardSpotId)

        console.log(boardState);


        if (winCheck(currentPlayer)){
            console.log('run the win function');
            updatePage();
        } else if (drawCheck()){
            console.log('run the draw function');
            updatePage();
        } 
        
        p1Turn = !p1Turn;// swap turns
    }

    $('.board-spot').on('click', handler);

    

    
    const updatePage = function(){
        $('.board-spot').off('click');

        // updatescores
        $('#player1-data .score').html(`${player1.winCount}`);
        $('#player2-data .score').html(`${player2.winCount}`);
        $('#draw-data .score').html(`${drawCount}`);

        
    }

    const resetBoard = function(){
        // reset the board for next round
        $('.board-spot').css('background', '');
        $('.board-spot').on('click', handler);
        player1.spots.length = 0;
        player2.spots = [];
        boardState = [];
 
         
    }

    $('#update').on('click', resetBoard)
    
    // $('#player2-data img').attr('src', `/images/Red_X.svg`) // change players icon

})







