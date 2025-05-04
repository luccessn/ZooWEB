const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: function () {
      const payload = {
        id: this._id,
        name: this.name,
        lastname: this.lastname,
        email: this.email,
      };

      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    },
  },
});
// პაროლის ჰეშირება რეგისტრაციამდე
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = UserSchema; // ← აქ შეცვლილია!
