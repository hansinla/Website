var disclaimer ='<h3>Please gamble responsibly.</h3><p> When you borrow money to play and spend above your budget using money allocated for other purposes, it can ultimately lead to more significant problems for you and your family.</p><p>If you think that you or someone you care about might have a gambling problem, call the 1-800-GAMBLER Helpline or visit the <a href="http://problemgambling.securespsites.com/ccpgwebsite/default.aspx">Office of Problem Gambling</a> for additional information and resources.</p>';

function getNumbers(){
	var baseUrl = "http://www.calottery.com/sitecore/content/Miscellaneous/download-numbers/?GameName=";
	var suffix = "&Order=No";

	var handlingSuperLotto = true;
	getOnlineData(handlingSuperLotto, baseUrl + "superlotto-plus" + suffix);
	handlingSuperLotto = false;
	getOnlineData(handlingSuperLotto, baseUrl + "mega-millions" + suffix);

	// document.getElementById("explanation").style.visibility='hidden';
	// document.getElementById("disclaimer").style.visibility='visible';
	document.getElementById("explanation").innerHTML = disclaimer;

}

function getOnlineData(handlingSuperLotto, url){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
   			var response = xhr.responseText;
   			// handle response
   			parseResults(handlingSuperLotto, response);
  		}
	};
	xhr.send();
}

function parseResults(handlingSuperLotto, response){
	var balls = [];
	var extraBalls = [];

	// split result into lines
	var lines = response.split(/\r?\n/);

	// dump first five lines, this is just layout information
	for (var i = 0; i < 5; i++) {
		lines.shift();
	}

	// Output some info about this run
	console.log(handlingSuperLotto ? "Super Lotto Plus" : "Mega Millions");
	console.log("Last drawing number:", lines[0].slice(0,4));

	// split each line into separate elements
	for (var j = 0; j < lines.length; j++) {
		// filter out drawings before Oct 19 2013 for MegaMillions
		if ((lines[j].slice(0,4) >= 870 && !handlingSuperLotto) || handlingSuperLotto) {
			var drawing = lines[j].split(/\s+/g);
			for (var k = 5; k < 10; k++) {
				if (balls[drawing[k]]) {
					balls[drawing[k]] += 1;
				} else {
					balls[drawing[k]] = 1;
				}
			}
			if (extraBalls[drawing[10]]) {
				extraBalls[drawing[10]] += 1;
			} else {
				extraBalls[drawing[10]] = 1;
			}
		}
	}

	// calculate total number of drawing
	var numDrawings = extraBalls.reduce(function(a, b) {
  		return a + b;
	});
	console.log("Total number of drawings used in calculations:", numDrawings);

	// Make a pool based on number frequency
	var ballPool = fillNumberPools(balls, numDrawings);
	var extraPool = fillNumberPools(extraBalls, numDrawings);

	// pick 5 winning numbers and 1 extra number
	var winningNumbers = pickWinningNumbers(ballPool, 5);
	var extraNumber = pickWinningNumbers(extraPool, 1);
	console.log("Winning numbers:", winningNumbers, " extra number:", extraNumber);

	// display the numbes on the page
	displayNumber( winningNumbers, extraNumber, handlingSuperLotto);

}


function fillNumberPools(ballArray, numDrawings){
	var retArray = [];
	// fill the number pools
	for (var i = 1; i < ballArray.length ; i++) {
		for (var j = 0; j < ( numDrawings - ballArray[i] + 50); j++) {
			retArray.push(i);
		}	
	}
	return retArray;
}

function pickWinningNumbers(pool, amountToPick){
	// Finally, draw from the array our (hopefully) winning numbers
	var lotteryPicks = [];
	var upperlimit = pool.length;

	do {
		var currentPickIndex = Math.floor(Math.random() * upperlimit + 1);
		var currentPick = pool[currentPickIndex];
		if (lotteryPicks.indexOf(currentPick) == -1){
			lotteryPicks.push(currentPick);
		}
	} while (lotteryPicks.length < amountToPick);

	lotteryPicks = lotteryPicks.sort(function(a, b){
		return a-b;
	});
	return lotteryPicks;
}

function displayNumber( winningNumbers, megaNumber, handlingSuperLotto) {

	if (handlingSuperLotto){
		for (var i = 0; i < winningNumbers.length; i++) {
			document.getElementById("num"+i.toString()).innerHTML = winningNumbers[i];
		}
		document.getElementById("super").innerHTML = megaNumber[0];

		} else {
			for (var j = 0; j < winningNumbers.length; j++) {
			document.getElementById("meg"+j.toString()).innerHTML = winningNumbers[j];
		}
		document.getElementById("mega").innerHTML = megaNumber[0];
	}

}

