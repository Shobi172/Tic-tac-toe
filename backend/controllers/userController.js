const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
      });

      await user.save();
    }

    const userId = user.id;

    const token = generateToken(user);

    res.status(200).json({ token, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  loginUser,
};
