// Most of this JavaScript is for the simple Lights Out game. 
// There are a lot of coding resources for this game online, but I coded it my own way.

// global
var board = []; /* board holds all of the game pieces */

// this function runs after page loads
$(function(){

    startGame(board);
});


// Constructor holds key information about each gamepiece
class GamePiece{
    constructor(light, x, y, pos){
        this.light = light;
        this.x = x;
        this.y = y;
        this.pos = pos;
    }
}


function resetGame(board){
    board = [];
    startGame(board);
}


function startGame(board){
    
    const GAMESIZE = 25;
    const GRIDSIZE = parseInt(Math.sqrt(GAMESIZE));

    for (i = 0; i < GAMESIZE; i++){
        // generate board
        x = i%GRIDSIZE;
        y = parseInt(i/GRIDSIZE);

        gamePiece = new GamePiece(true, x, y);
        board.push(gamePiece);

    }
    const SHUFFLELENGTH = 30;

    $("#lights_out_message").empty();
    $("#lights_out_message").html("Click the boxes to toggle the lights. Try to turn all of the lights on or off to win.");
    shuffleBoard(board, SHUFFLELENGTH);
    printBoard(board);    
}


// recursive function which presses buttons randomly to shuffle the board.
function shuffleBoard(board, length){

    if (length > 0){
    const TIMEOUTLENGTH = 100;
    GRIDSIZE = parseInt(Math.sqrt(board.length));
    console.log(GRIDSIZE);
    x = parseInt(Math.random()*GRIDSIZE);
    y = parseInt(Math.random()*GRIDSIZE);
    console.log(x + " " + y);
        setTimeout(function(){ 
            pushPiece(board, x, y);
            shuffleBoard(board, length-1);
    
        }, TIMEOUTLENGTH);
    }

}


// Usually, to win, all of the lights should be off. However, because the colors don't make it clear, the lights can be all on or all off.
function checkWin(board){

    // check if the first light is on or off
    light = board[0].light;

    // check the other lights to see if they match the first light. If they don't, return false.
    for (i = 1; i < board.length; i++){
        if (board[i].light != light){
            $("#lights_out_message").empty();
            $("#lights_out_message").html("Click the boxes to toggle the lights. Try to turn all of the lights on or off to win.");
            return false;
        }
    }

    // if all of the lights match, put the congratulations message in the div with a button to shuffle.
    $("#lights_out_message").empty();
    $("#lights_out_message").html("Congratulations! You won! <span class='text-button' onclick='resetGame(board)'>Play Again?</span>");
    return true;
}

function pushPiece(board,x,y){
    
    for (i = 0; i < board.length; i++){

        // the piece that was touched
        if (board[i].x == x && board[i].y == y){
            board[i].light = !board[i].light;
            
        }

        if (Math.abs(board[i].x - x) <= 1 && board[i].y == y){
            board[i].light = !board[i].light;
        }

        if (board[i].x == x && Math.abs(board[i].y - y) <= 1){
            board[i].light = !board[i].light;
        }
    }

    printBoard(board);
    checkWin(board);
}

// creates a visual representation of the LightsOut board using jquery
function printBoard(board){
    $("#game_div").empty();
    for (i = 0; i < board.length; i++){
        // place it on the board
        piece_div = document.createElement("div");
        $(piece_div).addClass("piece");
        $(piece_div).attr("onClick", "pushPiece(board," + board[i].x + ", " + board[i].y + ")"); /* adds an onclick to call the pushPiece function */
        
        // Uses blue for the light on, red for the light off.
        if (board[i].light){
            $(piece_div).css('background-color', 'var(--blue)');
        }
        else {
            $(piece_div).css('background-color', 'var(--red)');
        }

        $("#game_div").append(piece_div);
    }
}