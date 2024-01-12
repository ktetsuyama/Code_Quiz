//show a start quiz button
//on click, hide start button

const start = (element) => {
  element.hidden = true;
}
//start timer
var timeEl = document.querySelector(".time");

var GameOver = document.querySelector("GameOver");

var secondsLeft = 2;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    // As long as the `secondsLeft` is greater than 1
    if(secondsLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timeEl.textContent = "Timer: "+ secondsLeft + " secs.";
      // Decrement `secondsLeft` by 1
      secondsLeft--;
    } else if (secondsLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timeEl.textContent = "Timer: " + secondsLeft + " sec.";
      secondsLeft--;
    } else {
      // Once `secondsLeft` gets to 0, set `timerEl` to an empty string
      timeEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timerInterval);
      // Call the `displayMessage()` function
      sendMessage();
    }

  }, 1000);
}

// Function to display game ovr rmessage
function sendMessage() {
  var divText = document.createElement("p");
  divText.setAttribute("p", "Game Over");
  GameOver.appendChild(divText);
}

setTime();


//show a start quiz button

//on click, hide start button

//show first question

//on click of chosen answer, 

//see if the answer is correct

//if correct, add to score

//else, don't add to score and penalize time

//show next questions

//repeat until quiz end or timer runs out

//after last question, or timer runs out, hide questions and show score

//allow saving intials and score

//on click of "Show Highscores", hide quiz and show list of scores

//on click of "Clear scores", clear scores

//extra
//if correct, display "Correct!"

//else, display "Wrong!"