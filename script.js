'use strict';

// Elements selection

const score0Element = document.querySelector('#score--0');
const current0Element = document.querySelector('#current--0');

const score1Element = document.querySelector('#score--1');
const current1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game  initial conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchActivePlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  //1. Generate a random number
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  //2. Display number on the dice
  diceElement.classList.remove('hidden');
  diceElement.src = `dice${diceNumber}.png`;

  //3. If number is 1, switch to the new player. if not - add number to the current score
  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchActivePlayer();
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to active player total score.
  totalScores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    totalScores[activePlayer];

  // 2. If total score of active layer >= 100, active player won, if not - switch player
  if (totalScores[activePlayer] >= 20) {
    isPlaying = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchActivePlayer();
  }
});
