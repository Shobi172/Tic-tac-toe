import React from "react";
import Cell from "./Cell";

function Board({ squares, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-md p-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto md:px-10 xl:px-24">
      {squares.map((square, index) => (
        <Cell key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}

export default Board;
