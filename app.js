const gameBoardUI = document.getElementById("gameBoardUI");

const getInitialState = () => {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
};

let gameState = getInitialState();
const turns = [];
const div = document.createElement("div");
let gameStateLog = [];

div.id = "currentTurn";

const createUIElement = (
  elementType = "div",
  attributes = {},
  children = []
) => {
  const element = document.createElement(elementType);
  Object.entries(attributes).forEach((attr) =>
    element.setAttribute(attr[0], attr[1])
  );
  return element;
};

const createRow = (row) => {
  row.reduce((element) => console.log("create row=", row));
};

const createBoard = (gameStates, boardReference) => {
  gameStates.reduce((children, row) => {
    console.log(children, row);
    createRow(row);
  });
  boardReference.append();
};

createBoard(gameState, gameBoardUI);

function initializeBoard() {
  div.append(`Current Turn: ${getCurrentTurn()}`);
  gameBoardUI.innerHTML = null;

  for (let i = 0; i < gameState.length; i++) {
    const row = gameState[i];

    const rowUI = row.reduce((accumulator, boardPosition, index) => {
      const boardPositionUI = `<div class="boardPiece" onclick="setPieceValue(${i},${index})"></div>`;
      return accumulator + boardPositionUI;
    }, "");

    const rowUIWrapper = `<div class="boardRow">${rowUI}</div>`;
    gameBoardUI.innerHTML = gameBoardUI.innerHTML + rowUIWrapper;
  }
  gameBoardUI.appendChild(div);
}

function reInitializeBoard() {
  gameState = getInitialState();
  turns.length = 0;
  div.innerHTML = null;
  getCurrentTurn();
  initializeBoard();
}

function getCurrentTurn() {
  return turns.length && turns[turns.length - 1] === "X" ? "O" : "X";
}

function setPieceValue(i, j) {
  if (!gameState[i][j]) {
    let selectedBoard = gameBoardUI
      .getElementsByClassName("boardRow")
      [i].getElementsByClassName("boardPiece")[j];
    if (turns.length) {
      if (turns[turns.length - 1] === "X") {
        selectedBoard.innerHTML = "O";
        gameState[i][j] = "O";

        turns.push("O");
      } else {
        selectedBoard.innerHTML = "X";
        gameState[i][j] = "X";
        turns.push("X");
      }
    } else {
      gameState[i][j] = "X";
      selectedBoard.innerHTML = "X";
      turns.push("X");
    }
    div.innerHTML = `Current Turn: ${getCurrentTurn()}`;
    gameStateLog.push([...gameState]);
    console.log("game log==", gameStateLog);
    computeGameState();
    createLogButton(turns.length - 1);
  }
}

function createLogButton(stepCount) {
  let btn = document.createElement("button");
  btn.append(`Go Back to step ${stepCount}`);
  btn.addEventListener("click", () => console.log(stepCount));
  gameBoardUI.appendChild(btn);
}

function computeGameState() {
  let winner = "";
  let presentBoardStage = gameState.flat().join("");
  if (
    (presentBoardStage[0] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[8] &&
      presentBoardStage[4] === "X") ||
    (presentBoardStage[2] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[6] &&
      presentBoardStage[4] === "X") ||
    presentBoardStage.substring(3, 6) === "XXX" ||
    presentBoardStage.substring(6, 9) === "XXX" ||
    presentBoardStage.substring(0, 3) === "XXX" ||
    (presentBoardStage[0] === presentBoardStage[3] &&
      presentBoardStage[3] === presentBoardStage[6] &&
      presentBoardStage[6] === "X") ||
    (presentBoardStage[1] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[7] &&
      presentBoardStage[7] === "X") ||
    (presentBoardStage[2] === presentBoardStage[5] &&
      presentBoardStage[5] === presentBoardStage[8] &&
      presentBoardStage[8] === "X")
  ) {
    winner = "Hurray!! X Won!";
  }
  if (
    (presentBoardStage[0] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[8] &&
      presentBoardStage[4] === "O") ||
    (presentBoardStage[2] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[6] &&
      presentBoardStage[4] === "O") ||
    presentBoardStage.substring(3, 6) === "OOO" ||
    presentBoardStage.substring(6, 9) === "OOO" ||
    presentBoardStage.substring(0, 3) === "OOO" ||
    (presentBoardStage[0] === presentBoardStage[3] &&
      presentBoardStage[3] === presentBoardStage[6] &&
      presentBoardStage[6] === "O") ||
    (presentBoardStage[1] === presentBoardStage[4] &&
      presentBoardStage[4] === presentBoardStage[7] &&
      presentBoardStage[7] === "O") ||
    (presentBoardStage[2] === presentBoardStage[5] &&
      presentBoardStage[5] === presentBoardStage[8] &&
      presentBoardStage[8] === "O")
  ) {
    winner = "Hurray!! O Won!";
  }
  if (turns.length > 8 && !winner) {
    winner = "It's a Tie!";
  }
  if (winner) {
    div.innerHTML = winner;
    div.animate({ zoom: 1.5 }, 2000).animate({ zoom: 1 });
  }
}

initializeBoard();
