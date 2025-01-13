const express = require("express");
const router = express.Router();
const { User, Test, DemoResult, Result } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcrypt");
const { JWT_SECRET, saltRounds } = require("../config.js");
const userMiddleWare = require("../middlewares/user.js");
const test = require("./test.js");
const { DateTime } = require("luxon");

const userSignupSchema = z.object({
  username: z.string(),
  usn: z.string().length(10, "USN should be exactly 10 characters long"),
  password: z.string().min(6, "Enter password of minimum length 6"),
  batch: z.string().min(1, "Batch is required"),
  year: z.string().min(1, "Year is required"),
  branch: z.string().min(1, "Branch is required"),
});

const userSignInSchema = z.object({
  usn: z.string().min(10, "Username is required"),
  password: z.string().min(6, "Enter password of minimum length 6"),
});

router.use("/test", test);

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
    res.status(200).json({
      message: "User created successfully",
      token: token,
      name: username,
    });
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

    res.status(200).json({ token: token, name: user.username });
  } catch (err) {
    console.log("Error", err);
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({ message: "Internal server error", err });
  }
});

router.get("/tests", userMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentTime = DateTime.now().setZone("Asia/Kolkata");

    const tests = await Test.find({
      batch: user.batch.toLowerCase(),
      branch: user.branch.toLowerCase(),
      year: user.year,
    })
      .populate("courseId", "title")
      .sort({ scheduledOn: 1 });

    if (tests.length === 0) {
      const demoTest = await Test.findOne({ course: "demo" });

      if (demoTest) {
        demoTest.scheduledOn = DateTime.now().setZone("Asia/Kolkata").toISO();
      }
      await demoTest.save();
      return res.status(404).json({
        demoTest,
        message: "There are no scheduled tests, but you can attend a demo test",
      });
    }

    const upcomingTests = tests.filter((test) => {
      const scheduledStart = DateTime.fromISO(test.scheduledOn, {
        zone: "Asia/Kolkata",
      });
      return scheduledStart.plus({ hours: 2 }) > currentTime;
    });

    if (upcomingTests.length === 0) {
      const demoTest = await Test.findOne({ course: "demo" });
      if (demoTest) {
        demoTest.isCompleted = false;
        demoTest.scheduledOn = DateTime.now().setZone("Asia/Kolkata").toISO();
        upcomingTests.unshift(demoTest);
      }

      return res.status(404).json({
        message: "There are no upcoming tests, but you can attend a demo test",
        tests: upcomingTests,
      });
    }

    res.status(200).json({ tests: upcomingTests });
  } catch (err) {
    console.error("Error fetching tests for user batch:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/results", userMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const results = await Result.find({ studentId: userId })
      .populate("testId")
      .populate("questionId");

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No results found for this user" });
    }

    res.status(200).json({ results });
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/demo-results", userMiddleWare, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const demoResults = await DemoResult.find({ studentId: userId })
      .populate("testId")
      .populate("questionId");

    if (demoResults.length === 0) {
      return res
        .status(404)
        .json({ message: "No demo results found for this user" });
    }

    res.status(200).json({ demoResults });
  } catch (err) {
    console.error("Error fetching demo results:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
