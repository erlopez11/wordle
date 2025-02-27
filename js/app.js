
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

const rowOneTiles = document.querySelectorAll('.rowOneTile');
const rowTwoTiles = document.querySelectorAll('.rowTwoTile');
const rowThreeTiles = document.querySelectorAll('.rowThreeTile');
const rowFourTiles = document.querySelectorAll('.rowFourTile');
const rowFiveTiles = document.querySelectorAll('.rowFiveTile');
const rowSixTiles = document.querySelectorAll('.rowSixTile');

const rowOneFlipTile = document.querySelectorAll('.rowOneFlipTile');
const rowTwoFlipTile = document.querySelectorAll('.rowTwoFlipTile');
const rowThreeFlipTile = document.querySelectorAll('.rowThreeFlipTile');
const rowFourFlipTile = document.querySelectorAll('.rowFourFlipTile');
const rowFiveFlipTile = document.querySelectorAll('.rowFiveFlipTile');
const rowSixFlipTile = document.querySelectorAll('.rowSixFlipTile');

const rowOneBackTiles = document.querySelectorAll('.rowOneBack');
const rowTwoBackTiles = document.querySelectorAll('.rowTwoBack');
const rowThreeBackTiles = document.querySelectorAll('.rowThreeBack');
const rowFourBackTiles = document.querySelectorAll('.rowFourBack');
const rowFiveBackTiles = document.querySelectorAll('.rowFiveBack');
const rowSixBackTiles = document.querySelectorAll('.rowSixBack');

const keysElement = document.querySelectorAll('.letterKey');

const overlayElement = document.getElementById('overlay');
const instructionsOverlayElement = document.getElementById('instructionsOverlay');
const outcomeElement = document.getElementById('outcome');
const messageElement = document.getElementById('message');

const card = document.querySelectorAll('.card-inner');
const tileFront = document.querySelectorAll('.tileFront');
const tileBack = document.querySelectorAll('.tileBack');


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

document.getElementById('close').addEventListener('click', function () {
    overlayElement.style.display = 'none';
    resetGame();
});

document.getElementById('playBtn').addEventListener('click', () => {
    resetGame();
})

document.getElementById('instructionsBtn').addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'flex';
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

function deleteLetters() {
    board[playerGuesses].pop();
    let deleteLetterGuess = playerGuess.slice(0, -1);
    playerGuess = deleteLetterGuess;

    if (letterTotal === 0) {
        return;
    } else {
        switch (playerGuesses) {
            case 0:
                rowOneTiles[letterTotal - 1].textContent = '';
                rowOneBackTiles[letterTotal - 1].textContent = '';
                break;
            case 1:
                rowTwoTiles[letterTotal - 1].textContent = '';
                rowTwoBackTiles[letterTotal - 1].textContent = '';
                break;
            case 2:
                rowThreeTiles[letterTotal - 1].textContent = '';
                rowThreeBackTiles[letterTotal - 1].textContent = '';
                break;
            case 3:
                rowFourTiles[letterTotal - 1].textContent = '';
                rowFourBackTiles[letterTotal - 1].textContent = '';
                break;
            case 4:
                rowFiveTiles[letterTotal - 1].textContent = '';
                rowFiveBackTiles[letterTotal - 1].textContent = '';
                break;
            case 5:
                rowSixTiles[letterTotal - 1].textContent = '';
                rowSixBackTiles[letterTotal - 1].textContent = '';
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

/* function validateWord() {
    if (WORD_LIST.indexOf(playerGuess) === -1) {
        renderWordInvalid();
        return;
    }
} */

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
                    rowOneBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 1:
                    rowTwoBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 2:
                    rowThreeBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 3:
                    rowFourBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 4:
                    rowFiveBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
                case 5:
                    rowSixBackTiles[i].style.backgroundColor = '#354f5b';
                    tileColor.push('grey');
                    break;
            }

        } else {
            if (wordleWord[i] === PLAYER_WORDS[idx].guess[i]) {

                switch (playerGuesses) {
                    case 0:
                        rowOneBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 1:
                        rowTwoBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 2:
                        rowThreeBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 3:
                        rowFourBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 4:
                        rowFiveBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                    case 5:
                        rowSixBackTiles[i].style.backgroundColor = '#6cbd93';
                        tileColor.push('green');
                        break;
                }

            } else {

                switch (playerGuesses) {
                    case 0:
                        rowOneBackTiles[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 1:
                        rowTwoBackTiles[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 2:
                        rowThreeBackTiles[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 3:
                        rowFourBackTiles[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 4:
                        rowFiveBackTiles[i].style.backgroundColor = '#f2c35e';
                        tileColor.push('yellow');
                        break;
                    case 5:
                        rowSixBackTiles[i].style.backgroundColor = '#f2c35e';
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
            rowOneTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowOneBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 1:
            rowTwoTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowTwoBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 2:
            rowThreeTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowThreeBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 3:
            rowFourTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowFourBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 4:
            rowFiveTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowFiveBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            break;
        case 5:
            rowSixTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
            rowSixBackTiles[letterTotal].textContent = board[playerGuesses][letterTotal];
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
    card.forEach((tile) => {
        tile.style.backgroundColor = 'transparent';
        tile.classList.remove('isFlipped');
    }); 
    tileFront.forEach((tile) => {
        tile.textContent = '';
    });
    tileBack.forEach((tile) => {
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
                rowOneFlipTile[i].classList.add('isFlipped');
            }
            break;
        case 1:
            for (let i = 0; i < 5; i++) {
                rowTwoFlipTile[i].classList.add('isFlipped');
            }
            break;
        case 2:
            for (let i = 0; i < 5; i++) {
                rowThreeFlipTile[i].classList.add('isFlipped');
            }
            break;
        case 3:
            for (let i = 0; i < 5; i++) {
                rowFourFlipTile[i].classList.add('isFlipped');
            }
            break;
        case 4:
            for (let i = 0; i < 5; i++) {
                rowFiveFlipTile[i].classList.add('isFlipped');
            }
            break;
        case 5:
            for (let i = 0; i < 5; i++) {
                rowSixFlipTile[i].classList.add('isFlipped');
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



