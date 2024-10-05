const express = require("express");
const router = express.Router();
const { Admin } = require("../db/index.js");
const z = require("zod");
const bcrypt = require("bcrypt");
const { JWT_SECRET, saltRounds } = require("../config");
const jwt = require("jsonwebtoken");
const adminMiddleWare = require("../middlewares/admin.js");

const adminSignUpSchema = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  department: z.string(),
});

const adminSignInSchema = z.object({
  username: z.string().min(10, "Mail is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

router.get("/classroom", adminMiddleWare, (req, res, next) => {
  res.send("Access Granted");
});

//Sign Up route
router.post("/signup", async (req, res) => {
  try {
    const { username, password, department } = adminSignUpSchema.parse(
      req.body
    );
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin account already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      department,
    });
    await newAdmin.save();
    const payload = {
      userId: newAdmin._id,
      role: "admin",
    };
    const token = jwt.sign({ payload }, JWT_SECRET);
    res
      .status(200)
      .json({ msg: "Admin account created successfully", token: token });
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
    const { username, password } = adminSignInSchema.parse(req.body);
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Incorrect username" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const payload = {
      userId: admin._id,
      role: "admin",
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
