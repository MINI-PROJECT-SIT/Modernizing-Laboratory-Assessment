const express = require("express");
const router = express.Router();
const { User } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const z = require("zod");
const { JWT_SECRET } = require("../config.js");
const { use } = require("bcrypt/promises.js");
const userMiddleWare = require("../middlewares/user.js");

const userSignupSchema = z.object({
  username: z.string().length(10, "USN should be exactly 10 characters long"),
  password: z
    .string()
    .min(8, "Enter DOB in the format DDMMYYYY")
    .max(8, "Enter DOB in the format DDMMYYYY"),
  batch: z.string().min(1, "Batch is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
});

const userSignInSchema = z.object({
  username: z.string().min(10, "Username is required"),
  password: z
    .string()
    .min(8, "Enter DOB in the format DDMMYYYY")
    .max(8, "Enter DOB in the format DDMMYYYY"),
});

router.get("/tests", userMiddleWare, (req, res) => {
  res.send("Access granted");
});

//Sign Up route
router.post("/signup", async (req, res) => {
  try {
    const { username, password, batch, year, branch } = userSignupSchema.parse(
      req.body
    );

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      username,
      password,
      batch,
      year,
      branch,
    });
    await newUser.save();
    const payload = {
      userId: newUser._id,
      role: "user",
    };
    const token = jwt.sign(payload, JWT_SECRET);
    res
      .status(200)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    console.log("Error", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ msg: "Internal server error", err });
  }
});

//Sign In route
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = userSignInSchema.parse(req.body);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Incorrect username" });
    }
    if (password != user.password) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const payload = {
      userId: user._id,
      role: "user",
    };
    const token = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log("Error", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ msg: "Internal server error", err });
  }
});

module.exports = router;
