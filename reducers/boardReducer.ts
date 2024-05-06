import {
  generateBoard,
  generateHighScores,
  removeAdjacentBalloons,
} from "@/utils/gameLogic";
import { db } from "@/utils/localstorage";
export type Board = number[];

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

export interface GameState {
  board: Board;
  boardSize: number;
  highScores: HighScores;
  gameStatus: GameStatus;
}

type ActionType =
  | { type: "START_GAME" }
  | { type: "END_GAME"; gameResult: GameStatus }
  | { type: "POP_BALLOON"; index: number }
  | { type: "UPDATE_HIGH_SCORE" }
  | { type: "GET_SAVED_GAME"; game: GameState }
  | { type: "CHANGE_BOARD_SIZE"; newBoardSize: number };

export const getInitialGameState = (boardSize: number) => {
  return {
    boardSize,
    board: new Array(boardSize * boardSize).fill(0),
    highScores: [],
    gameStatus: GameStatus.WAITING,
  };
};

export const initializer = (initialValue: GameState) => {
  const value = db.get();
  return value ? JSON.parse(value) : initialValue;
};

export function reducer(state: GameState, action: ActionType): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        board: generateBoard(state.boardSize),
        gameStatus: GameStatus.PLAYING,
      };

    case "END_GAME":
      return {
        ...state,
        gameStatus: action.gameResult,
      };
    case "POP_BALLOON":
      return {
        ...state,
        board: removeAdjacentBalloons(
          action.index,
          state.board,
          state.boardSize
        ),
      };
    case "UPDATE_HIGH_SCORE":
      return {
        ...state,
        highScores: generateHighScores(state.board, state.boardSize),
      };
    case "GET_SAVED_GAME":
      return {
        ...action.game,
      };
    case "CHANGE_BOARD_SIZE":
      return getInitialGameState(action.newBoardSize);
    default:
      return getInitialGameState(6);
  }
}
