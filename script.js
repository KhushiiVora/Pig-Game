'use strict';

// code in comment is my logic which didn't worked
// # is used for id
// selecting elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting condition
let scores, currentScore, active, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  active = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceEl.classList.add('hidden');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  active = active === 0 ? 1 : 0;
  // toggle adds class if it isn't there and removes it if its already there.
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};
// const switch01 = function () {
//   playerEl0.classList.remove('player--active');
//   playerEl1.classList.add('player--active');
//   active = playerEl1;
// };
// const switch10 = function () {
//   playerEl1.classList.remove('player--active');
//   playerEl0.classList.add('player--active');
//   active = playerEl0;
// };

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // add dice current score
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
      // if (active === 'playerEl0' ? switch01() : switch10()) console.log(active);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current to active player's score
    scores[active] += currentScore;
    //score[1]+=currentscore;
    document.getElementById(`score--${active}`).textContent = scores[active];
    //   2. Check if player's score >=20
    if (scores[active] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// there wasn't any mistake just the code wasn't dry and to make it dry init() was made.

// btnNew.addEventListener('click', function () {
//   scores[0] = 0;
//   scores[1] = 0;
//   currentScore = 0;
//   scoreEl0.textContent = 0;
//   scoreEl1.textContent = 0;
//   currentEl0.textContent = 0;
//   currentEl1.textContent = 0;
//   playerEl0.classList.add('player--active');
//   playerEl1.classList.remove('player--active');
//   active = 0;
//   if (!playing) {
//     playing = true;
//     playerEl0.classList.remove('player--winner');
//     playerEl1.classList.remove('player-winner');
//     // active = playerEl0.classList.contains('player--winner') ? 0 : 1;

//     // if (active === 0 || active === 1) {
//     //   document
//     //     .querySelector(`.player--${active}`)
//     //     .classList.remove('player--winner');
//     // }
//   }
//   diceEl.classList.add('hidden');
// });
