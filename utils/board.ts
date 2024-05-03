export type Board = {
  hasBalloon: number;
}[];

export type HighScores = {
  index: number;
  score: number;
}[];

export enum GameStatus {
  WAITING,
  PLAYING,
  FAIL,
  SUCCESS,
}

export const getInitialGameState = (boardSize: number) => {
  return {
    boardSize,
    board: new Array(boardSize * boardSize).fill({ hasBalloon: 0 }),
    highScores: [],
    gameStatus: GameStatus.WAITING,
  };
};
export const generateBoard = (boardSize: number) => {
  let board = [];
  // generate board with random ballon placement: 0 (empty) or 1 (balloon)
  for (let i = 0; i < boardSize * boardSize; i++) {
    board.push({ hasBalloon: Math.round(Math.random()) });
  }

  return board;
};

export const countScore = (index: number, board: Board, boardSize: number) => {
  // Initialize visited array to keep track of visited cells
  const visited = new Array(boardSize * boardSize).fill(false);

  const getConnectedBalloons = (index: number) => {
    if (visited[index]) {
      return 0;
    }

    visited[index] = true;

    if (!board[index].hasBalloon) {
      return 0;
    }

    let count = 1;

    if (index >= boardSize) {
      count += getConnectedBalloons(index - boardSize); // top
    }
    if (index < boardSize * (boardSize - 1)) {
      count += getConnectedBalloons(index + boardSize); // bottom
    }
    if (index % boardSize !== 0) {
      count += getConnectedBalloons(index - 1); // left
    }
    if (index % boardSize !== boardSize - 1) {
      count += getConnectedBalloons(index + 1); // right
    }

    return count;
  };

  return getConnectedBalloons(index);
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

export const isValideMove = (index: number, highScores: HighScores) => {
  let moveValidity = false;
  let currentBalloon = highScores.find((square) => square.index === index);
  if (highScores[0].score === currentBalloon?.score) {
    moveValidity = true;
  }
  return moveValidity;
};

export const removeAdjacentBalloons = (
  index: number,
  board: Board,
  boardSize: number
) => {
  let newBoard = board.slice();
  const visited = new Array(boardSize * boardSize).fill(false);

  const removeBalloons = (index: number) => {
    if (visited[index]) {
      return;
    }

    visited[index] = true;

    if (!board[index].hasBalloon) {
      return;
    }

    newBoard[index].hasBalloon = 0;

    if (index >= boardSize) {
      removeBalloons(index - boardSize); // top
    }
    if (index < boardSize * (boardSize - 1)) {
      removeBalloons(index + boardSize); // bottom
    }
    if (index % boardSize !== 0) {
      removeBalloons(index - 1); // left
    }
    if (index % boardSize !== boardSize - 1) {
      removeBalloons(index + 1); // right
    }
  };

  removeBalloons(index);

  return newBoard;
};
