const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  squares: [String],
  status: String,
  scores: {
    X: {
      type: Number,
    },
    O: {
      type: Number,
    },
  },
});

module.exports = mongoose.model('Game', gameSchema);
