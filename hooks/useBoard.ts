"use client";
import { useEffect, useReducer, useState } from "react";
import { isValidMove } from "../utils/gameLogic";
import { db } from "@/utils/localstorage";
import {
  GameStatus,
  getInitialGameState,
  initializer,
  reducer,
} from "@/reducers/boardReducer";

export function useBoard() {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialGameState(6),
    initializer
  );

  // updates local storage
  useEffect(() => {
    db.set(state);
  }, [state]);

  // update scores (when game status is playing)
  useEffect(() => {
    if (state.gameStatus === GameStatus.PLAYING) {
      dispatch({ type: "UPDATE_HIGH_SCORE" });
    }
  }, [state.board]);

  // complete game and set as win
  useEffect(() => {
    if (!state.highScores.length && state.gameStatus === GameStatus.PLAYING) {
      dispatch({ type: "END_GAME", gameResult: GameStatus.SUCCESS });
    }
  }, [state.highScores]);

  const onClickBalloon = (index: number, cb?: () => void) => {
    if (state.board[index] && state.gameStatus === GameStatus.PLAYING) {
      if (isValidMove(index, state.highScores)) {
        dispatch({ type: "POP_BALLOON", index: index });
      } else {
        // invalid game move, game ended
        dispatch({ type: "END_GAME", gameResult: GameStatus.FAIL });
      }
    }

    if (cb) {
      cb();
    }
  };

  const handleBoardSizeChange = (val: number | string) => {
    dispatch({ type: "CHANGE_BOARD_SIZE", newBoardSize: Number(val) });
  };

  const startGame = () => {
    dispatch({ type: "START_GAME" });
  };

  return [state, startGame, onClickBalloon, handleBoardSizeChange] as const;
}
