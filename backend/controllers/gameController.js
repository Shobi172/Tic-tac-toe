const Game = require("../models/Game");

const createOrUpdateGame = async (req, res) => {
  try {
    const { userId } = req.params;
    const { squares, status, scores } = req.body;

    const existingGame = await Game.findOne({ userId });

    if (existingGame) {
      existingGame.squares = squares;
      existingGame.status = status;
      existingGame.scores = scores;
      await existingGame.save();

      res
        .status(200)
        .json({ message: "Game updated successfully", game: existingGame });
    } else {
      const newGame = new Game({
        userId,
        squares,
        status,
        scores,
      });

      await newGame.save();

      res
        .status(201)
        .json({ message: "New game created successfully", game: newGame });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserGame = async (req, res) => {
  try {
    const userId = req.params.userId;

    const game = await Game.findOne({ userId });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createOrUpdateGame,
  getUserGame,
};
