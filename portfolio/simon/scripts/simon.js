// load images
var darkSimon	= 'images/simon_dark.png';
var lightSimon	= 'images/simon_light.png';

var squares = [
				'images/simon_red.png', 	// red image
				'images/simon_blue.png', 	// blue image
				'images/simon_yellow.png',	// yellow image
				'images/simon_green.png' 	//green image
				];

// load sounds
var sound1 		= new Audio("sound/simonSound1.wav");
var sound2 		= new Audio("sound/simonSound2.wav");
var sound3 		= new Audio("sound/simonSound3.wav");
var sound4 		= new Audio("sound/simonSound4.wav");
var badSound 	= new Audio("sound/simonBad.wav");

var sounds = [sound1, sound2, sound3, sound4 ];

var game;

$(document).ready(function(){

	$(document).on('change', 'input:radio[id^="inlineRadio1"]', function() {
        gamePlay();
    });

    $(document).on('change', 'input:radio[id^="inlineRadio2"]', function() {
        gamePlay();
    });
	
	$('#start').click(function(){
		console.log("Starting game");
		gamePlay();
	});

	$('.game_button').click(function(){
		if (game && game.inProgress){
			showColor(game.toneDuration,this.id);
			if (checkInput(this.id)){
				if (game.playerArr.length == game.gameArr.length){
					newLevel();
				}
			} else { 
				sounds[this.id].pause();
				sounds[this.id].currentTime = 0;
				badSound.play();
				game.playerArr = [];
				// if strict mode is off, just allow for reset of player array
				// else end game
				if (game.strictMode){
					game.inProgress = false;
					game.level = 0;
					$("#level").html(game.level.toString());
					alert("Strict mode: game over");
				}
			}
		} else {
			showColor(500,this.id);
		}
	});

});

function showColor(toneDuration, idx){
	sounds[idx].play();
	$('#game').css('background-image', 'url("' + squares[idx] + '")');
	var timer = new Timer(toneDuration, idx);
	timer.resetColor();
}

function Timer(time, btnIndex) {
	this.time = time;
	this.index = btnIndex;

	this.end = function() {
		sounds[this.index].pause();
		sounds[this.index].currentTime = 0;
		$('#game').css('background-image', 'url("' + darkSimon + '")');
		window.clearTimeout(this.timeoutID);
    	delete this.timeoutID;
  	};

  	this.resetColor = function() {
  		var self = this;
	    if (typeof this.timeoutID == "number") {
	      this.end();
	    } else {
	      this.timeoutID = window.setTimeout(function() {self.end();}, self.time);
	    }
  	};
}

function randomNumer(){
	return Math.floor(Math.random() * 4);
}

function Game(){
	this.level 			= 0;
	this.inProgress 	= true;
	this.strictMode 	= $("input[id='inlineRadio1']:checked").val() ? true : false;
	this.gameArr 		= [];
	this.playerArr 		= [];
	this.toneDuration 	= 600; 		
	this.interval 		= 300;		

	this.showSequence = function(){
		var self = this;
		var counter = 0;
		var intervalID = window.setInterval(function(){
			showColor(self.toneDuration, self.gameArr[counter]);
			counter++;
			if (counter == self.gameArr.length) {clearInterval(intervalID);}
		}, self.toneDuration + self.interval);
	};

}

function gamePlay(){
	// create a new game object
	game = new Game();
	//increase level
	newLevel();
}

function newLevel(){
	game.level += 1 ;
	$("#level").html(game.level.toString());

	switch (game.level){
		case 5:
		case 9:
		case 13:
			game.toneDuration -= 100;
			game.interval -= 20;
			console.log("Increasing speed. toneDuration:", game.toneDuration, " interval:", game.interval);
			break;
		case 21:
			game.inProgress = false;
			game.level = 0;
			$("#level").html(game.level.toString());
			alert("You won. Hit the Start game button to play another game");
			break;
		default:
			break;
	}

	// push a new random number in array
	game.gameArr.push(randomNumer());
	// reset player array
	game.playerArr = [];

	console.log("Strict Mode:", game.strictMode);
	console.log("Game Array:", game.gameArr);

	// show the game sequence so far
	game.showSequence();
}

function checkInput(id){
	game.playerArr.push(id);
	console.log("Player Array:", game.playerArr);
	for (var i = 0; i < game.playerArr.length; i++) {
		if (game.playerArr[i] != game.gameArr[i]){ return false;}
	}
	return true;
}