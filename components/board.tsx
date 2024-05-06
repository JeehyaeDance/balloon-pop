"use client";
import { useBoard } from "@/hooks/useBoard";
import { GameStatus } from "@/reducers/boardReducer";
import Square from "./square";
import { useEffect, useState } from "react";

export default function Board() {
  const [mounted, setMounted] = useState<boolean>(false);

  const [
    { gameStatus, board, boardSize },
    startGame,
    onClickBalloon,
    handleBoardSizeChange,
  ] = useBoard();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getGameStatusText = () => {
    switch (gameStatus) {
      case GameStatus.PLAYING:
        return "Pop balloons in an order that you can pop the most! 🎈💥";
      case GameStatus.WAITING:
        return 'Press "Start" to play. 🎯';
      case GameStatus.SUCCESS:
        return "You've won! 🎉";
      case GameStatus.FAIL:
        return "You've lost. 😔 Press Restart to play again. 💪";
    }
  };

  return (
    mounted && (
      <div className="flex flex-col gap-5 items-center">
        {getGameStatusText()}
        <div
          className={`grid grid-cols-${boardSize} gap-px dark:bg-gray-600 min-w-xl`}
        >
          {board.map((box, index) => {
            return (
              <Square
                key={index}
                box={box}
                index={index}
                onClick={onClickBalloon}
              />
            );
          })}
        </div>
        <div className="flex w-80 items-center">
          <div className="basis-1/2">
            <label htmlFor="boardSize">Board Size:</label>
            <input
              className="border-solid border-2 border-black-600 h-8 pl-4"
              id="boardSize"
              type="number"
              name="boardSize"
              value={boardSize}
              min="2"
              max="12"
              onChange={(e) => handleBoardSizeChange(e.currentTarget.value)}
            />
          </div>
          <button
            className="basis-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
            onClick={startGame}
            type="button"
          >
            {gameStatus === GameStatus.WAITING ? "Start" : "Restart"}
          </button>
        </div>
      </div>
    )
  );
}
