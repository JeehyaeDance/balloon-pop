export type Board = {
  hasBalloon: number;
}[];

export type HighScores = {
  index: number;
  score: number;
}[];

export const generateBoard = (boardSize: number) => {
  let board = [];
  // generate board with random ballon placement: 0 (empty) or 1 (balloon)
  for (let i = 0; i < boardSize * boardSize; i++) {
    board.push({ hasBalloon: Math.round(Math.random()) });
  }

  return board;
};

export const countScore = (index: number, board: Board, boardSize: number) => {
  let score = 1;

  // check left square
  if (index % boardSize !== 0 && board[index - 1].hasBalloon) {
    score++;
  }
  // check right square
  if (index % boardSize !== 5 && board[index + 1].hasBalloon) {
    score++;
  }
  // check top square
  if (index >= boardSize && board[index - boardSize].hasBalloon) {
    score++;
  }
  // check bottom square
  if (
    index < boardSize * (boardSize - 1) &&
    board[index + boardSize].hasBalloon
  ) {
    score++;
  }

  return score;
};

export const generateHighScores = (board: Board, boardSize: number) => {
  let highScores: HighScores = [];
  board.forEach((square, index) => {
    if (square.hasBalloon) {
      highScores.push({
        index: index,
        score: countScore(index, board, boardSize),
      });
    }
  });
  highScores.sort((a, b) => b.score - a.score);
  return highScores;
};
