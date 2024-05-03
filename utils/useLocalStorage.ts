import { useEffect, useReducer } from "react";
import {
  Board,
  GameStatus,
  HighScores,
  generateBoard,
  generateHighScores,
  removeAdjacentBalloons,
} from "./board";

const localStorageKey = "ballooonGame";

interface GameState {
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
  | { type: "CHAGE_BOARD_SIZE"; newBoardSize: number };

export const gameInitialState = {
  boardSize: 6,
  board: new Array(6 * 6).fill({ hasBalloon: 0 }),
  highScores: [],
  gameStatus: GameStatus.WAITING,
};

const initializer = (initialValue: GameState) => {
  const value = window.localStorage.getItem(localStorageKey);
  return value ? JSON.parse(value) : initialValue;
};
function reducer(state: GameState, action: ActionType) {
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
    case "CHAGE_BOARD_SIZE":
      return {
        boardSize: action.newBoardSize,
        board: new Array(action.newBoardSize * action.newBoardSize).fill({
          hasBalloon: 0,
        }),
        highScores: [],
        gameStatus: GameStatus.WAITING,
      };
    default:
      return gameInitialState;
  }
}

export default function useLocalStorage(
  initialValue: GameState = gameInitialState
) {
  const [gameState, dispatch] = useReducer(reducer, initialValue, initializer);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(gameState));
  }, [gameState]);

  return [gameState, dispatch] as const;
}
