const key = 'tic-tac-toe-game-state'
let currentPlayerSymbol = 'x';

let board = ['', '', '',
                    '', '', '',
                    '', '', '',];

let gameStatus = '';

const board = document.getElementById('tic-tac-toe-board')
const giveUp = document.getElementById('give-up');
const newGame = document.getElementById('new-game');

const saveState = () => {
    const state = {
        currentPlayerSymbol,
        squareValues: board,
        gameState: gameStatus
    }
    window.localStorage.setItem(key, JSON.stringify(state))
}

const loadState = () => {
    let load = JSON.parse(window.localStorage.getItem(key))

    if (window.localStorage.getItem(key) === null) return

    currentPlayerSymbol = load.currentPlayerSymbol;
    board = load.squareValues;
    gameStatus = load.gameState

    for (let i = 0; i < 9; i++) {
        if (board[i] !== '') {
            const img = document.createElement('img');
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${board[i]}.svg`;
            document
                .getElementById(`square-${i}`)
                .appendChild(img);
        }
    }

    if (gameStatus !== '') {
        document
            .getElementById('game-status')
            .innerText = `Winner: ${gameStatus.toUpperCase()}!`;
        newGame.disabled = false
        giveUp.disabled = true
    } else {
        document
            .getElementById('game-status')
            .innerText = '';
            newGame.disabled = true
            giveUp.disabled = false
    }
}

// enable the new game button



// give up button functionality

giveUp.addEventListener('click', event => {
    if (currentPlayerSymbol === 'x') gameStatus = 'o'
    else gameStatus = 'x';
    document
        .getElementById('game-status')
        .innerText = `Winner: ${gameStatus.toUpperCase()}!`
    newGame.disabled = false
    giveUp.disabled = true
    saveState()
})

// new game button functionality
newGame.addEventListener('click', event => {
    gameStatus = '';
    document
        .getElementById('game-status')
        .innerText = '';
    for (let i = 0; i < board.children.length; i++) {
        board.children[i].innerHTML = ''
    }
    board = ['', '', '', '', '', '', '', '', '']
    currentPlayerSymbol = 'x';
    newGame.disabled = true
    giveUp.disabled = false
    saveState()
})

window.addEventListener('DOMContentLoaded', () => {

    loadState()

    const status = document.getElementById('game-status');
    const checkGameState = () => {
        // check rows
        for (let i = 0; i < 9; i += 3) {
            if (board[i] !== ''
            && board[i] === board[i + 1]
            && board[i] === board[i + 2]) {
                gameStatus = board[i];
                break;
            }
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] !== ''
            && board[i] === board[i + 3]
            && board[i] === board[i + 6]) {
                gameStatus = board[i];
                break;
            }
        }
        // check right diagonal

        if (board[0] !== ''
            && board[0] === board[4]
            && board[0] === board[8]) {
            gameStatus = board[0];

        }

        // check left diagonal

        if (board[0] !== ''
            && board[2] === board[4]
            && board[2] === board[6]) {
            gameStatus = board[2];

        }


        // tie game
        if (!board.includes('') && gameStatus === '') {
            gameStatus = 'None'

        }
        // declare a winner
        if (gameStatus !== '') {
            document
                .getElementById('game-status')
                .innerText = `Winner: ${gameStatus.toUpperCase()}!`;
            newGame.disabled = false
            giveUp.disabled = true

        }



    }

    document
        .getElementById('tic-tac-toe-board')
        .addEventListener('click', event => {


            if (gameStatus !== '') {
                return
            }
            const img = document.createElement('img');
            img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${currentPlayerSymbol}.svg`;

            if (!event.target.id.startsWith('square-')) return

            const squareIndex = Number.parseInt(event.target.id[event.target.id.length - 1]);
            if (board[squareIndex] !== '') return;

            event.target.appendChild(img);
            board[squareIndex] = currentPlayerSymbol;

            if (currentPlayerSymbol === 'x') {
                currentPlayerSymbol = 'o'
            } else currentPlayerSymbol = 'x'


            checkGameState()
            saveState()
        })

})