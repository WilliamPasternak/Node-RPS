document.querySelector('#shoot').addEventListener('click', makeReq)

// DOM elements
const playerDisplay = document.querySelector('#playerScore');
const serverDisplay = document.querySelector('#serverScore');
const serverChoice = document.querySelector('#serverChoice');
const gameResults = document.querySelector('#gameResults');
const playAgainBtn = document.querySelector('#playAgain');
const winnerDisplay = document.querySelector('#winner');

// Keep track of score
let playerScore = 0;
let serverScore = 0;

async function makeReq(){
  const userChoice = document.querySelector("#choice").value;
  const res = await fetch(`/api?choice=${userChoice}`)
  const data = await res.json()

  if(data.incrementPlayerScore) {
    playerScore++;
  } else if(data.incrementServerScore) {
    serverScore++;
  }
  // Needed to prevent the game from continuing if someone has won
  if(!checkIfGameOver()) {
    serverChoice.textContent = 'Server threw: ' + data.serverThrew
    gameResults.textContent =  data.outcome
    playerDisplay.textContent = 'Your Score: ' + playerScore;
    serverDisplay.textContent = 'Server Score: ' + serverScore;
  }
  
}

// Start the game over
playAgainBtn.addEventListener('click', () => {
  location.reload();
})

// If the winning conditions have been met, end the game
function checkIfGameOver() {
  if(playerScore >= 5 || serverScore >= 5) {
    endGame();
    return true;
  }
  return false;
}

// Show final scores, and show the Play Again button
function endGame() {
  // Clear space for final results message and disbale 'Shoot' button
  playerDisplay.classList.add('hidden');
  serverDisplay.classList.add('hidden');
  serverChoice.classList.add('hidden');
  gameResults.classList.add('hidden');
  document.querySelector('#shoot').disabled = true;

  // Display final messages and allow user to play again 
  winnerDisplay.textContent = `${determineWinner()} wins!`;
  document.querySelector('#results').textContent = `Final Scores: Player ${playerScore}, Server ${serverScore}`;
  playAgainBtn.classList.remove('hidden');
}

// Return the winner
function determineWinner() {
  if(playerScore > serverScore) {
    return 'The Player';
  }
  return 'The Server';
}