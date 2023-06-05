const startGame = document.querySelector('.startGame')
const gameContainer = document.querySelector('.game')
const usernameChoose = document.querySelector('main.mainPick')
const playerOneName = document.getElementById('playerOne')
const playerTwoName = document.getElementById('playerTwo')
const board = document.querySelector('.board')
const tiles = document.querySelectorAll('.tile')
const playerOneDisplay = document.querySelector('.playerOneDisplay')
const playerTwoDisplay = document.querySelector('.playerTwoDisplay')
const restartButton = document.querySelector('.restartButton')
const restartDisplay = document.querySelector('.restart')
let gameLength = 0;
let currentPlayer = 'Player One'
let playerOneValue = playerOneName.value;
let playerTwoValue = playerTwoName.value;

startGame.addEventListener('click', () => {
    gameContainer.style.cssText = 'display: flex;'
    usernameChoose.style.cssText = 'display: none;'
    playerOneDisplay.firstChild.textContent = playerOneName.value
    playerTwoDisplay.firstChild.textContent = playerTwoName.value
    playerOneValue = playerOneName.value;
    playerTwoValue = playerTwoName.value;
    for (let i = 0; i < 9; i++) {
        tiles[i].addEventListener('click', tileProcess)
    }
})


const gameBoard = (() => {
    const board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]    
    return {
        board
    }
})()

restartButton.addEventListener('click', resetGame)

const Player = (name) => {
    return { name }
}

function tileProcess(e) {
    let tile = e.target.id;
    for (let i = 0; i < gameBoard.board.length; i++) {
        if (tile == `tile${i}`) {
            if (gameBoard.board[i] == '') {
                gameBoard.board[i] = currentPlayer;
                if (currentPlayer == 'Player One') {
                    e.target.style.cssText = 'content: url(images/X.svg);'
                } else {
                    e.target.style.cssText = 'content: url(images/O.svg);'
                }
                winCheck()
                changePlayer()
                gameLength++
            }
        }
    }
}

function changePlayer() {
    if (currentPlayer == 'Player One') {
        currentPlayer = 'Player Two'
        playerTwoDisplay.style.cssText = 'border: 3px solid var(--O-color);'
        playerOneDisplay.style.cssText = 'border: none;'
    } else {
        currentPlayer = 'Player One'
        playerOneDisplay.style.cssText = 'border: 3px solid var(--X-color);'
        playerTwoDisplay.style.cssText = 'border: none;'
    }
}

function resetGame() {
    gameContainer.style.cssText = 'display: none;';
    usernameChoose.style.cssText = 'display: flex;';
    restartDisplay.style.cssText = 'display: none;'
    playerOneName.value = playerOneValue;
    playerTwoName.value = playerTwoValue;
    gameBoard.board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    currentPlayer = 'Player One'
    for (let i = 0; i < 9; i++) {
        tiles[i].style.cssText = 'content: url(images/placeholder.png)'
    }
    playerOneDisplay.style.cssText = 'border: 3px solid var(--X-color);'
    playerTwoDisplay.style.cssText = 'border: none;'
}

function winCheck() {
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < winCondition.length; i++) {
        if (gameBoard.board[winCondition[i][0]] == 'Player One' &&
            gameBoard.board[winCondition[i][1]] == 'Player One' && 
            gameBoard.board[winCondition[i][2]] == 'Player One') {
                gameContainer.style.cssText = 'display: none;'
                restartDisplay.style.cssText = 'display: flex;'
                document.querySelector('.winnerAnnouncement').textContent = `The Winner is ${playerOneValue}!`
                for (let i = 0; i < 9; i++) {
                    tiles[i].style.cssText = 'content: url(images/placeholder.png)'
                }       
                gameLength = 0;
            } else if (gameBoard.board[winCondition[i][0]] == 'Player Two' && 
                gameBoard.board[winCondition[i][1]] == 'Player Two' && 
                gameBoard.board[winCondition[i][2]] == 'Player Two') {
                gameContainer.style.cssText = 'display: none;'
                restartDisplay.style.cssText = 'display: flex;'
                document.querySelector('.winnerAnnouncement').textContent = `The Winner is ${playerTwoValue}!`
                for (let i = 0; i < 9; i++) {
                    tiles[i].style.cssText = 'content: url(images/placeholder.png)'
                }      
                gameLength = 0;
            } else if (gameLength == 9) {
                gameContainer.style.cssText = 'display: none;'
                restartDisplay.style.cssText = 'display: flex;'
                gameLength = 0;
                document.querySelector('.winnerAnnouncement').textContent = `It's a draw!`
                for (let i = 0; i < 9; i++) {
                    tiles[i].style.cssText = 'content: url(images/placeholder.png)'
                }      
            }
}}
