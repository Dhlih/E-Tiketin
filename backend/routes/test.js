// Contoh sederhana sistem check-in via QR Code (Node.js + Express + MongoDB + QR Generator)
// Jalankan dengan: npm init -y && npm install express mongoose qrcode
const Transactions = require("../models/transactionModel");

const express = require("express");
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const app = express();
const port = 4000;

const cors = require("cors");
app.use(cors());

// Koneksi ke MongoDB
mongoose
  .connect(
    "mongodb+srv://ifad:roronoazoro@freecodecamp.rmh0s.mongodb.net/e-Tiketin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Terhubung ke MongoDB"))
  .catch((err) => console.error("Gagal koneksi ke MongoDB:", err));

// Skema user

// Endpoint check-in dari QR Code
app.get("/checkin/:id", async (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);

  if (!transactionId) return res.status(400).send("ID tidak ditemukan.");

  try {
    const transaction = await Transactions.findOneAndUpdate(
      { _id: transactionId },
      { hasVisited: true },
      { new: true }
    );
    console.log(transaction);

    if (!transaction) return res.status(404).send("User tidak ditemukan.");
    res.send(
      `<h2>Check-in berhasil untuk User ID: ${transaction.visitorName}</h2>`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan server.");
  }
});

// Endpoint halaman terima kasih (optional)
app.get("/thankyou", (req, res) => {
  res.send("<h2>Terima kasih sudah check-in!</h2>");
});

// Endpoint generate QR Code untuk tiket user
app.get("/generate-qr/:id", async (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);
  const checkinUrl = `http://localhost:4000/checkin?id=${transactionId}`;

  try {
    const qrImage = await QRCode.toDataURL(checkinUrl);
    console.log(qrImage);
    res.send(`
      <h2>Tiket QR Code untuk Transaksi ID ${transactionId}}</h2>
      <img src="${qrImage}" alt="QR Code">
      <p>Scan QR ini saat check-in</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal membuat QR Code.");
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
