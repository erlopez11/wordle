
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

const rowOneTilesEl = document.querySelectorAll('.rowOneTile');
const rowTwoTilesEl = document.querySelectorAll('.rowTwoTile');
const rowThreeTilesEl = document.querySelectorAll('.rowThreeTile');
const rowFourTilesEl = document.querySelectorAll('.rowFourTile');
const rowFiveTilesEl = document.querySelectorAll('.rowFiveTile');
const rowSixTilesEl = document.querySelectorAll('.rowSixTile');

const rowOneFlipTileEl = document.querySelectorAll('.rowOneFlipTile');
const rowTwoFlipTileEl = document.querySelectorAll('.rowTwoFlipTile');
const rowThreeFlipTileEl = document.querySelectorAll('.rowThreeFlipTile');
const rowFourFlipTileEl = document.querySelectorAll('.rowFourFlipTile');
const rowFiveFlipTileEl = document.querySelectorAll('.rowFiveFlipTile');
const rowSixFlipTileEl = document.querySelectorAll('.rowSixFlipTile');

const rowOneBackTilesEl = document.querySelectorAll('.rowOneBack');
const rowTwoBackTilesEl = document.querySelectorAll('.rowTwoBack');
const rowThreeBackTilesEl = document.querySelectorAll('.rowThreeBack');
const rowFourBackTilesEl = document.querySelectorAll('.rowFourBack');
const rowFiveBackTilesEl = document.querySelectorAll('.rowFiveBack');
const rowSixBackTilesEl = document.querySelectorAll('.rowSixBack');

const keysElement = document.querySelectorAll('.letterKey');

const overlayElement = document.getElementById('overlay');
const instructionsOverlayElement = document.getElementById('instructionsOverlay');
const outcomeElement = document.getElementById('outcome');
const messageElement = document.getElementById('message');
const instructionsCloseEl = document.getElementById('instructionsClose');
const finalMessageCloseEl = document.getElementById('close');

const cardEl = document.querySelectorAll('.card-inner');
const tileFrontEl = document.querySelectorAll('.tileFront');
const tileBackEl = document.querySelectorAll('.tileBack');


/*----------- Event Listeners ----------*/

document.getElementById('keyboard').addEventListener('click', (event) => {

    if (event.target.classList.contains('letterKey')) {
        addLetters(event.target.textContent);
        renderLetter();

    }

    if (event.target.classList.contains('delete')) {
        deleteLetters();
    }

    if (event.target.classList.contains('submit')) {
        handle()
    }
})

finalMessageCloseEl.addEventListener('click', function () {
    overlayElement.style.display = 'none';
    resetGame();
});

document.getElementById('playBtn').addEventListener('click', () => {
    resetGame();
})

document.getElementById('instructionsBtn').addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'flex';
})

instructionsCloseEl.addEventListener('click', function () {
    instructionsOverlayElement.style.display = 'none';
});

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

function deleteLetters() {
    board[playerGuesses].pop();
    let deleteLetterGuess = playerGuess.slice(0, -1);
    playerGuess = deleteLetterGuess;

    if (letterTotal === 0) {
        return;
    } else {
        switch (playerGuesses) {
            case 0:
                rowOneTilesEl[letterTotal - 1].textContent = '';
                rowOneBackTilesEl[letterTotal - 1].textContent = '';
                break;
            case 1:
                rowTwoTilesEl[letterTotal - 1].textContent = '';
                rowTwoBackTilesEl[letterTotal - 1].textContent = '';
                break;
            case 2:
                rowThreeTilesEl[letterTotal - 1].textContent = '';
                rowThreeBackTilesEl[letterTotal - 1].textContent = '';
                break;
            case 3:
                rowFourTilesEl[letterTotal - 1].textContent = '';
                rowFourBackTilesEl[letterTotal - 1].textContent = '';
                break;
            case 4:
                rowFiveTilesEl[letterTotal - 1].textContent = '';
                rowFiveBackTilesEl[letterTotal - 1].textContent = '';
                break;
            case 5:
                rowSixTilesEl[letterTotal - 1].textContent = '';
                rowSixBackTilesEl[letterTotal - 1].textContent = '';
                break;

        }

        letterTotal -= 1;
    }
}

function updatePlayerWords() {
    PLAYER_WORDS.forEach((row, index) => {
        if (index === playerGuesses) {
            row.guess = playerGuess.toLowerCase();
        }
    })
}


function compareWords() {
    let idx = playerGuesses;


    if (wordleWord === PLAYER_WORDS[idx].guess) {
        win = true;
    }

    for (let i = 0; i < 5; i++) {
        let letterIdx = wordleWord.indexOf(PLAYER_WORDS[idx].guess[i]);

        if (letterIdx === -1) {

            switch (playerGuesses) {
                case 0:
                    rowOneBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 1:
                    rowTwoBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 2:
                    rowThreeBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 3:
                    rowFourBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 4:
                    rowFiveBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 5:
                    rowSixBackTilesEl[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
            }

        } else {
            if (wordleWord[i] === PLAYER_WORDS[idx].guess[i]) {

                switch (playerGuesses) {
                    case 0:
                        rowOneBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 1:
                        rowTwoBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 2:
                        rowThreeBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 3:
                        rowFourBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 4:
                        rowFiveBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 5:
                        rowSixBackTilesEl[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                }

            } else {

                switch (playerGuesses) {
                    case 0:
                        rowOneBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 1:
                        rowTwoBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 2:
                        rowThreeBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 3:
                        rowFourBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 4:
                        rowFiveBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 5:
                        rowSixBackTilesEl[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                }
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
            rowOneTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowOneBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 1:
            rowTwoTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowTwoBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 2:
            rowThreeTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowThreeBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 3:
            rowFourTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowFourBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 4:
            rowFiveTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowFiveBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 5:
            rowSixTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowSixBackTilesEl[letterTotal].textContent = board[playerGuesses][letterTotal];
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
        setTimeout(function () {
            overlayElement.style.display = 'flex';
            outcomeElement.textContent = 'You Won! 🐋';
            messageElement.textContent = `Guesses Made: ${playerGuesses}`;
        }, 1000);

    } else if (win === false) {
        setTimeout(function () {
            overlayElement.style.display = 'flex';
            outcomeElement.textContent = 'You Lost 🦐';
            messageElement.textContent = `Wordle Word: ${wordleWord}`;
        }, 1000);
    }
}

function renderReset() {
    keysElement.forEach((key) => {
        key.style.backgroundColor = '#f7f4ed';
    });
    cardEl.forEach((tile) => {
        tile.style.backgroundColor = 'rgba(205, 220, 223, .5)';
        tile.classList.remove('isFlipped');
    });
    tileFrontEl.forEach((tile) => {
        tile.textContent = '';
    });
    tileBackEl.forEach((tile) => {
        tile.textContent = '';
    })
}

function resetGame() {
    overlayElement.style.display = "none";
    renderReset();
    initialize();
}

function flipTiles() {

    switch (playerGuesses) {
        case 0:
            for (let i = 0; i < 5; i++) {
                rowOneFlipTileEl[i].classList.add('isFlipped');
            }
            break;
        case 1:
            for (let i = 0; i < 5; i++) {
                rowTwoFlipTileEl[i].classList.add('isFlipped');
            }
            break;
        case 2:
            for (let i = 0; i < 5; i++) {
                rowThreeFlipTileEl[i].classList.add('isFlipped');
            }
            break;
        case 3:
            for (let i = 0; i < 5; i++) {
                rowFourFlipTileEl[i].classList.add('isFlipped');
            }
            break;
        case 4:
            for (let i = 0; i < 5; i++) {
                rowFiveFlipTileEl[i].classList.add('isFlipped');
            }
            break;
        case 5:
            for (let i = 0; i < 5; i++) {
                rowSixFlipTileEl[i].classList.add('isFlipped');
            }
            break;

    }
}

function renderAlertLetters() {
    document.getElementById('alertMessageLetters').style.display = 'flex';
    setTimeout(function () {
        document.getElementById('alertMessageLetters').style.display = 'none';
    }, 1000);

}

function renderWordInvalid() {
    document.getElementById('alertWordInvalid').style.display = 'flex';
    setTimeout(function () {
        document.getElementById('alertWordInvalid').style.display = 'none';
    }, 1000);

}

function handle() {
    if (letterTotal < 5) {
        renderAlertLetters();
        return;
    }

    if (WORD_LIST.indexOf(playerGuess.toLowerCase()) === -1) {
        renderWordInvalid();
        return;
    }

    flipTiles();
    updatePlayerWords();
    compareWords();
    renderKeyboradColor();
    moveToNextRow();
    renderMessages();
}

initialize()



