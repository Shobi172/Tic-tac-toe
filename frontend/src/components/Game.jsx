import React, { useState, useEffect } from "react";
import Board from "./Board";
import Status from "./Status";
import ResetButton from "./ResetButton";
import SaveButton from "./SaveButton";
import instance from "../axios";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [status, setStatus] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      loadGameState();
    }
  }, [gameStarted]);

  const handleStartGame = async () => {
    setGameStarted(true);
    await loadGameState();
  };

  useEffect(() => {
    loadGameState();
  }, []);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const updatedWinner = calculateWinner(newBoard);
    if (updatedWinner) {
      setWinner(updatedWinner);
      setScores((prevScores) => ({
        ...prevScores,
        [updatedWinner]: prevScores[updatedWinner] + 1,
      }));
    }

    setStatus(calculateStatus(newBoard, updatedWinner));
    updateGameState(newBoard);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
    setStatus(calculateStatus(Array(9).fill(null), null));
  };

  const loadGameState = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await instance.get(`/api/game/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        if (data) {
          setBoard(data.squares);
          setScores(data.scores);
          setStatus(data.status);
        } else {
          setStatus(calculateStatus(board, winner));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateGameState = async (newBoard) => {
    try {
      const userId = localStorage.getItem("userId");
      await instance.put(`/api/game/${userId}`, { squares: newBoard, winner });
    } catch (error) {
      console.error(error);
    }
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  function calculateStatus(squares, winner) {
    return winner
      ? `Winner: ${winner}`
      : squares.every((square) => square)
      ? "It's a draw!"
      : `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center p-4">
        {!gameStarted ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <button
              className="bg-green-500 text-white px-6 py-4 rounded-md hover:bg-green-600"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <Status status={status} />
            <Board squares={board} onClick={handleClick} />
            <div className="flex flex-col items-center mt-4 space-y-4">
              <div className="flex space-x-4">
                <ResetButton onClick={handleReset} />
                <SaveButton board={board} scores={scores} status={status} />
              </div>
              <div className="w-3/4 mx-auto bg-white p-4 rounded-md shadow-md">
                <p className="text-xl font-semibold text-center">Score</p>
                <div className="flex space-x-2 justify-center">
                  <div className="text-lg font-semibold">X:</div>
                  <div className="text-lg">{scores.X}</div>
                </div>
                <div className="flex space-x-2 justify-center">
                  <div className="text-lg font-semibold">O:</div>
                  <div className="text-lg">{scores.O}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
