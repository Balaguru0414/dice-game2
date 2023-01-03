'use strict';

// >>>>>>>>>>>>>>>>>>>>>> | Selecting Elements | >>>>>>>>>>>>>>>>>>>>>>  

// players
	const player0El = document.querySelector('.player--0');
	const player1El = document.querySelector('.player--1');

// scores
	const score0El = document.querySelector('#score--0');
	const score1El = document.querySelector('#score--1');

// current Score
	const current0El = document.querySelector('#current--0');
	const current1El = document.querySelector('#current--1');

// image
	const diceEl = document.querySelector('.dice');

// buttons
	const btnNew = document.querySelector('.btn--new');
	const btnRoll = document.querySelector('.btn--roll');
	const btnHold = document.querySelector('.btn--hold');

// %%%%%%%%%%%%%%%%%%%%%%%%%% | Functions | %%%%%%%%%%%%%%%%%%%%%%%%%% 

// >>>>>>>>>>>>>>>>>>>>>> | ( Starting conditions ) and ( New Game ) | >>>>>>>>>>>>>>>>>>>>>> 

 let scores, currentScore, activePlayer, playing;	

	let init = function () {
		scores = [0,0];	
		currentScore = 0;
		activePlayer = 0;
		playing = true;

		diceEl.classList.add('hidden');
		
		score0El.textContent = 0;
		score1El.textContent = 0;
		current0El.textContent = 0;
		current1El.textContent = 0;

		player0El.classList.remove('player--winner');
		player1El.classList.remove('player--winner');

		player0El.classList.add('player--active');
		player1El.classList.remove('player--active');

	};

	init();

//----------- Switch Player -----------

	const switchPlayer = function () {
		document.querySelector(`#current--${activePlayer}`).textContent = 0;
		currentScore = 0;			
		activePlayer = activePlayer === 0 ? 1 : 0;			

		player0El.classList.toggle('player--active');
		player1El.classList.toggle('player--active');
	};

// >>>>>>>>>>>>>>>>>>>>>> | Rolling Dice Functionality | >>>>>>>>>>>>>>>>>>>>>> 

	const rollDice = function () {

	if (playing) {

	// 1. generating random dice roll

		const dice = Math.trunc(Math.random() * 6) + 1;

	console.log(dice);

	// 2. display the dice roll

		diceEl.classList.remove('hidden');
		diceEl.src = `images/dice-${dice}.png`

	// 3. if dice roll is -  1 -  switch to next player

		if (dice !== 1) {
			// add dice current Score

			currentScore += dice;
			document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
			
		} else {
			// switch to next player
			switchPlayer();
		}
	}
};

// >>>>>>>>>>>>>>>>>>>>>> | Hold button functionality | >>>>>>>>>>>>>>>>>>>>>> 

	const holdBtn = function () {

	if (playing) {

	// 1. add current score to active player score

		scores[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

	// 2. check if player score >= 100

		if (scores[activePlayer] >= 100) {
			// finish game
				playing = false;
				document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

				document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); 
				
				diceEl.classList.add('hidden');
		} else {
			// switch the next player
				switchPlayer();
		}
	}
};

// >>>>>>>>>>>>>>>>>>>>>> | click event | >>>>>>>>>>>>>>>>>>>>>> 

btnRoll.addEventListener('click',rollDice);

btnHold.addEventListener('click',holdBtn); 

btnNew.addEventListener('click',init);

/*// >>>>>>>>>>>>>>>>>>>>>> | key event | >>>>>>>>>>>>>>>>>>>>>> 

document.addEventListener('keydown',function (e) {

// New game

	if (e.key === 'Enter') {
		init();
	}
// Roll Dice

	else if (e.key === ' ') {
		rollDice();
	}
// Hold scores

	else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
		holdBtn();
	}
	
});*/

/***********************************************************| My Code |***************************************************************

let leftScore = Number(document.querySelector('#score--0').textContent);
let rightScore = Number(document.querySelector('#score--1').textContent );

console.log(leftScore,typeof leftScore);
console.log(rightScore, typeof rightScore);

// >>>>>>>>>>>>>>>>>>>>>> | New Game | >>>>>>>>>>>>>>>>>>>>>>  

const newGame = function () {
	document.querySelector('#score--0').textContent = 0;
	document.querySelector('#score--1').textContent = 0;
	document.querySelector('#current--0').textContent = 0;
	document.querySelector('#current--1').textContent = 0;
	// document.querySelector('.dice').classList.add('hidden');
}

// >>>>>>>>>>>>>>>>>>>>>> | Roll Dice | >>>>>>>>>>>>>>>>>>>>>>

const rollDice = function () {
	let randomNumber = Math.trunc(Math.random() * 6) +1;
	// console.log(randomNumber);

	// document.querySelector('.dice').classList.remove('hidden');

	let  roll = `images/dice-${randomNumber}.png`;
	// console.log(roll);
	document.querySelector('.dice').setAttribute('src',roll);

	// left player

	if (document.querySelector('.player--0').classList.contains('player--active')) {
		if (randomNumber === 1) {			
			document.querySelector('.player--0').classList.remove('player--active');
			document.querySelector('.player--1').classList.add('player--active');
			document.querySelector('#current--0').textContent = 0;
			document.querySelector('#score--0').textContent = 0;
		} else {			
			randomNumber += Number(document.querySelector('#current--0').textContent);
			document.querySelector('#current--0').textContent = randomNumber;	
		}		
	} 

	// right Player

	else {
		if (randomNumber === 1) {			
			document.querySelector('.player--1').classList.remove('player--active');
			document.querySelector('.player--0').classList.add('player--active');
			document.querySelector('#current--1').textContent = 0;
			document.querySelector('#score--1').textContent = 0;
		} else {
			randomNumber += Number(document.querySelector('#current--1').textContent);
			document.querySelector('#current--1').textContent = randomNumber;		
		}
	}
}

// >>>>>>>>>>>>>>>>>>>>>> | Hold Button | >>>>>>>>>>>>>>>>>>>>>>

const hold = function () {

	if (document.querySelector('.player--0').classList.contains('player--active')) {
		document.querySelector('.player--0').classList.remove('player--active');
		document.querySelector('.player--1').classList.add('player--active');
		// console.log(leftScore);		

		let leftCurrentScore = Number(document.querySelector('#current--0').textContent);

		leftScore += leftCurrentScore;
		leftTotal = leftScore;
		document.querySelector('#score--0').textContent = leftTotal;
	
		document.querySelector('#current--0').textContent = 0;
	
		
				
	} 
	else {
		document.querySelector('.player--1').classList.remove('player--active');
		document.querySelector('.player--0').classList.add('player--active');

		let rightCurrentScore = Number(document.querySelector('#current--1').textContent);

		rightScore += rightCurrentScore;
		rightTotal = rightScore;
		document.querySelector('#score--1').textContent = rightTotal;

		document.querySelector('#current--1').textContent = 0;
	}	
}

// >>>>>>>>>>>>>>>>>>>>>> | click funcion | >>>>>>>>>>>>>>>>>>>>>>  

document.querySelector('.btn--new').addEventListener('click',newGame);

document.querySelector('.btn--hold').addEventListener('click',hold);

document.querySelector('.btn--roll').addEventListener('click',rollDice);
*/