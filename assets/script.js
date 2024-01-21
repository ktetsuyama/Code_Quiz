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
var clearButtonEl = document.getElementById("clear");
var currentScoreSaveEl = document.getElementById("currentScore");
var playerNameEl = document.querySelector(".player_name");

//Declare Variables state

var highScore;
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
var kDuration = 20;
var kStorageKeyHigh = "Javascript-Code-Quiz-High-scores";
var kStorageKeyCurrent = "Javascript-Code-Quiz-Current-score";

//////////////////////
//Identify events

//Event Page Load
function init() {
	console.log("Get Ready To Quiz!");

	//show scoreboard
	showElement(scoreboardEl);

	//Retrieve data from persistance
	var scores = localStorage.getItem(kStorageKeyHigh);

	var highScoreSaved = JSON.parse(scores);
	//Update state
	if (scores !== null) {
		highScore = highScoreSaved.playerScore;
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
function handleGameEnds() {
	clearInterval(timer);
	timerEl.innerHTML = "";
	timer = null;

	localStorage.setItem(kStorageKeyCurrent, JSON.stringify({ currentScore }));

	// Reset game state
	currentScore = 0;
	timeLeft = 0;
	currentQuestion = 0;

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

///////////////////////
//Refactor
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

		//Retrieve data from persistance
		var scores = JSON.parse(localStorage.getItem(kStorageKeyHigh));
		var currentScoreData = JSON.parse(localStorage.getItem(kStorageKeyCurrent));
		//Update state
		if (scores !== null) {
			currentScore = scores.playerScore;
		}
		if (currentScoreData !== null) {
			currentScore = currentScoreData.currentScore;
		}
		//show high scores display
		showElement(backToGameEl);

		currentScoreSaveEl.textContent = currentScore;
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
		playerScore: currentScore,
	};
	// Use .setItem() to store object in storage and JSON.stringify to convert it as a string
	localStorage.setItem(kStorageKeyHigh, JSON.stringify(playerHighScore));
	console.log(localStorage);
	renderScore();
});

function renderScore() {
	var lastScore = JSON.parse(localStorage.getItem(kStorageKeyHigh));
	if (lastScore !== null) {
		document.getElementById("saved-name").textContent = lastScore.playerName;
		document.getElementById("saved-score").textContent = lastScore.playerScore;
	}
}

function handleClickBack() {
	console.log("Welcome Back.");
	var view = "show";

	if (view === "show") {
		// Reset game states
		currentScore = 0;
		timer = null;
		timeLeft = 0;
		currentQuestion = 0;

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
	// Retrieve data from persistence
	var scores = JSON.parse(localStorage.getItem(kStorageKeyHigh));
	// Update state
	if (scores !== null) {
		highScore = scores.playerScore;
	}
	//update UI
	updateScoreBoard();
}
backToGameEl.addEventListener("click", handleClickBack);

function renderQuestion() {
	currentQuestionEl.textContent = kQuestionList[currentQuestion].question;
	choicesEl.innerHTML = "";
	for (var i = 0; i < kQuestionList[currentQuestion].choices.length; i++) {
		var choice = kQuestionList[currentQuestion].choices[i];

		var answerButton = document.createElement("button");
		answerButton.textContent = choice;
		answerButton.setAttribute("answerButtons", i);
		answerButton.classList.add("answerButtons");
		//Event listener for the choice made
		answerButton.addEventListener("click", function (event) {
			console.log(
				event.target.innerHTML,
				kQuestionList[currentQuestion].correctAnswer
			);
			var currentChoice = event.target.innerHTML;
			if (currentChoice == kQuestionList[currentQuestion].correctAnswer) {
				currentScore++;
				currentScoreEl.textContent = currentScore;
				localStorage.setItem(kStorageKeyCurrent, currentScore);
				displayResult(true);
			} else {
				timeLeft -= 10;
				displayResult(false);
			}
			currentQuestion++;
			if (currentQuestion < kQuestionList.length) {
				renderQuestion();
			} else {
				handleGameEnds();
			}
		});

		choicesEl.appendChild(answerButton);
	}
}

function clearCurrentScore() {
	localStorage.clear(kStorageKeyCurrent, currentScoreEl);
	currentScoreEl.textContent = "";
}
clearButtonEl.addEventListener("click", clearCurrentScore);

//Start the game
init();
