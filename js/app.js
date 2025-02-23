
/*-------------- Constants -------------*/
const MAX_GUESSES = 6;

const PLAYER_WORDS = [
    { guess: null },
    { guess: null },
    { guess: null },
    { guess: null },
    { guess: null },
    { guess: null },
]

/*---------- Variables (state) ---------*/

let wordleWord;
let playerGuesses;
let playerGuess;
let win;
let board;


/*----- Cached Element References  -----*/


/*----------- Event Listeners ----------*/

document.getElementById('keyboard').addEventListener('click', (event) => {

    if (event.target.classList.contains('letterKey')) {
        addLetters(event.target.textContent);

    }

    if (event.target.classList.contains('delete')) {

    }

    if (event.target.classList.contains('submit')) {
        handleMove()
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
    playerGuesses = 0;
    playerGuess = '';
    console.log(wordleWord);
    console.log(typeof wordleWord);
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

function updatePlayerWords() {
    PLAYER_WORDS.forEach((row, index) => {
        if (index === playerGuesses) {
            row.guess = playerGuess.toLowerCase();
        }
    })
}

function validateWord() {
    if (!WORD_LIST.includes(playerGuess)) {
        console.log('word not included');
        return;
    }
}

function compareWords() {

    if (wordleWord === playerGuess.toLowerCase()) {
        win = true;
        console.log("You win!")
    } else {
    }
}

function render() {

}

function handleMove() {
    updatePlayerWords();
    console.log(PLAYER_WORDS)
    console.log(playerGuess);
    //validateWord();  not acepting all words b/c player words have ''
    compareWords()

}

initialize()





