import { useEffect, useState } from "react";
import { Board, GameStatus, HighScores } from "./board";

interface gameState {
  board: Board;
  boardSize: number;
  highScores: HighScores;
  gameStatus: GameStatus;
}

export const gameInitialState = {
  boardSize: 6,
  board: new Array(6 * 6).fill({ hasBalloon: 0 }),
  highScores: [],
  gameStatus: GameStatus.WAITING,
};

export default function useLocalStorage(
  key: string,
  initialValue: gameState = gameInitialState
) {
  const [gameState, setGameState] = useState<gameState>(initialValue);

  const setLocalStorage = (value: gameState) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setGameState(value);
  };

  useEffect(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      setGameState(JSON.parse(value));
    }
  }, []);

  return [gameState, setLocalStorage] as const;
}
