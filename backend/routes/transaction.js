const express = require("express");
const router = express.Router();
const {
  handlePurchase,
  getAnalyticsLast7Days,
  getTransactionHistory,
  updateStatus,
} = require("../controllers/transactionController");

router.post("/", handlePurchase);

router.get("/:userId", getAnalyticsLast7Days);

router.get("/transaction/:userId", getTransactionHistory);

router.put("/update/:transactionId", updateStatus);

module.exports = router;
