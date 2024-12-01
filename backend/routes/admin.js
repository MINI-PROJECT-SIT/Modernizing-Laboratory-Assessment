const express = require("express");
const router = express.Router();
const { Admin, Question, Test, Course, Viva } = require("../db/index.js");
const z = require("zod");
const bcrypt = require("bcrypt");
const { JWT_SECRET, saltRounds } = require("../config");
const jwt = require("jsonwebtoken");
const adminMiddleWare = require("../middlewares/admin.js");

const adminSignUpSchema = z.object({
  username: z.string(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  department: z.string(),
});

const adminSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

//Sign Up route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, department } = adminSignUpSchema.parse(
      req.body
    );
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin account already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      department: department.toLowerCase(),
    });
    await newAdmin.save();
    const userId = newAdmin._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res
      .status(200)
      .json({ message: "Admin account created successfully", token: token });
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
    const { email, password } = adminSignInSchema.parse(req.body);
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Incorrect username" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const userId = admin._id;
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

router.post("/question", adminMiddleWare, async (req, res) => {
  try {
    const { coursetitle, description, sampleTestCase, hiddenTestCases } =
      req.body;
    if (
      !description ||
      !sampleTestCase ||
      !sampleTestCase.input ||
      !sampleTestCase.output ||
      !coursetitle
    ) {
      return res.status(400).json({
        message:
          "Coursetitle, Description and sample test case with output are required",
      });
    }

    const newQuestion = new Question({
      description,
      sampleTestCase: {
        input: sampleTestCase.input,
        output: sampleTestCase.output,
        isHidden: sampleTestCase.isHidden || false,
      },
      hiddenTestCases: hiddenTestCases || [],
    });

    const savedQuestion = await newQuestion.save();

    let course = await Course.findOne({ title: coursetitle.toLowerCase() });

    if (!course) {
      course = new Course({
        title: coursetitle.toLowerCase(),
        questions: [savedQuestion._id],
      });
      await course.save(); // Save the new course
      return res.status(200).json({
        message: "Course created and question added successfully",
      });
    }

    course.questions.push(savedQuestion._id);

    await course.save();

    res.status(200).json({
      message: "Question added successfully to the course",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/vivaquestion", adminMiddleWare, async (req, res) => {
  try {
    const { coursetitle, question, options } = req.body;

    if (!question || !options || !coursetitle) {
      return res.status(400).json({
        message: "Coursetitle, Question, and Options are required",
      });
    }

    const correctOption = options.find((option) => option.isCorrect === true);
    if (!correctOption) {
      return res.status(400).json({
        message: "At least one option must be marked as correct.",
      });
    }

    const newVivaQuestion = new Viva({
      question,
      options: options.map((option) => ({
        text: option.text,
        isCorrect: option.isCorrect || false,
      })),
    });

    const savedVivaQuestion = await newVivaQuestion.save();

    let course = await Course.findOne({ title: coursetitle.toLowerCase() });

    if (!course) {
      course = new Course({
        title: coursetitle.toLowerCase(),
        vivaQuestions: [savedVivaQuestion._id],
      });
      await course.save(); // Save the new course
      return res.status(200).json({
        message: "Course created and viva question added successfully",
      });
    }

    course.vivaQuestions.push(savedVivaQuestion._id);

    await course.save();

    res.status(200).json({
      message: "Viva question added successfully to the course",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses", adminMiddleWare, async (req, res) => {
  try {
    const courses = await Course.find().select("title");

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/scheduletest", adminMiddleWare, async (req, res) => {
  try {
    const { courseId, batch, branch, year, scheduledOn } = req.body;

    if (!courseId || !batch || !branch || !year) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const foundCourse = await Course.findOne({ _id: courseId });

    if (!foundCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!foundCourse.questions || foundCourse.questions.length === 0) {
      return res.status(400).json({
        message: "Course must have questions before scheduling a test.",
      });
    }

    if (!foundCourse.vivaQuestions || foundCourse.vivaQuestions.length === 0) {
      return res.status(400).json({
        message: "Course must have viva questions before scheduling a test.",
      });
    }

    const newTest = new Test({
      course: foundCourse.title,
      batch,
      branch,
      courseId,
      year,
      scheduledOn: scheduledOn ? new Date(scheduledOn) : null,
      createdBy: req.userId,
    });

    await newTest.save();

    res.status(200).json({
      message: "Test created and scheduled successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
