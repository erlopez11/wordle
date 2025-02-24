
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
const tiles = document.querySelectorAll('.tile')

/*----------- Event Listeners ----------*/

document.getElementById('keyboard').addEventListener('click', (event) => {

    if (event.target.classList.contains('letterKey')) {
        addLetters(event.target.textContent);
        renderLetter();

    }

    if (event.target.classList.contains('delete')) {

    }

    if (event.target.classList.contains('submit')) {
        handle()
    }
})


/*-------------- Functions -------------*/

function initialize() {
    board = [
        [],
        [],
        [],
        [],
        [],
        []
    ]
    getWordleWord()
    win = false;
    playerGuesses = 0;
    playerGuess = '';
    console.log(wordleWord);
}

function getWordleWord() {
    let randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    wordleWord = WORD_LIST[randomIndex];
}


function addLetters(letter) {
    if (playerGuess.length !== 5) {
        if (playerGuess === '') {
            playerGuess += letter;
            board[playerGuesses].push(letter);
        } else if (playerGuess !== '' && playerGuess.length < 5) {
            playerGuess += letter;
            board[playerGuesses].push(letter);
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
    let idx = playerGuesses;

    if (wordleWord === playerGuess.toLowerCase()) {
        win = true;
        console.log("You win!")
    }

    for (let i = 0; i < PLAYER_WORDS[idx].guess.length; i++) {
        if (wordleWord[i] === PLAYER_WORDS[idx].guess.charAt(i)) {

            console.log('correct word, correct position', PLAYER_WORDS[idx].guess.charAt(i));
        } else if (wordleWord[i].includes(PLAYER_WORDS[idx].guess[i])) {
            console.log('correct letter wrong position', PLAYER_WORDS[idx].guess.charAt(i))

        } else {
            console.log('incorrect letter', PLAYER_WORDS[idx].guess.charAt(i));
        }
    }
}

function moveToNextRow() {
    console.log(playerGuesses);
    if (playerGuesses === 5) {
        console.log('End of the Game');
    }

    playerGuesses += 1;
    playerGuess = '';
}

function renderLetter() {
    board.forEach((word, index) => {
        if (index === playerGuesses) {
            word.forEach((letter, index) => {
                tiles[index].textContent = letter;
            })
        }
    })
}

function render() {
}

function handle() {
    updatePlayerWords();
    console.log(PLAYER_WORDS)
    console.log(playerGuess);
    //validateWord();  not acepting all words b/c player words have ''
    compareWords();
    moveToNextRow();
    render();

}

initialize()




