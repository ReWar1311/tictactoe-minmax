# Tic-Tac-Toe with Minimax Algorithm
*Thanks [@Sujas-Aggarwal](https://github.com/Sujas-Aggarwal)*

A web-based Tic-Tac-Toe game implementing the Minimax algorithm to ensure an unbeatable AI opponent.


## Demo

Experience the game live: [Tic-Tac-Toe Minimax](https://tictactoe-minmax-tau.vercel.app)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ReWar1311/tictactoe-minmax.git
   cd tictactoe-minmax
   ```

2. **Open in Browser**:

   Simply open `index.html` and start playing.

## How to Play

- Click on any cell to make your move.
- The AI will automatically make its move after yours.
- The game continues until there's a winner or a draw.

## Project Structure

```
tictactoe-minmax/
├── index.html    # Main HTML file
├── style.css     # CSS for styling
├── index.js      # JavaScript with game logic and Minimax implementation
└── new.js        # Additional JavaScript functions
```

## Minimax Algorithm Overview

The Minimax algorithm is a recursive method used in decision-making and game theory. It provides an optimal move for the player assuming that the opponent also plays optimally.

**Key Points**:

- **Game Tree Exploration**: Evaluates all possible moves to determine the best outcome.
- **Optimal Play**: Ensures that the AI either wins or forces a draw, making it unbeatable.
