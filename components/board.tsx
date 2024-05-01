"use client";
import {
  Board,
  HighScores,
  generateBoard,
  generateHighScores,
  removeAdjacentBalloons,
  isValideMove,
  GameStatus,
} from "@/utils/board";
import { useEffect, useState } from "react";

export default function Board() {
  const boardSize = 6;
  const [board, setBoard] = useState<Board>([...Array(boardSize * boardSize)]);
  const [highScores, setHighScores] = useState<HighScores>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.WAITING);

  useEffect(() => {
    // update highscores, only when the game status is playing
    if (gameStatus === GameStatus.PLAYING) {
      setHighScores(generateHighScores(board, boardSize));
    }
  }, [board]);

  useEffect(() => {
    // check if highscores is empty, only when the game status is playing
    if (!highScores.length && gameStatus === GameStatus.PLAYING) {
      setGameStatus(GameStatus.SUCCESS);
    }
  }, [highScores]);

  const startGame = () => {
    setBoard(generateBoard(boardSize));
    setGameStatus(GameStatus.PLAYING);
  };

  const handleClickSquare = (index: number) => {
    // apply balloon pop logic, when game status is playing and square has balloon
    if (board[index].hasBalloon && gameStatus === GameStatus.PLAYING) {
      if (isValideMove(index, highScores)) {
        setBoard(removeAdjacentBalloons(index, board, boardSize));
      } else {
        // invalid game move, game ended
        setGameStatus(GameStatus.FAIL);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="text-center text-lg">
        {gameStatus === GameStatus.PLAYING &&
          "Pop balloons in an order that you can pop the most!"}
        {gameStatus === GameStatus.WAITING && "Press Start to play."}
        {gameStatus === GameStatus.SUCCESS && "You've won!"}
        {gameStatus === GameStatus.FAIL &&
          "You've lost. Press Restart to play again."}
      </p>

      <div className="grid grid-cols-6 gap-px">
        {board.map((box, index) => {
          return (
            <div
              className="w-20 h-20 border-2 border-gray text-center text-4xl py-4 cursor-pointer"
              key={index}
              onClick={() => handleClickSquare(index)}
            >
              {box?.hasBalloon ? `🎈` : ""}
            </div>
          );
        })}
      </div>

      <button
        className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded"
        onClick={startGame}
      >
        {gameStatus === GameStatus.WAITING ? "Start" : "Restart"}
      </button>
    </div>
  );
}
