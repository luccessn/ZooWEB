require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const UserSchema = require("./Models/User");
const CvImagesSchema = require("./Models/Images/cvImages");
// const UserModel = require("./Models/User");
const app = express();
app.use(express.json());
app.use(cors());

// ჯერ შექმნე კავშირები სინქრონულად
const userDb = mongoose.createConnection(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 50000,
});

const imageDb = mongoose.createConnection(process.env.MONGO_URI2, {
  serverSelectionTimeoutMS: 50000,
});

// შემდეგ გამოიძახე მოდელები

const UserModel = userDb.model("users", UserSchema);
const CvImagesModel = imageDb.model("coverimages", CvImagesSchema);

// ტესტის route
app.get("/", (req, res) => {
  res.send(
    "მოგესალმები ZooWeb ის Back ის სერვერზე . წარმატებით გაეშვა სერვერი 🚀"
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then(async (user) => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.json({ message: "Success", user });
        } else {
          res.json("The Password is incorrect");
        }
      } else {
        res.json("Account Not Exists");
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "An Error Occurred", error });
    });
});

// Registration
app.post("/register", (req, res) => {
  const { email } = req.body;

  UserModel.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "The email you are using is already in use" });
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
app.get("/getcvImages", async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
      const image = await CvImagesModel.findOne({ id: id });
      if (!image) {
        return res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" });
      }
      return res.json(image);
    } else {
      const allImages = await CvImagesModel.find();
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
