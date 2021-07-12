const pictures = ['hen', 'tiger', 'stick', 'worm'];

//// prepare variables for all elements
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const playerSelectedPicture = document.querySelector('#selected-pic');
const computerSelectedPicture = document.querySelector('#computer-pic');
const countdownResultContainer = document.querySelector('#count-down');
const btnSelectPrevious = document.querySelector('#select-pic-previous');
const btnSelectNext = document.querySelector('#select-pic-next');
const btnConfirmSelect = document.querySelector('#confirm-select');
const btnPlayAgain = document.querySelector('#play-again');

//// game state
const gameState = {
  playerSelection: 'hen',
  computerScore: 0,
  playerScore: 0,
  round: 0,
  phase: 'selection',
};

///////functions
const renderSelectedPicture = function () {
  //// update DOM selected-picture element with gameState.playerSelection
  playerSelectedPicture.innerHTML = gameState.playerSelection;
};

const startTurn = function () {
  //// hide unneeded elements, show needed ones
  countdownResultContainer.classList.add('hide');
  //btnPlayAgain.classList.add('hide'); //?
  playerScore.innerHTML = `0`;
  computerScore.innerHTML = `0`;
  //computerSelectedPicture.classList.add('hide');
  //// reset selected pic to default?
  //.renderSelectedPicture();
};

//// main entry point!
startTurn();

const selectNextPicture = function () {
  if (gameState.playerSelection === 'hen') {
    gameState.playerSelection = 'worm';
  } else if (gameState.playerSelection === 'worm') {
    gameState.playerSelection = 'stick';
  } else if (gameState.playerSelection === 'stick') {
    gameState.playerSelection = 'tiger';
  } else if (gameState.playerSelection === 'tiger') {
    gameState.playerSelection = 'hen';
  }

  renderSelectedPicture();
};

const selectPreviousPicture = function () {
  if (gameState.playerSelection === 'hen') {
    gameState.playerSelection = 'tiger';
  } else if (gameState.playerSelection === 'tiger') {
    gameState.playerSelection = 'stick';
  } else if (gameState.playerSelection === 'stick') {
    gameState.playerSelection = 'worm';
  } else if (gameState.playerSelection === 'worm') {
    gameState.playerSelection = 'hen';
  }

  renderSelectedPicture();
};

// const countDown = function () {
//   let timer = 3;
//   let intervalId = setInterval(() => {
//     if (timer === 1) {
//       clearInterval(intervalId);
//       countdownResultContainer.innerHTML = `Now!`;
//     }
//     countdownResultContainer.innerHTML = timer;
//     timer -= 1;
//   }, 700);
// };

//// add event listeners
//// - next button
btnSelectNext.addEventListener('click', selectNextPicture);
//// - prev button
btnSelectPrevious.addEventListener('click', selectPreviousPicture);

//// confirmSelect
//// -> change Game state to phase "countdown", show and hide elements (prev/next/confirm button = hide)
//// -> start coutdown animation

//// - confirm select
btnConfirmSelect.addEventListener('click', () => {
  //change Game state to phase "countdown"
  gameState.phase = 'countdown';
  gameState.round += 1;

  //show and hide elements (prev/next/confirm button = hide)
  countdownResultContainer.classList.remove('hide');
  //btnSelectNext.classList.add('hide');
  //btnSelectPrevious.classList.add('hide');

  //generate a random computer picture
  computerSelectedPicture.innerHTML =
    pictures[Math.floor(Math.random() * pictures.length)];
  console.log(computerSelectedPicture.innerHTML);
  //count down or setTimeout
  // countDown();
  //flip both cards

  //compare
  //update score
  if (gameState.playerSelection === 'tiger') {
    if (computerSelectedPicture.innerHTML === 'hen') {
      console.log(`You win 🎉 `);
      gameState.playerScore += 1;
      playerScore.innerHTML = gameState.playerScore;
    } else if (computerSelectedPicture.innerHTML === 'stick') {
      console.log(`You loose 💩`);
      gameState.computerScore += 1;
      computerScore.innerHTML = gameState.computerScore;
    } else {
      countdownResultContainer.innerHTML = `It's a tie 🤝`;
    }
  } else if (gameState.playerSelection === 'hen') {
    if (computerSelectedPicture.innerHTML === 'worm') {
      console.log(`You win 🎉 `);
      gameState.playerScore += 1;
      playerScore.innerHTML = gameState.playerScore;
    } else if (computerSelectedPicture.innerHTML === 'tiger') {
      console.log(`You loose 💩`);
      gameState.computerScore += 1;
      computerScore.innerHTML = gameState.computerScore;
    } else {
      console.log(`It's a tie 🤝`);
    }
  } else if (gameState.playerSelection === 'worm') {
    if (computerSelectedPicture.innerHTML === 'stick') {
      console.log(`You win 🎉 `);
      gameState.playerScore += 1;
      playerScore.innerHTML = gameState.playerScore;
    } else if (computerSelectedPicture.innerHTML === 'hen') {
      console.log(`You loose 💩`);
      gameState.computerScore += 1;
      computerScore.innerHTML = gameState.computerScore;
    } else {
      console.log(`It's a tie 🤝`);
    }
  } else if (gameState.playerSelection === 'stick') {
    if (computerSelectedPicture.innerHTML === 'tiger') {
      console.log(`You win 🎉 `);
      gameState.playerScore += 1;
      playerScore.innerHTML = gameState.playerScore;
    } else if (computerSelectedPicture.innerHTML === 'worm') {
      console.log(`You loose 💩`);
      gameState.computerScore += 1;
      computerScore.innerHTML = gameState.computerScore;
    } else {
      console.log(`It's a tie 🤝`);
    }
  }

  //stop game when enough rounds or when one wins 3 rounds
  if (gameState.playerScore >= 3 || gameState.computerScore >= 3) {
    btnConfirmSelect.classList.add('hide');
  }
  if (gameState.round === 5) {
    btnConfirmSelect.classList.add('hide');
  }

  //render result
  if (gameState.playerScore > gameState.computerScore) {
    countdownResultContainer.innerHTML = `You win 🎉`;
  } else if (gameState.playerScore < gameState.computerScore) {
    countdownResultContainer.innerHTML = `You loose 💩`;
  } else {
    countdownResultContainer.innerHTML = `It's a tie 🤝`;
  }

  //show hidden elements
  btnPlayAgain.classList.remove('hide');
});

//// - play again
btnPlayAgain.addEventListener('click', () => {
  startTurn();
  btnConfirmSelect.classList.add('hide');
});
