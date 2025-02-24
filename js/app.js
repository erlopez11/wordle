
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
let letterTotal;
let wordleWord;
let playerGuesses;
let playerGuess;
let win;
let board;



/*----- Cached Element References  -----*/
const tiles = document.querySelectorAll('.tile');
const rowOneTiles = document.querySelectorAll('.rowOneTile');
const rowTwoTiles = document.querySelectorAll('.rowTwoTile');
const rowThreeTiles = document.querySelectorAll('.rowThreeTile');
const rowFourTiles = document.querySelectorAll('.rowFourTile');
const rowFiveTiles = document.querySelectorAll('.rowFiveTile');
const rowSixTiles = document.querySelectorAll('.rowSixTile');
const tileContainer = document.querySelectorAll('.container');

/*----------- Event Listeners ----------*/

document.getElementById('keyboard').addEventListener('click', (event) => {

    if (event.target.classList.contains('letterKey')) {
        addLetters(event.target.textContent);
        renderLetter();
        console.log(board[playerGuesses][playerGuesses]);

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
    letterTotal = 0
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
        console.log(PLAYER_WORDS[idx].guess[i]);

        if (PLAYER_WORDS[idx].guess[i].includes(wordleWord[i]) === false) {
            console.log('working...')
            tileContainer[idx].children[i].style.backgroundColor = "#354f5b";
        }
    
        if (wordleWord[i].includes(PLAYER_WORDS[idx].guess[i]) && wordleWord[i] === PLAYER_WORDS[idx].guess[i]) {
            tileContainer[idx].children[i].style.backgroundColor = "#6cbd93";
        } else {
            tileContainer[idx].children[i].style.backgroundColor = "#f2c35e";
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
    letterTotal = 0;
}

function renderLetter() {
    if (letterTotal === 5) {
        return;
    }

    switch (playerGuesses) {
        case 0:
            rowOneTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 1:
            rowTwoTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 2:
            rowThreeTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 3:
            rowFourTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 4:
            rowFiveTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 5:
            rowSixTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
    }

    letterTotal += 1;
}

/* function renderTileColorChange() {
    let tile = tileContainer[playerGuesses].children[letterTotal];
    
    if (tileColor === 'green') {
        tile.style.backgroundColor = "#6cbd93";
    }
} */

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




