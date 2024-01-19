//Declare Variables DOM hooks
var highScoreEl = document.querySelector(".scoreboard__score__high");
var currentScoreEl = document.querySelector(".scoreboard__score__current");
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
var saveButtonEl = document.getElementById("save");
var playerNameEl = document.querySelector(".player_name");

//Declare Variables state

var highScore = 0;
var currentScore = 0;
var timer = null;
var timeLeft = 0;
var currentQuestion = 0;
var currentChoice;

//Declare Variables contants
var kQuestionList = [
	{
		question: "What are the three letters used to declare a variable?",
		choices: ["var", "css", "jvs", "idk"],
		correctAnswer: "var",
	},
	{
		question: "How do you create a function in JavaScript?",
		choices: [
			"function:myFunction()",
			"function myFunction()",
			"function = myFunction",
			"creatus functonum!",
		],
		correctAnswer: "function myFunction()",
	},
	{
		question: "How can you add a comment in a JavaScript?",
		choices: [
			"'This is a comment",
			"!This is a comment",
			"//This is a comment",
			"psst, hey comment",
		],
		correctAnswer: "//This is a comment",
	},
	{
		question: "Which event occurs when the user clicks on an HTML element?",
		choices: ["onclick", "onchange", "onmouseclick", "onmouseover"],
		correctAnswer: "onclick",
	},
];
var kDuration = 60;
var kStorageKey = "Javascript-Code-Quiz-scores";

//////////////////////
//Identify events

//Event Page Load
function init() {
	console.log("Get Ready To Quiz!");

	//show scoreboard
	showElement(scoreboardEl);

	//Retrieve data from persistance
	var scores = JSON.parse(localStorage.getItem(kStorageKey));
	//Update state
	if (scores !== null) {
		highScore = scores.highScore;
		currentScore = scores.currentScore;
	}

	//update UI
	updateScoreBoard();
}

//Event click start
function handleClickStart() {
	console.log("Let's Begin.");

	if (!timer) {
		//set time left
		timeLeft = kDuration;
		//start timer
		timer = setInterval(handleTimerTick, 1000);
		//display the first question
		renderQuestion(currentQuestion);

		timerEl.setAttribute("style", "text-align:center");
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
	}
}
controlsEl.addEventListener("click", handleClickStart);

//Event timer tick
function handleTimerTick(event) {
	console.log("timer clicked!");
	timeLeft--;

	timerEl.textContent = timeLeft;
	if (timeLeft === 0) {
		handleGameEnds(false);
	}
}

//Event Game ends
function handleGameEnds(lastQuestion) {
	clearInterval(timer);
	timer = null;

	localStorage.setItem(kStorageKey, JSON.stringify({ currentScore }));

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
function updateScoreBoard() {
	//updated UI
	highScoreEl.textContent = highScore;
	currentScoreEl.textContent = currentScore;
}

function hideElement(el) {
	el.classList.add("hide");
}

function showElement(el) {
	el.classList.remove("hide");
}

function displayResult(result) {
	resultEl.classList.remove("success");
	resultEl.classList.remove("failure");

	if (result) {
		resultEl.textContent = "Correct!";
		resultEl.classList.add("success");
	} else {
		resultEl.textContent = "Wrong!";
		resultEl.classList.add("failure");
	}
	showElement(resultEl);
}

//Show and hide the highscores board
function handleClickViewScores() {
	console.log("Welcome to the Scores.");
	var view = "hide";

	if (view === "hide") {
		//view the highscore scoreboard
		showElement(highScoreboardEl);
		//hide start button
		hideElement(controlsEl);
		///////////////////////////
		//reset the display
		//hide everything
		hideElement(questionsEl);
		hideElement(scoreboardEl);
		hideElement(gameOverEl);
		hideElement(resultEl);
		//show high scores display
		showElement(backToGameEl);
	} else {
		console.log("Welcome Back.");
		view = "show";
		//show start button
		showElement(controlsEl);
		///////////////////////////
		//reset the display
		//show scoreboard again
		showElement(scoreboardEl);
		//hide questions
		hideElement(questionsEl);
		//hide high scores display
		hideElement(highScoreboardEl);
		hideElement(backToGameEl);
	}
}
viewScoresEl.addEventListener("click", handleClickViewScores);

//Save score to high scoreboard
saveButtonEl.addEventListener("click", function (event) {
	event.preventDefault();
	// Save related form data as an object
	var playerHighScore = {
		playerName: playerNameEl.value.trim(),
		playerScore: currentScoreEl.value.trim(),
	};
	// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
	localStorage.setItem(kStorageKey, JSON.stringify(playerHighScore));
	renderScore();
});

function renderScore() {
	var lastScore = JSON.parse(kStorageKey.getItem("playerHighScore"));
	if (lastScore !== null) {
		document.getElementById("saved-name").textContent = lastScore.playerName;
		document.getElementById("saved-score").textContent = lastScore.playerScore;
	}
}

function handleClickBack() {
	console.log("Welcome Back.");
	var view = "show";

	if (view === "show") {
		//show start button
		showElement(controlsEl);
		///////////////////////////
		//reset the display
		//show scoreboard again
		showElement(scoreboardEl);
		//hide high scores display
		hideElement(highScoreboardEl);
		hideElement(backToGameEl);
	} else {
		view = "hide";
		//view the highscore scoreboard
		showElement(highScoreboardEl);
		//hide start button
		hideElement(controlsEl);
		///////////////////////////
		//reset the display
		//hide everything
		hideElement(questionsEl);
		hideElement(scoreboardEl);
		hideElement(gameOverEl);
		//show high scores display
		showElement(backToGameEl);
	}
}
backToGameEl.addEventListener("click", handleClickBack);

function renderQuestion(questionIndex) {
	currentQuestionEl.textContent = kQuestionList[questionIndex].question;

	for (var i = 0; i < kQuestionList[questionIndex].choices.length; i++) {
		var choice = kQuestionList[questionIndex].choices[i];

		var answerButton = document.createElement("button");
		answerButton.textContent = choice;
		answerButton.setAttribute("answerButtons", i);
		answerButton.classList.add("answerButtons");
		//Event listener for the choice made
		answerButton.addEventListener("click", function (event) {
			console.log(
				event.target.innerHTML,
				kQuestionList[questionIndex].correctAnswer
			);
			var currentChoice = event.target.innerHTML;
			if (currentChoice == kQuestionList[questionIndex].correctAnswer) {
				currentScore++;
				currentScoreEl.textContent = currentScore;
				localStorage.setItem(kStorageKey, currentScore);
				displayResult(true);
			} else {
				timeLeft -= 10;
				displayResult(false);
			}
		});

		choicesEl.appendChild(answerButton);
	}
}
//Start the game
init();
