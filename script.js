'use strict';

let leftScore = document.querySelector('#current--0').textContent;
let rightScore = document.querySelector('#current--1').textContent;

console.log(leftScore);
console.log(rightScore);

// >>>>>>>>>>>>>>>>>>>>>> | New Game | >>>>>>>>>>>>>>>>>>>>>>  

const newGame = function () {
	document.querySelector('#score--0').textContent = '';
	document.querySelector('#score--1').textContent = '';
	document.querySelector('#current--0').textContent = 0;
	document.querySelector('#current--1').textContent = 0;
}

// >>>>>>>>>>>>>>>>>>>>>> | Roll Dice | >>>>>>>>>>>>>>>>>>>>>>

const rollDice = function () {
	let randomNumber = Math.trunc(Math.random() * 6) +1;
	// console.log(randomNumber);

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
		let leftCurrentScore = document.querySelector('#current--0').textContent;

		document.querySelector('#score--0').textContent = leftCurrentScore;	
	
		document.querySelector('#current--0').textContent = 0;
	
		
				
	} 
	else {
		document.querySelector('.player--1').classList.remove('player--active');
		document.querySelector('.player--0').classList.add('player--active');

		let rightCurrentScore = document.querySelector('#current--1').textContent;

		document.querySelector('#score--1').textContent = rightCurrentScore;

		document.querySelector('#current--1').textContent = 0;
	}	
}

// >>>>>>>>>>>>>>>>>>>>>> | click funcion | >>>>>>>>>>>>>>>>>>>>>>  

document.querySelector('.btn--new').addEventListener('click',newGame);

document.querySelector('.btn--hold').addEventListener('click',hold);

document.querySelector('.btn--roll').addEventListener('click',rollDice);




