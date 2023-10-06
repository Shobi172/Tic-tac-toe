import React from "react";

function ResetButton({ onClick }) {
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      onClick={onClick}
    >
      Reset
    </button>
  );
}

export default ResetButton;
