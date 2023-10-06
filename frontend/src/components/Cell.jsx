import React from "react";

function Cell({ value, onClick }) {
  return (
    <div
      className="w-16 h-16 flex items-center justify-center bg-gray-300 cursor-pointer text-3xl font-bold border border-gray-400 rounded-md hover:bg-gray-400"
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default Cell;
