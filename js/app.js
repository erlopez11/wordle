
/*-------------- Constants -------------*/

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
let tileColor;
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
const keysElement = document.querySelectorAll('.letterKey');

const overlayElement = document.getElementById('overlay');
const outcomeElement = document.getElementById('outcome');
const messageElement = document.getElementById('message');

const card = document.querySelectorAll('.card-inner');
const tileBack = document.querySelectorAll('.tileBack');
const cardBack = document.querySelectorAll('.card-Back')


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

document.getElementById('close').addEventListener('click', function () {
    overlayElement.style.display = 'none';
});

document.getElementById('playBtn').addEventListener('click', () => {
    overlayElement.style.display = "none";
    renderReset();
    initialize();
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
    win = null;
    letterTotal = 0;
    playerGuesses = 0;
    playerGuess = '';
    tileColor = [];
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
    }

    for (let i = 0; i < 5; i++) {
        let letterIdx = wordleWord.indexOf(PLAYER_WORDS[idx].guess[i]);
        console.log(card[idx]);
        if (letterIdx === -1) {
            tileContainer[idx].children[i].style.backgroundColor = "#354f5b";
            tileColor.push('grey');

        } else {
            if (wordleWord[i] === PLAYER_WORDS[idx].guess[i]) {
                tileContainer[idx].children[i].style.backgroundColor = "#6cbd93";
                tileColor.push('green')

            } else {
                tileContainer[idx].children[i].style.backgroundColor = "#f2c35e";
                tileColor.push('yellow')
            }
        }
    }


}

function moveToNextRow() {
    if (playerGuesses === 5) {
        win = false;
    }

    playerGuesses += 1;
    playerGuess = '';
    letterTotal = 0;
    tileColor = [];
}

function renderLetter() {
    if (letterTotal === 5) {
        return;
    }

    switch (playerGuesses) {
        case 0:
            rowOneTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            tileBack[letterTotal].textContent = board[playerGuesses][letterTotal];
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

function renderKeyboradColor() {

    keysElement.forEach((key) => {
        for (let i = 0; i < PLAYER_WORDS[playerGuesses].guess.length; i++) {
            if (PLAYER_WORDS[playerGuesses].guess[i] === key.textContent.toLowerCase()) {
                letterColor = PLAYER_WORDS[playerGuesses].guess.indexOf(PLAYER_WORDS[playerGuesses].guess[i]);

                if (tileColor[letterColor] === 'green') {
                    key.style.backgroundColor = '#6cbd93';
                } else if (tileColor[letterColor] === 'yellow') {
                    key.style.backgroundColor = '#f2c35e';
                } else if (tileColor[letterColor] === 'grey') {
                    key.style.backgroundColor = '#354f5b';
                } else {
                    key.style.backgroundColor = '#f7f4ed';
                }
            }
        }
    })

}

function renderMessages() {
    if (win === true) {
        overlayElement.style.display = 'flex';
        outcomeElement.textContent = 'You Won! 🐋';
        messageElement.textContent = `Guesses Made: ${playerGuesses}`;
    } else if (win === false) {
        overlayElement.style.display = 'flex';
        outcomeElement.textContent = 'You Lost 🦐';
        messageElement.textContent = `Wordle Word: ${wordleWord}`;
    }
}

function renderReset() {
    keysElement.forEach((key) => {
        key.style.backgroundColor = '#f7f4ed';
    })
    tiles.forEach((tile) => {
        tile.style.backgroundColor = 'transparent';
        tile.textContent = '';
    })
}

function flipTiles() {
    card.forEach((card) => {
        card.classList.toggle('isFlipped');
    })
   
}

function handle() {
    flipTiles();
    updatePlayerWords();

    if (PLAYER_WORDS[playerGuesses].guess.length < 5) {
        console.log('Not a five letter word')
        return;
    }
    //validateWord();  not acepting all words b/c player words have ''
    compareWords();
    renderKeyboradColor();
    moveToNextRow();
    renderMessages();
}

initialize()



