//Declare Variables DOM hooks
var highScoreEl = document.querySelector(
	".scoreboard__score__value scoreboard__score_value--high"
);
var currentScoreEl = document.querySelector(
	".scoreboard__score__value scoreboard__score_value--current"
);
var scoreboardEl = document.querySelector(".scoreboard");
var viewScoresEl = document.querySelector(".scoreboard__view__highscores");
var highScoreboardEl = document.querySelector(".scoreboard__highscores");
var backToGameEl = document.querySelector(".scoreboard__back");
var timerEl = document.querySelector(".questions__timer");
var startGameButtonEl = document.querySelector(".controls__playgame");
var questionsEl = document.querySelector(".questions");
var currentQuestionEl = document.querySelector(".questions__currentQuestion");
var choicesEl = document.querySelector(".questions__choices");
var resultEl = document.querySelector(".questions__result");
var controlsEl = document.querySelector(".controls");
var gameOverEl = document.querySelector(".gameOver");

//Declare Variables state

var highScore = 0;
var currentScore = 0;
var timer = null;
var timeLeft = 0;
var currentQuestion = [];
var currentChoice = [];

//Declare Variables contants
var kQuestionList = [
	"What are the three letters used to declare a variable?",
	"Inside which HTML element do we put the JavaScript?",
	"How do you create a function in JavaScript?",
	"How can you add a comment in a JavaScript?",
	"Which event occurs when the user clicks on an HTML element?",
];
var kAnswers = [
	"var",
	"css",
	"jvs",
	"idk",
	"<js>",
	"<scripting>",
	"<javascript",
	"<script>",
	"function:myFunction()",
	"function myFunction()",
	"function = myFunction",
	"creatus functonum!",
	"'This is a comment",
	"!This is a comment",
	"//This is a comment",
	"psst, hey comment",
	"onclick",
	"onchange",
	"onmouseclick",
	"onmouseover",
];
var kCorrectAnswer = [
	"var",
	"<script>",
	"function myFunction()",
	"//This is a comment",
	"onclick",
];
var kDuration = 2;
var kStorageKey = "Javascript-Code-Quiz-scores";

//////////////////////
//Identify events

//Event Page Load
function init() {
	console.log("Get Ready To Quiz!");

	//show scoreboard
	showElement(scoreboardEl);
	// showElement(viewScoresEl);

	//Retrieve data from persistance
	var scores = JSON.parse(localStorage.getItem(kStorageKey));
	//Update state
	if (scores !== null) {
		highScore = scores.highScore;
		currentScore = scores.currentScore;
	}

	//update UI
	// updateScoreBoard();
}

//Event click start
function handleClickStart(event) {
	console.log("Let's Begin.");

	if (!timer) {
		//set time left
		timeLeft = kDuration;
		//start timer
		timer = setInterval(handleTimerTick, 1000);
		//display the first question
		currentQuestion.textContent = kQuestionList[0];
		console.log(currentQuestion);

		//capture choice
		choicesEl.addEventListener("click", function () {
			if (currentChoice == kCorrectAnswer) {
				currentScore++;
				current.textContent = currentScore;
				localStorage.setItem("current", currentScore);
				displayResult(correct);
			} else {
				displayResult();
			}
		});

		timerEl.textContent = timeLeft;

		//hide start button
		hideElement(controlsEl);
		///////////////////////////
		//reset the display
		//hide any result messages
		hideElement(resultEl);
		//hide game over text
		hideElement(gameOverEl);
		//show question area
		showElement(questionsEl);
		//show timer
		showElement(timerEl);
		//show current question
		showElement(currentQuestionEl);
		//show answer choices
		showElement(choicesEl);
		//show question display
		updateQuestionDisplay();
	}
}
startGameButtonEl.addEventListener("click", handleClickStart);
//Event timer tick
function handleTimerTick(event) {
	console.log("timer clicked!");
	timeLeft--;

	timerEl.textContent = timeLeft;
	if (timeLeft === 0) {
		handleGameEnds(false);
	}
}
//Event choice clicked
function handleAnserClicked(event) {
	console.log("choice made: ", event.clicked);

	if (timer && kQuestionList == [0]) {
		if (kCorrectAnswer.includes(event.clicked)) {
			displayResult(correct);
		}

		//Update UI
		// updateScoreBoard();

		// if (){
		//   handleGameEnds(true);
		// }
	}
}
// //Event Game ends
function handleGameEnds(lastQuestion) {
	clearInterval(timer);
	timer = null;

	// if (didWin) {
	// } else {
	// }

	// localStorage.setItem(kStorageKey, JSON.stringify({ highScore }));

	//display result message
	if (timer == null) {
		//set attributes of h3
		gameOverEl.setAttribute("style", "color:blue; text-align:center");

		// Adds text content to created tag
		gameOverEl.textContent = "Game Over!";

		//show element
		showElement(gameOverEl);
	}
	// updateScoreBoard();
	showElement(controlsEl);
}
// ///////////////////////
// //Refactor
// function updateScoreBoard() {
// 	//updated UI
// 	highScoreEl.textContent = highScore;
// 	currentScoreEl.textContent = currentScore;
// }

function hideElement(el) {
	el.classList.add("hide");
}

function showElement(el) {
	el.classList.remove("hide");
}

function displayResult(correct) {
	resultEl.classList.remove("success");
	resultEl.classList.remove("failure");
	hideElement(timerEl);

	if (correct) {
		resultEl.textContent = "Correct!";
		resultEl.classList.add("success");
	} else {
		resultEl.textContent = "Wrong!";
		resultEl.classList.add("failure");
	}
	showElement(resultEl);
}

function updateQuestionDisplay() {
	for (var i = 0; i < kQuestionList.length; i++) {
		currentQuestionEl.textContent = kQuestionList[i];
	}
}

function saveHighScore() {
	// Save related form data as an object
	var playerHighScore = {
		playerName: playerName.value,
		playerScore: currentScore.value,
	};
	// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
	localStorage.setItem(kStorageKey, JSON.stringify({ playerHighScore }));
}
function handleClickViewScores() {
	console.log("Your saved scores.");
	//view the highscore scoreboard
	viewScoresEl.addEventListener("click", function () {
		//hide start button
		hideElement(controlsEl);
		///////////////////////////
		//reset the display
		//hide everything
		hideElement(questionsEl);
		hideElement(scoreboardEl);
		//show high scores display
		showElement(highScoreboardEl);
		showElement(backToGameEl);
	});
}
viewScoresEl.addEventListener("click", handleClickViewScores);

function handleClickBack() {
	console.log("Welcome Back.");
	//view the highscore scoreboard
	backToGameEl.addEventListener("click", function () {
		//hide start button
		showElement(controlsEl);
		///////////////////////////
		//reset the display
		//show scoreboard again
		showElement(scoreboardEl);
		//show high scores display
		hideElement(highScoreboardEl);
		hideElement(backToGameEl);
	});
}
viewScoresEl.addEventListener("click", handleClickBack);

//Start the game
init();
