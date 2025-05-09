const mongoose = require("mongoose");

const SLImagesSchema = new mongoose.Schema({
  id: String, // ← ეს უნდა იყოს
  name: String,
  descr: String,
  images: {
    img1: String,
    img2: String,
    img3: String,
  },
  price: String,
  sale: String,
  orgprice: String,
  type: String,
  member: String,
});

module.exports = SLImagesSchema; // ← აქაც მხოლოდ სქემა
