"use client";
import {
  Board,
  HighScores,
  generateBoard,
  generateHighScores,
  removeAdjacentBalloons,
  isValideMove,
} from "@/utils/board";
import { useEffect, useState } from "react";

export default function Board() {
  const boardSize = 6;
  const [board, setBoard] = useState<Board>([...Array(boardSize * boardSize)]);
  const [highScores, setHighScores] = useState<HighScores>([]);

  useEffect(() => {
    if (board[0]) {
      setHighScores(generateHighScores(board, boardSize));
    }
  }, [board]);

  const startGame = () => {
    setBoard(generateBoard(boardSize));
  };

  const handleClickSquare = (index: number) => {
    if (board[index].hasBalloon) {
      if (isValideMove(index, highScores)) {
        setBoard(removeAdjacentBalloons(index, board, boardSize));
      } else {
        // invalid game move, game ended
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-px pb-10">
        {board.map((box, index) => {
          return (
            <div
              className="w-20 h-20 border-2 border-gray text-center text-4xl py-4"
              key={index}
              onClick={() => handleClickSquare(index)}
            >
              {box?.hasBalloon ? `🎈` : ""}
            </div>
          );
        })}
      </div>

      <button
        className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}
