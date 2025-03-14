const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "failed to create user" });
  }
};

const handleLogin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const matchPassword = bcrypt.compareSync(req.body.password, user.password);

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    if (user && matchPassword) {
      res
        .cookie("token", token)
        .status(200)
        .json({ id: user.id, name: user.name, email: user.email });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "no such user" });
  }
};

const handleRefetch = async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, data) => {
    if (err) {
      return res.status(401).json(err);
    }
    res.status(200).json(data);
  });
};

const handleLogout = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleRefetch,
  handleLogout,
};
