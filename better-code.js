document.addEventListener('DOMContentLoaded', event => {

    document
        .getElementById('tic-tac-toe-board')
        .addEventListener('click', event => {
            const targetID = event.target.id;
            if (!targetID.startsWith('square-')) return

            const index = Number.parseInt(targetID[targetID.length - 1])
            updateAndRender(index);
        })

    document
        .getElementById('new-game')
        .addEventListener('click', event => {
            updateAndRender(null, true)
        })

    document
        .getElementById('give-up')
        .addEventListener('click', event => {
            if (currentPlayerSymbol === 'x') gameStatus = 'o'
            else gameStatus = 'x'
            updateView()
        })

    function updateAndRender(index, isNewGame) {
        updateState(index, isNewGame);
        updateView();
    }

    let currentPlayerSymbol;
    let board;
    let gameStatus;

    function updateState(index, isNewGame) {

        if (isNewGame) {
            currentPlayerSymbol = 'x';
            board = ['', '', '', '', '', '', '', '', ''];
            gameStatus = '';
            return;
        }
        if (gameStatus !== '') return;

        board[index] = currentPlayerSymbol;

        if (currentPlayerSymbol === 'x') {
            currentPlayerSymbol = 'o'
        } else currentPlayerSymbol = 'x'

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
        if (gameStatus === '') {
            let gridIsAllFilled = true;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    gridIsAllFilled = false;
                    break;
                }
            }
            if (gridIsAllFilled) gameStatus = 'None'
        }



    }

    function updateView() {
        for (let i = 0; i < 9; i++) {
            const square = document.getElementById(`square-${i}`)
            if (square.innerHTML.trim() === '' && board[i]) {
                const symbol = document.createElement('img');
                symbol.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${board[i]}.svg`
                square.appendChild(symbol)
            }

            if (board[i] === '' && square.innerHTML.trim() !== '') {
                square.innerHTML = ''
            }
        }

        if (gameStatus !== '') {
            document
                .getElementById('game-status')
                .innerHTML = `Winner: ${gameStatus.toUpperCase()}`
            document
                .getElementById('new-game')
                .disabled = false
            document
                .getElementById('give-up')
                .disabled = true
        } else {
            document
                .getElementById('new-game')
                .disabled = true

            document
                .getElementById('give-up')
                .disabled = false
            document
                .getElementById('game-status')
                .innerHTML = ''
        }


    }


    updateAndRender(null, true)
})