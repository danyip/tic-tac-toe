console.log('tic-tac-toe-hellllo');


const boardState = []; // pushing the id of each spot as it is played
const player1Spots = [];
const player2Spots = [];

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
const winCheck = function(playerTurnArray){

    if (winningCombinations.some(function(array){
        return array.every(function(index){
            return playerTurnArray.includes(index)
        })
    })){
        console.log('Win');
        return true;
    }
    }

let p1Turn = true; // Variable to store whos turn it is

$(function(){
      



    // ON CLICK
    $('.board-spot').on('click',function(event){
        //set the player icon
        const playerIcon = p1Turn? 'red' : 'blue';

        const boardSpotId = event.originalEvent.target.id

        // mark spot and remove clickability
        $(this).css('background', playerIcon).off('click');

        // push the spot into the game array
        boardState.push(boardSpotId);

        //push the spot into the players array
        p1Turn? player1Spots.push(boardSpotId) : player2Spots.push(boardSpotId);

        // console.log(boardState);

        
        // check draw
        
        
        // swap turns
        p1Turn = !p1Turn;

    })



})




