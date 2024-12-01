const express = require("express");
const router = express.Router();
const { User, Test } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcrypt");
const { JWT_SECRET, saltRounds } = require("../config.js");
const userMiddleWare = require("../middlewares/user.js");

const userSignupSchema = z.object({
  username: z.string(),
  usn: z.string().length(10, "USN should be exactly 10 characters long"),
  password: z
    .string()
    .min(8, "Enter DOB in the format DDMMYYYY")
    .max(8, "Enter DOB in the format DDMMYYYY"),
  batch: z.string().min(1, "Batch is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
});

const userSignInSchema = z.object({
  usn: z.string().min(10, "Username is required"),
  password: z
    .string()
    .min(8, "Enter DOB in the format DDMMYYYY")
    .max(8, "Enter DOB in the format DDMMYYYY"),
});

//Sign Up route
router.post("/signup", async (req, res) => {
  try {
    const { username, usn, password, batch, year, branch } =
      userSignupSchema.parse(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
      usn: usn.toLowerCase(),
      batch: batch.toLowerCase(),
      year,
      branch: branch.toLowerCase(),
    });
    await newUser.save();

    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res
      .status(200)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    console.log("Error", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error", err });
  }
});

//Sign In route
router.post("/signin", async (req, res) => {
  try {
    const { usn, password } = userSignInSchema.parse(req.body);
    const user = await User.findOne({ usn: usn.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Incorrect username" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({ token: token });
  } catch (err) {
    console.log("Error", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error", err });
  }
});

module.exports = router;
