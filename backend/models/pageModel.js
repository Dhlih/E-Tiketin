const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
