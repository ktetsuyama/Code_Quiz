//Declare Variables DOM hooks
var highScoreEl = document.querySelector(
	".scoreboard__score__value scoreboard__score_value--high"
);
var currentScoreEl = document.querySelector(
	".scoreboard__score__value scoreboard__score_value--current"
);
var timerEl = document.querySelector(".questions__timer");
var startGameButtonEl = document.querySelector(".controls__playgame");
var questionsEl = document.querySelector(".questions");
var currentQuestionEl = document.querySelector(".questions__currentQuestion");
var choicesEl = document.querySelector(".questions__choices");
var resultEl = document.querySelector(".questions__result");
var controlsEl = document.querySelector(".controls");

//Declare Variables state

var high = 0;
var current = 0;
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

	//Retrieve data from persistance
	var scores = JSON.parse(localStorage.getItem(kStorageKey));
	//Update state
	if (scores !== null) {
		high = scores.high;
		current = scores.current;
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
		for (var i = 0; i < currentQuestion.length; i++) {
			return kQuestionList[0];
		}

		//capture choice

		timerEl.textContent = timeLeft;

		//hide start button
		hideElement(controlsEl);
		///////////////////////////
		//reset the display
		//hide any result messages
		hideElement(resultEl);
		//show question area
		showElement(questionsEl);
		//show timer
		showElement(timerEl);
		//show current question
		showElement(currentQuestionEl);
		//show answer choices
		showElement(choicesEl);
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
		updateScoreBoard();

		// if (){
		//   handleGameEnds(true);
		// }
	}
}
// //Event Game ends
function handleGameEnds(lastQuestion) {
	clearInterval(timer);
	timer = null;

	if (didWin) {
	} else {
	}

	localStorage.setItem(kStorageKey, JSON.stringify({ high }));

	//display result message
	return "Game Over";
	updateScoreBoard();
	showElement(controlsEl);
}
// ///////////////////////
// //Refactor
function updateScoreBoard() {
	//updated UI
	highScoreEl.textContent = high;
	currentScoreEl.textContent = current;
}

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

//Start the game
init();
