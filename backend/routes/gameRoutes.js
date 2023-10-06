const express = require("express");
const router = express.Router();
const GameController = require("../controllers/GameController");

router.get("/:userId", GameController.getUserGame);

router.put("/:userId", GameController.createOrUpdateGame);

module.exports = router;
