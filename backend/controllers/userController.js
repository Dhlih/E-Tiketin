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
    res.status(400).json({ msg: "Failed to create user" });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    // ✅ Kirim cookie yang benar (untuk cross-origin & HTTPS)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // wajib true untuk HTTPS
      sameSite: "None",      // wajib "None" untuk cross-origin
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 hari
    });

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Login failed" });
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
    // ✅ Hapus cookie dengan config yang sama
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
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
