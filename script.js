// phases:
// 1/ selection
// 2/ countdown
// 3/ reveal + show congrats/you lose

const pictures = ['hen', 'tiger', 'stick', 'worm'];

// prepare variables for all elements

// game state
const gameState = {
  playerSelection: 'hen',
  computerScore: 0,
  playerScore: 0,
  round: 1,
  phase: 'selection',
};

// add event listeners
// - next button
// - prev button
// - confirm select
// - play again

const startTurn = function () {
  // hide unneeded elements, show needed ones
  // reset selected pic to default?
  renderSelectedPicture();
};

const renderSelectedPicture = function () {
  // update DOM selected-picture element with gameState.playerSelection
};

const selectNextPicture = function () {
  // according to gameState.playerSelection => update gameState.playerSelection
  gameState.playerSelection = pictures[currentValue + 1];
  renderSelectedPicture();
};

const selectPreviousPicture = function () {};

// confirmSelect
// -> change Game state to phase "countdown", show and hide elements (prev/next/confirm button = hide)
// -> start coutdown animation

// main entry point!
startTurn();
