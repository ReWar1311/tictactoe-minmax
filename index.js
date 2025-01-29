// Min Max Algorithm

class GameState {
  // Human = +1 (max) and AI = -1 (min)
  // AI player is 'O', human player is 'X'
  currentTurn = "X"; // starting from user
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  async clear() {
    this.currentTurn = "X";
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    await updateUI();
  }
  async move(x, y) {
    this.board[x][y] = this.currentTurn;
    this.currentTurn = this.currentTurn == "X" ? "O" : "X";
    await updateUI();
  }
}

// GameState = Board + Turn

//Terminal States - helpful in state and evaluation
// "XXX" - +1
// "OOO" - -1
// rest - 0

// Action - State + Move => State
// xx0
// x-x
// ---

//Evaluation -

//BestMove - State => Move Coordinates

function MinMax(currentState) {
  // cordi,value
  let player = currentState.currentTurn;
  let currentEval = evaluation(currentState);
  // console.log("Evaluation Value: ", currentEval);
  let currentTurn = currentState.currentTurn;
  if (currentEval != -10) {
    //terminal
    return [[-1, -1], currentEval];
  }
  // non-terminal recursive cases --->
  let cordis = possibleMoves(currentState);
  // console.log("Cordis:", cordis);
  if (player == "X") {
    //max player - human
    let mResult = [[-1, -1], -10];
    for (let i = 0; i < cordis.length; i++) {
      let newGameBoard = action(currentState, cordis[i][0], cordis[i][1]);
      let result = MinMax({
        board: newGameBoard,
        currentTurn: currentTurn == "X" ? "O" : "X",
      });
      if (result[1] == 1) {
        mResult[0] = cordis[i];
        mResult[1] = result[1];
        break;
      } else if (result[1] > mResult[1]) {
        mResult[0] = cordis[i];
        mResult[1] = result[1];
      }
    }
    return mResult;
  } else if (player == "O") {
    //min player - AI
    let mResult = [[-1, -1], 10];
    for (let i = 0; i < cordis.length; i++) {
      let newGameBoard = action(currentState, cordis[i][0], cordis[i][1]);
      let result = MinMax({
        board: newGameBoard,
        currentTurn: currentTurn == "X" ? "O" : "X",
      });
      if (result[1] == -1) {
        mResult[0] = cordis[i];
        mResult[1] = result[1];
        break;
      } else if (result[1] < mResult[1]) {
        mResult[0] = cordis[i];
        mResult[1] = result[1];
      }
    }
    return mResult;
  }
  return [[-1, -1], 0];
}

function possibleMoves(gameState) {
  let cordis = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameState.board[row][col] == "") cordis.push([row, col]); //-10 means no terminal
    }
  }
  return cordis;
}

function action(gameState, x, y) {
  let newBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      newBoard[row][col] = gameState.board[row][col]; //-10 means no terminal
    }
  }
  newBoard[x][y] = gameState.currentTurn;
  return newBoard;
}

function evaluation(currentState) {
  let board = currentState.board;
  // console.log("Evaluation Board : ", board);
  // from left to right
  for (let row = 0; row < 3; row++) {
    let element = board[row][0];
    if (element == "") continue;
    let isBreak = false;
    for (let col = 0; col < 3; col++) {
      if (board[row][col] != element) {
        isBreak = true;
        break;
      }
    }
    if (!isBreak) {
      return element == "X" ? 1 : -1;
    }
  }
  // from top to bottom
  for (let col = 0; col < 3; col++) {
    let element = board[0][col];
    if (element == "") continue;
    let isBreak = false;
    for (let row = 0; row < 3; row++) {
      if (board[row][col] != element) {
        isBreak = true;
        break;
      }
    }
    if (!isBreak) {
      return element == "X" ? 1 : -1;
    }
  }

  // main diagonal
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[2][2] == board[0][0]
  ) {
    return board[0][0] == "X" ? 1 : -1;
  }

  // cross diagonal
  if (
    board[0][2] != "" &&
    board[0][2] == board[1][1] &&
    board[2][0] == board[0][2]
  ) {
    return board[0][2] == "X" ? 1 : -1;
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] == "") return -10; //-10 means no terminal
    }
  }

  return 0;
}

// Testing Components ---------------------------------
// const game = new GameState();
// console.log("Testing Possible Moves");
// console.log(possibleMoves(game));
// console.log("Testing Evaluation");
// console.log(evaluation(game));
// console.log("Testing Action");
// console.log(action({ board: game.board, currentTurn: "X" }, 1, 2));
// console.log("--------------------MINMAX CALLED-----------------------");
// // game.board = [
// //   ["", "X", ""],
// //   ["", "", ""],
// //   ["", "", ""],
// // ];
// // game.currentTurn = "O";
// console.log(game.board, game.currentTurn);
// console.log(MinMax(game));
// console.log("--------------------------------------------------------");

// console.log("200 lines complete");

// // ---------------------- HTML Linker ----------------------------
const game = new GameState();
const gameStartButton = document.getElementById("game-start-button");
const gameWindow = document.getElementById("game-window");
const playerNameInput = document.getElementById("player-name-input");
const cells = document.getElementsByClassName("small-box");
const dynamicTextMessages = document.getElementById("dynamic-text-messages");
const startButton = document.getElementById("game-start-button");
let isFirstMove = true;
let isGameOver = false;
// Modify updateUI to return a proper Promise
const updateUI = () => {
  return new Promise((resolve) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        cells[row * 3 + col].innerHTML = game.board[row][col];
      }
    }
    resolve();
  });
};

// Modify playCPUTurn to be async and handle the flow properly
async function playCPUTurn() {
  dynamicTextMessages.innerHTML = "<h3>Computer is thinking....</h3>";
  let outcome = evaluation(game);
  if (outcome != -10) {
    gameOver(outcome);
  }

  // Add a small delay to let UI update complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  let result = MinMax(game);
  let cordi = result[0];

  await game.move(cordi[0], cordi[1]);

  dynamicTextMessages.innerHTML = "<h3 style='color:tomato'>Your Turn</h3>";
  outcome = evaluation(game);
  if (outcome != -10) {
    gameOver(outcome);
  }
}

const drawMove = (role, pos) => {
  // console.log(role);
  // console.log(pos);
  let cell = document.getElementById(`small-box-${pos}`);
  cell.innerHTML = role;
};
const startGameAction = () => {
  if (playerNameInput.value == "") {
    return;
  }
  game.clear();
  gameWindow.style.display = "flex";
  isGameOver = false;
  isFirstMove = true;
  playerNameInput.disabled = true;
  playerNameInput.style.textAlign = "center";
  startButton.style.display = "none";
  dynamicTextMessages.innerHTML = "<h3 style='color:tomato'>Your Turn</h3>";
  ``;
};

function gameOver(outcome) {
  isGameOver = true;
  showResult(
    "Game Over: " +
      (outcome == 0 ? "Draw" : outcome == 1 ? "You Win" : "Computer Wins")
  );
  setTimeout(() => {
    startGameAction();
  }, 5000);
}

function showResult(str) {
  dynamicTextMessages.innerHTML = `<h3 style="color:red;font-weight:bold">${str}</h3>`;
}
gameStartButton.onclick = startGameAction;
// Modify the click event handler
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", async (e) => {
    if (e.target.innerHTML == "" && !isGameOver) {
      let x = i % 3;
      let y = (i - (i % 3)) / 3;

      await game.move(y, x);
      if (isFirstMove) {
        isFirstMove = false;
        if (x == 1 && y == 1) {
          await game.move(0, 0);
        } else {
          await game.move(1, 1);
        }
      } else {
        await playCPUTurn();
      }
    }
  });
}
