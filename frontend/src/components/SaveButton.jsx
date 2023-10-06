import React from "react";
import instance from "../axios";

function SaveButton({ board, scores, status }) {
  const userId = localStorage.getItem("userId");
  const handleSave = async () => {
    try {
      await instance.put(`/api/game/${userId}`, {
        squares: board,
        status: status,
        scores: scores,
      });
      alert("Game state saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save game state.");
    }
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      onClick={handleSave}
    >
      Save
    </button>
  );
}

export default SaveButton;
