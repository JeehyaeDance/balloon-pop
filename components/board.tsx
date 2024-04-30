"use client";
import {
  Board,
  HighScores,
  generateBoard,
  generateHighScores,
} from "@/utils/board";
import { useState } from "react";

export default function Board() {
  const boardSize = 6;
  const [board, setBoard] = useState<Board>([...Array(boardSize * boardSize)]);
  const [highScores, setHighScores] = useState<HighScores>([]);

  const startGame = () => {
    const newBoard = generateBoard(boardSize);
    setBoard(newBoard);
    setHighScores(generateHighScores(newBoard, boardSize));
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-px pb-10">
        {board.map((box, index) => {
          return (
            <div
              className="w-20 h-20 border-2 border-gray text-center text-4xl py-4"
              key={index}
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
