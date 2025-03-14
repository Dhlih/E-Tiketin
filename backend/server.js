const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
const userRoute = require("./routes/users");
const pageRoute = require("./routes/pages");
const transactionRoute = require("./routes/transaction");

app.use("/api/users", userRoute);
app.use("/api/pages", pageRoute);
app.use("/api/transactions", transactionRoute);

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Export untuk serverless (Vercel)
module.exports = app;
module.exports.handler = serverless(app);
