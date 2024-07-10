const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];
const messageElement = document.getElementById('message');
const turnIndicator = document.getElementById('turnIndicator');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);
closeModal.addEventListener('click', closePopup);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.textContent = ''; // Clear the text content as well
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    setTurnIndicator();
    closePopup();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        setTurnIndicator();
    }
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = "It's a Draw!";
        startGame();
    } else {
        messageElement.textContent = `${circleTurn ? "O's" : "X's"} Win!`;
        startGame();
    }
    openPopup();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O';
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function setTurnIndicator() {
    turnIndicator.textContent = `${circleTurn ? "Player O's" : "Player X's"} Turn`;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function openPopup() {
    modal.style.display = 'flex';
}

function closePopup() {
    modal.style.display = 'none';
}
