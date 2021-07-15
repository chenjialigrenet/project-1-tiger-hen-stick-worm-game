const pictures = ['tiger', 'hen', 'worm', 'stick'];

//// prepare variables for all elements
const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');
const showRound = document.querySelector('#round');
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
const winSound = document.querySelector('#win-music');
const looseSound = document.querySelector('#loose-music');
const ceremonySound = document.querySelector('#ceremony-music');
const failSound = document.querySelector('#looser-ending-music');
const tieSound = document.querySelector('#tie-music');
const popupRule = document.querySelector('#myPopup');

//// game state
const gameState = {
  playerSelection: 'tiger',
  computerSelection: null,
  computerScore: 0,
  playerScore: 0,
  round: 0,
};

//// functions
const renderSelectedPicture = function () {
  playerSelectedPicture.innerHTML = `<img src="images/${gameState.playerSelection}.png">`;
};

const rulePopup = function () {
  popupRule.classList.toggle('show');
};

const startTurn = function () {
  countdownResultContainer.classList.add('hide');
  computerSelectedPicture.classList.add('hide');
  gameArea.classList.remove('hide');
  looserPicture.classList.add('hide');
  congratsPicture.classList.add('hide');
  btnPlayAgain.classList.add('hide');
  btnPlayAgainOutside.classList.add('hide');
  btnConfirmSelect.classList.remove('hide');
  btnSelectNext.classList.remove('hide');
  btnSelectPrevious.classList.remove('hide');

  gameState.round = 0;
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  playerScore.innerHTML = `0`;
  computerScore.innerHTML = `0`;
  showRound.innerHTML = `${gameState.round} / 5`;

  renderSelectedPicture();
};

// main entry point!
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
  computerSelectedPicture.classList.add('hide');
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
  computerSelectedPicture.classList.add('hide');
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
      gameState.computerScore += 1;
      countdownResultContainer.innerHTML = `You loose 💩`;
      computerScore.innerHTML = gameState.computerScore;
      looseSound.play();
      break;
    case 'win':
      gameState.playerScore += 1;
      countdownResultContainer.innerHTML = `You win 🎉`;
      playerScore.innerHTML = gameState.playerScore;
      winSound.play();
      break;
    case 'tie':
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
      computerSelectedPicture.classList.remove('hide');
      computerSelectedPicture.classList.add('flip-vertical-right');
      btnSelectNext.classList.remove('hide');
      btnSelectPrevious.classList.remove('hide');
      btnConfirmSelect.classList.remove('hide');
    }, 500);
  }
};

const showFinalResult = function () {
  btnConfirmSelect.classList.add('hide');
  //computerSelectedPicture.classList.remove('hide');
  btnPlayAgain.classList.remove('hide');

  //render final result, BIG You Win / You Lose
  if (gameState.playerScore > gameState.computerScore) {
    congratsPicture.classList.remove('hide');
    gameArea.classList.add('hide');
    btnPlayAgainOutside.classList.remove('hide');
    ceremonySound.play();
  } else if (gameState.playerScore < gameState.computerScore) {
    looserPicture.classList.remove('hide');
    gameArea.classList.add('hide');
    btnPlayAgainOutside.classList.remove('hide');
    failSound.play();
  } else {
    countdownResultContainer.innerHTML = `It's a tie 🤝`;
    tieSound.play();
  }
};

const countDown = function (countDownValue) {
  if (countDownValue === 0) {
    computerSelectedPicture.classList.remove('hide');
    return showResult();
  }
  //count down animation
  setTimeout(() => {
    countDown(countDownValue - 1);
  }, 500);

  countdownResultContainer.innerHTML = countDownValue;
};

//// add 4 event listeners
btnSelectNext.addEventListener('click', selectNextPicture);
btnSelectPrevious.addEventListener('click', selectPreviousPicture);

btnConfirmSelect.addEventListener('click', () => {
  //update game state
  gameState.round += 1;
  showRound.innerHTML = `${gameState.round} / 5`;

  countdownResultContainer.classList.remove('hide');
  btnSelectNext.classList.add('hide');
  btnSelectPrevious.classList.add('hide');

  //generate a random computer picture
  let randomComputerPicture =
    pictures[Math.floor(Math.random() * pictures.length)];

  gameState.computerSelection = randomComputerPicture;
  computerSelectedPicture.innerHTML = `<img src="images/${randomComputerPicture}.png">`;

  btnConfirmSelect.classList.add('hide');
  computerSelectedPicture.classList.add('hide');

  countDown(3);
});

btnPlayAgain.addEventListener('click', () => {
  startTurn();
});

btnPlayAgainOutside.addEventListener('click', () => {
  startTurn();
});
