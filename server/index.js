require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const UserSchema = require("./Models/User");
const SLImagesSchema = require("./Models/Images/salesImages");
const jwt = require("jsonwebtoken");
// const UserModel = require("./Models/User");
const app = express();
app.use(express.json());
app.use(cors());

// ჯერ შექმნე კავშირები სინქრონულად
const userDb = mongoose.createConnection(process.env.MONGO_URI_USER, {
  serverSelectionTimeoutMS: 50000,
});

const salesDb = mongoose.createConnection(process.env.MONGO_URI_SALES, {
  serverSelectionTimeoutMS: 50000,
});

// შემდეგ გამოიძახე მოდელები

const UserModel = userDb.model("users", UserSchema);
const SLImagesModel = salesDb.model("ფასდაკლებები", SLImagesSchema);

console.log("JWT_SECRET:", process.env.JWT_SECRET);
// ტესტის route
app.get("/", (req, res) => {
  res.send(
    "მოგესალმები ZooWeb ის Back ის სერვერზე . წარმატებით გაეშვა სერვერი 🚀"
  );
});

// Login
// Login
app.post("/login", (req, res) => {
  const { email, password, firstName } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  UserModel.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "აქაუნთი არ არსებობს ან არასწორი მონაცემებია" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "არასწორი პაროლია" });
      }

      // ✅ აქ გენერირდება ტოკენი
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      // წარმატებული ავტორიზაცია
      return res.status(200).json({
        message: "Success",
        token, // 🟢 frontend-ს ტოკენი
        user: payload, // 🟢 საჭირო ინფო თუ გინდა გადაეცეს
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
      return res.status(500).json({ message: "An error occurred", error });
    });
});

// Registration
app.post("/register", (req, res) => {
  const { email } = req.body;

  UserModel.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          message:
            "ემაილს რომელსაც იყენებთ უკვე გამოყენებულია. გთხოვთ გამოიყენოთ სხვა ემაილი",
        });
      } else {
        UserModel.create(req.body)
          .then((newUser) => {
            return res.json(newUser);
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

// CV Images
app.get("/getSales", async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
      const image = await SLImagesModel.findOne({ id: id });
      if (!image) {
        return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" });
      }
      return res.json(image);
    } else {
      const allImages = await SLImagesModel.find();
      return res.json(allImages);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// პორტი
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`სერვერი მუშაობს პორტზე ${PORT}`);
});
// mongoose
//   .connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 50000, // 50 seconds timeout
//   })
//   .then(() => console.log("MongoDB Atlas-თან კავშირი დამყარებულია"))
//   .catch((err) => console.error("MongoDB კავშირის შეცდომა:", err));
