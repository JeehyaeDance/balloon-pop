import { useEffect, useState } from "react";

type SquareType = {
  box: number;
  index: number;
  onClick: (index: number) => void;
};
export default function Square({ box, index, onClick }: SquareType) {
  return (
    <button
      className="w-12 h-12 md:w-16 md:h-16 border-2 border-gray text-center text-3xl"
      onClick={() => onClick(index)}
      type="button"
    >
      {box ? `🎈` : ""}
    </button>
  );
}
