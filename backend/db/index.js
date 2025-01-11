const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoUrl } = require("../config");

mongoose.connect(mongoUrl);

//User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

//Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@sit\.ac\.in$/,
      "Please enter a valid SIT email address.",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const QuestionSchema = new mongoose.Schema({
  description: { type: String, required: true },

  sampleTestCase: {
    input: { type: String, required: true },
    output: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
  },
  hiddenTestCases: [
    {
      input: String,
      output: String,
      isHidden: { type: Boolean, default: true },
    },
  ],
});

const vivaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
});

//CourseSchema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  vivaQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Viva",
    },
  ],
});

//Test Schema
const TestSchema = new mongoose.Schema({
  course: { type: String, required: true },
  batch: { type: String, required: true },
  branch: {
    type: String,
    required: true,
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  year: { type: Number, required: true },
  scheduledOn: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const resultSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  codingScore: { type: Number, required: true },
  vivaScore: { type: Number, required: true },
  isCheated: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Question = mongoose.model("Question", QuestionSchema);
const Test = mongoose.model("Test", TestSchema);
const Course = mongoose.model("Course", courseSchema);
const Viva = mongoose.model("Viva", vivaSchema);
const Result = mongoose.model("Result", resultSchema);
module.exports = { User, Admin, Question, Test, Course, Viva, Result };
