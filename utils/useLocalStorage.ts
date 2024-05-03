import { useEffect, useReducer } from "react";
import {
  Board,
  GameStatus,
  HighScores,
  generateBoard,
  generateHighScores,
  getInitialGameState,
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
      return getInitialGameState(action.newBoardSize);
    default:
      return getInitialGameState(6);
  }
}

export default function useLocalStorage(
  initialValue: GameState = getInitialGameState(6)
) {
  const [gameState, dispatch] = useReducer(reducer, initialValue, initializer);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(gameState));
  }, [gameState]);

  return [gameState, dispatch] as const;
}
