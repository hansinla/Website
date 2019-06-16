// *************************************** //
//         Minimax Tic-Tac-Toe Player      //
//            Hans van Riet 2014           //
//  ported from Python to Javascript 2015  //
// *************************************** //

// Constants and global variables for Minimax
var EMPTY 	= -1;   	// constant for an empty cell
var DIM		=  9;		// size of game board
var XPLAYER =  1;   	// constant for Player X
var OPLAYER =  0;   	// constant for player O
var DRAW    = -2;   	// constant used to indicate draw
var NONE    = -5;   	// constant used to indicate no winner & no draw

var wins = [[0,1,2],[3,4,5],[6,7,8],      // if one player occupies one of these arrays,
      		[0,3,6],[1,4,7],[2,5,8],      // the player wins
      		[0,4,8],[2,4,6]];

// Initialize a gameboard array by setting all squares to EMPTY (-1)
function initGameBoard() {
	var gameboard = [];
	for (var i = 0; i < DIM; i++) {
		gameboard.push(EMPTY);
	}
    return gameboard;
}

// Return a list of empty squares in board
function getEmptySquares(board){
    var emptyList = [];
    for (var i = 0; i < board.length; i++) {
        if (board[i] === EMPTY) {
            emptyList.push(i);
        }
    }
    return emptyList;
}

// return a deeep copy of an array
function deepCopyArray(array){
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray.push(array[i]);
    }
    return newArray;
}

// Initialize a scorboard with zeros
function initScoreBoard(){
	var scores = [];
	for (var i = 0; i < DIM; i++) {
		scores.push(0);
	}
    return scores;
}

// Return a random index from an the list of empty squares
function randomChoice(emptyList){
    return emptyList[Math.floor(Math.random() * emptyList.length)];
}

// Make a move based the random index from the emptylist\
// and the player who's turn it is
// return the resulting board
function makeMove(board, index, player) {
            board[index] = player;
                  return board;
}


// switch players
function switchPlayer(player){
      return (player == XPLAYER) ? OPLAYER : XPLAYER;
}

// Check for winner XPLAYER or OPLAYER
// Next check if there are moves left, if none it's a DRAW
// else return NONE because there are moves left
function checkForWin(board) {
        for (var i = 0; i < wins.length; i++) {
            if (board[wins[i][0]] == XPLAYER &&
                board[wins[i][1]] == XPLAYER &&
                board[wins[i][2]]  == XPLAYER) {
                	return XPLAYER;
            	}	
            if (board[wins[i][0]] == OPLAYER &&
	            board[wins[i][1]] == OPLAYER &&
	            board[wins[i][2]]  == OPLAYER) {
	            	return OPLAYER;
	          	}
        }

        if (getEmptySquares(board).length === 0){
              return DRAW;
        } else {
              return NONE;
        }
 }


// ************  UNIT TESTING ************ //
var newBoard = initGameBoard();
console.log(checkForWin(newBoard));
newBoard = [1, 1, 1 , -1, -1,-1,-1,-1,-1];
console.log(checkForWin(newBoard));





