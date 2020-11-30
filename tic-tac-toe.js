window.addEventListener('DOMContentLoaded', () => {
    let currentPlayerSymbol = 'x'

    let squareValues = ['', '', '',
                        '', '', '',
                        '', '', '',];

    const status = document.getElementById('game-status');
    const checkGameState = () => {

        if (squareValues[0] === squareValues[1] && squareValues [0] === squareValues[2] && squareValues[0].length > 0) {
            status.innerText = `Winner: ${currentPlayerSymbol.toUpperCase()}`
        }
    }

    document
        .getElementById('tic-tac-toe-board')
        .addEventListener('click', event => {
            if (event.target.nodeName === 'IMG') return
            const xImg = document.createElement('img');
            xImg.src = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg';
            xImg.id = 'xPlayer'
            const oImg = document.createElement('img');
            oImg.src = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg';
            oImg.id = 'oPlayer'

            if (currentPlayerSymbol === 'x') {
                event.target.appendChild(xImg);
                const id = event.target.id
                const value = parseInt(id.replace(/[^0-9\.]/g, ''), 10)
                squareValues[value] = currentPlayerSymbol
                checkGameState()
                currentPlayerSymbol = 'o'
            } else {
                event.target.appendChild(oImg)
                const id = event.target.id
                const value = parseInt(id.replace(/[^0-9\.]/g, ''), 10)
                squareValues[value] = currentPlayerSymbol
                checkGameState()
                currentPlayerSymbol = 'x'

            }
            console.log(squareValues)

        })

    const newGame = document.getElementById('new-game');
    if (status.innerText.length > 0) newGame.disabled = false






















})