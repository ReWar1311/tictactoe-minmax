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
    let outcome = evaluation(game);
    if (outcome != -10) {
      showResult(
        "Game Over: " +
          (outcome == 0 ? "Draw" : outcome == 1 ? "You Win" : "Computer Wins")
      );
      setTimeout(() => {
        startGameAction();
      }, 5000);
      return;
    }
  
    // Add a small delay to let UI update complete
    await new Promise(resolve => setTimeout(resolve, 100));
  
    let result = MinMax(game);
    let cordi = result[0];
  
    await game.move(cordi[0], cordi[1]);
    
    outcome = evaluation(game);
    if (outcome != -10) {
      showResult(
        "Game Over: " +
          (outcome == 0 ? "Draw" : outcome == 1 ? "You Win" : "Computer Wins")
      );
      setTimeout(() => {
        startGameAction();
      }, 5000);
    }
  }
  
  // Modify the click event handler
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", async (e) => {
      if (e.target.innerHTML == "" && game.currentTurn === "X") {
        let x = i % 3;
        let y = (i - (i % 3)) / 3;
        await game.move(y, x);
        await playCPUTurn();
      }
    });
  }
  