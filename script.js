let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const board = document.getElementById("board");
const modal = document.querySelector('dialog');
const announcement = document.querySelector('dialog div')

function renderBoard() {
  board.innerHTML = "";

  gameBoard.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleClick);
    board.appendChild(cellElement);
  });
};

function handleClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    switchPlayer();
  };
};

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
};

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Columns
    [0, 4, 8],[2, 4, 6], // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        modal.showModal();
        announcement.textContent = `Player '${currentPlayer}' wins!`;
        gameActive = false;
        break;
    }
  }

  if (!gameBoard.includes("") && gameActive) {
    gameActive = false;
    modal.showModal();
    announcement.textContent = `It's a draw!`;
  }
}

function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    renderBoard();
    modal.close();
}

renderBoard();
