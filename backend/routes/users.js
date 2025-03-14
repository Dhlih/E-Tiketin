const express = require("express");
const router = express.Router();

const {
  handleLogin,
  handleRegister,
  handleRefetch,
  handleLogout,
} = require("../controllers/userController");

router.post("/login", handleLogin);

router.post("/register", handleRegister);

router.get("/refetch", handleRefetch);

router.get("/logout", handleLogout);

module.exports = router;
