let cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game_restart').addEventListener('click', onStartGame);

const statusDisplay = document.querySelector('.game_status');

const winMessage = (player) => `Player ${player} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = (player) => `It's ${player}'s turn`;

let human = 'X';
let ai = 'O';
let gameTable;
let gameActive;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontals
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticals
  [0, 4, 8], [2, 4, 6] // diagonals
];

onStartGame();

function onStartGame() {
  gameActive = true;
  gameTable = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn(human);
  cells.forEach(cell => cell.innerHTML = "");
}

function handleCellClick(clickedCellEvent) {
  console.log(clickedCellEvent);
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameTable[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameTable[clickedCellIndex] = human; 
  clickedCell.innerHTML = human; // 'X'
  console.log(human);
  isWinOrDraw();

  if (gameActive) {
    handleMoveAI();
    isWinOrDraw();
  }
}

function isWinOrDraw() {
  console.log("isWinOrDraw", gameTable);

  let whoWon;
  let flagWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    let a = gameTable[winCondition[0]];
    let b = gameTable[winCondition[1]];
    let c = gameTable[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      flagWon = true;
      whoWon = a;
      break;
    }
  }

  if (flagWon) {
    statusDisplay.innerHTML = winMessage(whoWon);
    gameActive = false;
    return;
  }

  let flagDraw = !gameTable.includes("");
  if (flagDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
}

function findCellByIndex(cellIndex) {
  let findCell;
  cells.forEach(cell => {
    let index = parseInt(cell.getAttribute('data-cell-index'));
    if (index === cellIndex) {
      findCell = cell;
    }
  });
  return findCell;
}

/* AI move */
function handleMoveAI() {
  let cellIndex;
  do {
    cellIndex = getRandomIntInclusive(0, 8);
  } while (gameTable[cellIndex] !== "");

  gameTable[cellIndex] = ai; 
  let cell = findCellByIndex(cellIndex);
  cell.innerHTML = ai; // 'O'
  console.log(ai);
}
/*======================*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}