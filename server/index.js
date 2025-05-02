require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Models/User");
const app = express();
const bcrypt = require("bcryptjs");

//
app.use(express.json());
app.use(cors());

//

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 50000, // 50 seconds timeout
  })
  .then(() => console.log("MongoDB Atlas-თან კავშირი დამყარებულია"))
  .catch((err) => console.error("MongoDB კავშირის შეცდომა:", err));

// ტესტის route
app.get("/", (req, res) => {
  res.send("API მუშაობს 🚀");
});

// Login ის ფუნქციონალი
app.post("/login", (req, res) => {
  const { email, password, name, lastname } = req.body;
  UserModel.findOne({ $or: [{ email: email }] })
    .then(async (user) => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.json({
            message: "Success",
            user,
          });
        } else {
          res.json("The Password is incorrect");
        }
      } else {
        res.json("Account Not Exists");
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "An Error Occured", error });
    });
});

// Registration  ის ფუნქციონალი
app.post("/register", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email })
    .then((exitUser) => {
      if (exitUser) {
        return res
          .status(400)
          .json({ message: "The emal you are using is already in use " });
      } else {
        UserModel.create(req.body)
          .then((employes) => {
            return res.json(employes);
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Error Creating user", error: err });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error });
    });
});
// პორტი
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`სერვერი მუშაობს პორტზე ${PORT}`);
});
