// set three levels words
const hardArray = [
	'Acceptable',
	'Argument',
	'Calendar',
	'Argument',
	'Calendar',
	'Column',
	'Conscious',
	'Definitely',
	'Discipline',
	'Embarrass',
	'Exceed',
	'Fiery',
	'Height',
	'Humorous',
	'Jewellery',
	'Library',
	'License',
	'Maintenance',
	'Miniature',
	'Misspell',
	'Occasionally',
	'Possession',
	'Strengths',
	'Euouae',
	'Unimaginatively',
	'honorificabilitudinitatibus',
	'uncopyrightable',
	'subdermatoglyphic',
	'sesquipedalianism',
	'clean',
];

const normalArray = [
	'advanced',
	'advantage',
	'African',
	'agenda',
	'aircraft',
	'already',
	'amazing',
	'anniversary',
	'anticipate',
	'appointment',
	'basketball',
	'behavior',
	'birthday',
	'boundary',
	'capability',
	'championship',
	'conventional',
	'dangerous',
	'definitely',
	'economist',
	'emergency',
	'entertainment',
	'foundation',
	'friendship',
	'generation',
	'helicopter',
	'improvement',
	'intelligence',
	'judgment',
	'knowledge',
];
const easyArray = [
	'act',
	'active',
	'adopt',
	// 'and',
	// 'arm',
	// 'attach',
	// 'away',
	// 'baby',
	// 'bad',
	// 'ball',
	// 'best',
	// 'body',
	// 'car',
	// 'cash',
	// 'cat',
	// 'clear',
	// 'day',
	// 'deny',
	// 'desk',
	// 'die',
	// 'door',
	// 'ear',
	// 'eat',
	// 'elite',
	// 'end',
	// 'fail',
	// 'factory',
	// 'faculty',
	// 'fly',
	// 'gap',
];

const levels = {
	easy: [easyArray, 7],
	normal: [normalArray, 5],
	hard: [hardArray, 4],
};

// catch selectors
const levelSelect = document.getElementById('Levels');
const levelNameSpan = document.querySelector('.message .level');
const levelSecondsSpan = document.querySelector('.message .seconds');
const startButton = document.querySelector('.start-button');
const input = document.getElementById('input');
const theWord = document.querySelector('.the-word');
const timeLeftSpan = document.querySelector('.time span');
const upComingWords = document.querySelector('.upcoming-words');
const scoreSpan = document.querySelector('.score .got');
const scoreTotalSpan = document.querySelector('.score .total');
const message = document.querySelector('.finish');

let defaultLevel;

// set start button
startButton.onclick = function () {
	const chosenLevel = levelSelect.value;
	switch (chosenLevel) {
		case '1':
			defaultLevel = 'easy';
			break;
		case '2':
			defaultLevel = 'normal';
			break;
		case '3':
			defaultLevel = 'hard';
			break;
		default:
			defaultLevel = 'normal';
	}

	const defaultLevelSconds = levels[defaultLevel][1];

	// setting level name + seconds + score
	levelNameSpan.innerText = defaultLevel;
	timeLeftSpan.innerText = defaultLevelSconds;
	levelSecondsSpan.innerText = defaultLevelSconds;
	scoreTotalSpan.innerText = levels[defaultLevel][0].length;

	document.querySelector('.start').remove();
	input.focus();

	const firstArrayIndex = levels[defaultLevel][0].length;
	console.log(firstArrayIndex);

	// generate new word
	if (levels[defaultLevel][0].length > 0) {
		// set random word
		theWord.innerText = generateWord();
	}
};

// get random word
const generateWord = () => {
	const randomIndex = Math.floor(
		Math.random() * levels[defaultLevel][0].length
	);
	const randomWord = levels[defaultLevel][0][randomIndex];

	if (
		levels[defaultLevel][0].includes(randomWord) &&
		randomWord !== ''
	) {
		// remove word from array
		levels[defaultLevel][0].splice(randomIndex, 1);
		// empty upcoming words
		upComingWords.innerHTML = '';
		// generate new word for upcoming words
		for (let i = 0; i < levels[defaultLevel][0].length; i++) {
			const word = document.createTextNode(
				levels[defaultLevel][0][i]
			);
			const div = document.createElement('div');
			div.appendChild(word);
			upComingWords.appendChild(div);
		}
		console.log(levels[defaultLevel][0].length);
		// set time
		timer();
		//  remove upcoming div
		if (levels[defaultLevel][0].length === 0) {
			upComingWords.remove();
		}
		return randomWord;
	}
};

// set timer
function timer() {
	// reset time
	timeLeftSpan.innerHTML = levels[defaultLevel][1];
	const counter = setInterval(() => {
		timeLeftSpan.innerText--;
		if (timeLeftSpan.innerText === '0') {
			clearInterval(counter);
			// compare input with theWord
			if (
				input.value.toLowerCase() ===
				theWord.innerText.toLowerCase()
			) {
				if (levels[defaultLevel][0].length > 0) {
					// set random word
					theWord.innerText = generateWord();
				} else {
					// finish game
					const goodSpan = document.createElement('span');
					goodSpan.className = 'good';
					const spanText = document.createTextNode(
						`Good Work! Winner :-)`
					);
					goodSpan.appendChild(spanText);
					message.appendChild(goodSpan);
				}
				// reset input
				input.value = '';
				// increase score
				scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
			} else {
				// finish game
				const badSpan = document.createElement('span');
				badSpan.className = 'bad';
				const spanText = document.createTextNode('Game Over');
				badSpan.appendChild(spanText);
				message.appendChild(badSpan);
			}
		}
	}, 1000);
}

// disable paste event
input.onpaste = () => {
	return false;
};
