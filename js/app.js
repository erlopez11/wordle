
/*-------------- Constants -------------*/
const MAX_GUESSES = 6;

const PLAYER_WORDS = [
    { word: null },
    { word: null },
    { word: null },
    { word: null },
    { word: null },
    { word: null },
]

/*---------- Variables (state) ---------*/

let wordleWord;
let playerGuessesRemain;
let playerGuess;
let win;
let board;


/*----- Cached Element References  -----*/


/*----------- Event Listeners ----------*/

document.getElementById('keyboard').addEventListener('click', (event) => {

    if (event.target.classList.contains('letterKey')) {
        addLetters(event.target.textContent);
        console.log(playerGuess);
    }

    if (event.target.classList.contains('delete')) {

    }

    if (event.target.classList.contains('submit')) {

    }
})


/*-------------- Functions -------------*/

function initialize() {
    board = [
        null,
        null,
        null,
        null,
        null,
        null
    ]
    getWordleWord()
    win = false;
    playerGuessesRemain = 6;
    playerGuess = '';
}

function getWordleWord() {
    let randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    wordleWord = WORD_LIST[randomIndex];
}

function addLetters(letter) {
    if (playerGuess.length !== 5) {
        if (playerGuess === '') {
            playerGuess += letter;
        } else if (playerGuess !== '' && playerGuess.length < 5) {
            playerGuess += letter;
        }
    }
}

function deleteLetter() {
    //playerGuess.slice(0, -1);
}

function render() {

}

initialize()
console.log(playerGuess);




