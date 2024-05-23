const gameBoardUI = document.getElementById("gameBoardUI");

const gameState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

gameBoardUI.innerHTML = "";

for (let i = 0; i < gameState.length; i++) {
  const row = gameState[i];

  const rowUI = row.reduce((accumulator, boardPosition) => {
    // based on vaule, set piece = ' ' | 'X' | 'O'
    const pieceValue = "X";
    const boardPositionUI = `<div class="boardPiece">${pieceValue}</div>`;
    return accumulator + boardPositionUI;
  }, "");

  const rowUIWrapper = `<div class="boardRow">${rowUI}</div>`;
  gameBoardUI.innerHTML = gameBoardUI.innerHTML + rowUIWrapper;
}
