const pictures = ['tiger', 'hen', 'worm', 'stick'];

//// prepare variables for all elements
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const playerSelectedPicture = document.querySelector('#selected-pic');
const computerSelectedPicture = document.querySelector('#computer-pic');
const looserPicture = document.querySelector('#looser-pic');
const congratsPicture = document.querySelector('#congrats-pic');
const gameArea = document.querySelector('.game-area');
const countdownResultContainer = document.querySelector('#count-down');
const btnSelectPrevious = document.querySelector('#select-pic-previous');
const btnSelectNext = document.querySelector('#select-pic-next');
const btnConfirmSelect = document.querySelector('#confirm-select');
const btnPlayAgain = document.querySelector('#play-again');
const btnPlayAgainOutside = document.querySelector('#play-again-outside');

//// game state
const gameState = {
  playerSelection: 'tiger',
  computerSelection: null,
  computerScore: 0,
  playerScore: 0,
  round: 0,
  // phase: 'selection',
};

//// functions
const renderSelectedPicture = function () {
  playerSelectedPicture.innerHTML = `<img src="images/${gameState.playerSelection}.png">`;
};

const startTurn = function () {
  countdownResultContainer.classList.add('hide');
  btnPlayAgain.classList.add('hide');
  btnPlayAgainOutside.classList.add('hide');
  playerScore.innerHTML = `0`;
  computerScore.innerHTML = `0`;
  //computerSelectedPicture.classList.add('hide');
  renderSelectedPicture();
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

//compare and update score, (DIFFICULT part, got a lot of help for gameResult function and showResult function)
const gameResult = function (playerSelection, computerSelection) {
  const RULES = ['tiger', 'hen', 'worm', 'stick'];
  const playerIndex = RULES.indexOf(playerSelection);
  const computerIndex = RULES.indexOf(computerSelection);

  if (
    playerIndex === computerIndex + 1 ||
    (computerIndex === RULES.length - 1 && playerIndex === 0)
  ) {
    return 'lose';
  } else if (
    computerIndex === playerIndex + 1 ||
    (playerIndex === RULES.length - 1 && computerIndex === 0)
  ) {
    return 'win';
  } else {
    return 'tie';
  }
};

const showResult = function () {
  switch (gameResult(gameState.playerSelection, gameState.computerSelection)) {
    case 'lose':
      //console.log(`You loose 💩`);
      gameState.computerScore += 1;
      countdownResultContainer.innerHTML = `You loose 💩`;
      computerScore.innerHTML = gameState.computerScore;
      break;
    case 'win':
      //console.log(`You win 🎉 `);
      gameState.playerScore += 1;
      countdownResultContainer.innerHTML = `You win 🎉`;
      playerScore.innerHTML = gameState.playerScore;
      break;
    case 'tie':
      //console.log(`It's a tie 🤝`);
      countdownResultContainer.innerHTML = `It's a tie 🤝`;
      break;
  }

  //stop game when enough rounds or when one wins 3 rounds
  if (
    gameState.playerScore >= 3 ||
    gameState.computerScore >= 3 ||
    gameState.round === 5
  ) {
    showFinalResult();
  } else {
    setTimeout(() => {
      countdownResultContainer.classList.add('hide');
      btnConfirmSelect.classList.remove('hide');
      computerSelectedPicture.classList.remove('hide');
      computerSelectedPicture.classList.add('flip-vertical-right');
    }, 500);
  }
};

const showFinalResult = function () {
  btnConfirmSelect.classList.add('hide');

  //render final result
  // BIG You Win / You Lose
  if (gameState.playerScore > gameState.computerScore) {
    countdownResultContainer.innerHTML = `You win 🎉`;
    gameArea.classList.add('hide');
    congratsPicture.classList.remove('hide');
    btnPlayAgainOutside.classList.remove('hide');
  } else if (gameState.playerScore < gameState.computerScore) {
    countdownResultContainer.innerHTML = `You loose 💩`;
    gameArea.classList.add('hide');
    looserPicture.classList.remove('hide');
    btnPlayAgainOutside.classList.remove('hide');
  } else {
    countdownResultContainer.innerHTML = `It's a tie 🤝`;
  }

  computerSelectedPicture.classList.remove('hide');
  btnPlayAgain.classList.remove('hide');
};

const countDown = function (countDownValue) {
  if (countDownValue === 0) {
    return showResult();
  }
  //count down animation
  setTimeout(() => {
    countDown(countDownValue - 1);
  }, 1000);

  countdownResultContainer.innerHTML = countDownValue;

  computerSelectedPicture.classList.add('hide');
};

//// add 4 event listeners
btnSelectNext.addEventListener('click', selectNextPicture);
btnSelectPrevious.addEventListener('click', selectPreviousPicture);

btnConfirmSelect.addEventListener('click', () => {
  //update game state
  //don't know if game phase need to exist???
  // gameState.phase = 'countdown';
  gameState.round += 1;

  countdownResultContainer.classList.remove('hide');
  //btnSelectNext.classList.add('hide');
  //btnSelectPrevious.classList.add('hide');

  //generate a random computer picture
  let randomComputerPicture =
    pictures[Math.floor(Math.random() * pictures.length)];

  gameState.computerSelection = randomComputerPicture;
  computerSelectedPicture.innerHTML = `<img src="images/${randomComputerPicture}.png">`;

  btnConfirmSelect.classList.add('hide');

  countDown(3);
});

btnPlayAgain.addEventListener('click', () => {
  startTurn();
  btnConfirmSelect.classList.remove('hide');
});

btnPlayAgainOutside.addEventListener('click', () => {
  startTurn();
  btnConfirmSelect.classList.remove('hide');
  gameArea.classList.remove('hide');
  looserPicture.classList.add('hide');
  congratsPicture.classList.add('hide');
});
