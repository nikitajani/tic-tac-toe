const gameBoardUI = document.getElementById("gameBoardUI");

let gameState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const turns = [];
let div = document.createElement("div");
div.id = "currentTurn";
let gameStateLog = [];

initializeBoard();

function initializeBoard() {
  div.append(`Current Turn: ${getCurrentTurn()}`);
  gameBoardUI.innerHTML = "";
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
  gameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  turns.length = 0;
  div.innerHTML = "";
  getCurrentTurn();
  initializeBoard();
}

function getCurrentTurn() {
  if (turns.length) {
    if (turns[turns.length - 1] === "X") {
      return "O";
    } else {
      return "X";
    }
  } else {
    return "X";
  }
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
    createLogButton();
  }
}

function createLogButton() {
  let btn = document.createElement("button");
  btn.append(`Go Back to step ${turns.length}`);
  btn.addEventListener("click", () => console.log(turns.length));
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
