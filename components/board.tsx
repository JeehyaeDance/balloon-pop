"use client";
import { isValideMove, GameStatus } from "@/utils/board";
import useLocalStorage from "@/utils/useLocalStorage";
import { useEffect } from "react";

export default function Board() {
  const [{ gameStatus, board, boardSize, highScores }, dispatch] =
    useLocalStorage();

  useEffect(() => {
    // update highscores, only when the game status is playing
    if (gameStatus === GameStatus.PLAYING) {
      dispatch({ type: "UPDATE_HIGH_SCORE" });
    }
  }, [board]);

  useEffect(() => {
    // check if highscores is empty, only when the game status is playing
    if (!highScores.length && gameStatus === GameStatus.PLAYING) {
      dispatch({ type: "END_GAME", gameResult: GameStatus.SUCCESS });
    }
  }, [highScores]);

  const handleClickSquare = (index: number) => {
    // apply balloon pop logic, when game status is playing and square has balloon
    if (board[index].hasBalloon && gameStatus === GameStatus.PLAYING) {
      if (isValideMove(index, highScores)) {
        dispatch({ type: "POP_BALLOON", index: index });
      } else {
        // invalid game move, game ended
        dispatch({ type: "END_GAME", gameResult: GameStatus.FAIL });
      }
    }
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBoardSize = Number(e.currentTarget.value);
    dispatch({ type: "CHAGE_BOARD_SIZE", newBoardSize });
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

      <div className={`grid grid-cols-${boardSize} gap-px dark:bg-gray-600`}>
        {board.map((box, index) => {
          return (
            <div
              className="w-16 h-16 border-2 border-gray text-center text-3xl py-3 cursor-pointer"
              key={index}
              onClick={() => handleClickSquare(index)}
            >
              {box.hasBalloon ? `🎈` : ""}
            </div>
          );
        })}
      </div>
      <div className="flex w-96 items-center">
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
            onChange={handleBoardSizeChange}
          />
        </div>
        <button
          className="basis-1/2 w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded"
          onClick={() => dispatch({ type: "START_GAME" })}
          type="button"
        >
          {gameStatus === GameStatus.WAITING ? "Start" : "Restart"}
        </button>
      </div>
    </div>
  );
}
