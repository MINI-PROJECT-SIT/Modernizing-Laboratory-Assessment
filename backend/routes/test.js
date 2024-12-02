const express = require("express");
const router = express.Router();
const { executeCode } = require("../execution/execute");
const testMiddleWare = require("../middlewares/test");
const userMiddleWare = require("../middlewares/user");
const { Test, Course, Question, Result } = require("../db");
const z = require("zod");

const runSchema = z.object({
  questionId: z.string(),
  language: z.string(),
  version: z.string(),
  code: z.string(),
  testcase: z.object({
    input: z.string(),
  }),
});

const submitSchema = z.object({
  questionId: z.string(),
  language: z.string(),
  version: z.string(),
  code: z.string(),
});

router.get(
  "/:testId/question",
  userMiddleWare,
  testMiddleWare,
  async (req, res) => {
    try {
      const { testId } = req.params;

      const test = await Test.findById(testId).populate("courseId");
      if (!test) {
        return res.status(404).json({ error: "Test not found." });
      }

      const course = await Course.findById(test.courseId).populate("questions");
      if (!course || !course.questions.length) {
        return res.status(404).json({
          error: "No questions available for the course linked to this test.",
        });
      }

      const randomQuestionId =
        course.questions[Math.floor(Math.random() * course.questions.length)];

      const question = await Question.findById(randomQuestionId);

      if (!question) {
        return res.status(404).json({ error: "Question not found." });
      }

      res.status(200).json({
        description: question.description,
        sampleTestCase: question.sampleTestCase,
      });
    } catch (error) {
      console.error("Error fetching question:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/:testId/run",
  userMiddleWare,
  testMiddleWare,
  async (req, res) => {
    try {
      const { questionId, language, version, code, testcase } = runSchema.parse(
        req.body
      );

      const test = req.test;
      const question = await Question.findById(questionId);

      if (!question || !test.courseId.equals(question.course)) {
        return res.status(404).json({
          error: "Question not found or does not belong to this test.",
        });
      }

      const result = await executeCode(language, version, code, testcase.input);

      res.json({
        output: result.run.stdout || "",
        error: result.run.stderr || "",
        testCase: testcase,
      });
    } catch (error) {
      console.error("Error in /test/:testId/run endpoint:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/:testId/submit",
  userMiddleWare,
  testMiddleWare,
  async (req, res) => {
    try {
      const { questionId, language, version, code } = submitSchema.parse(
        req.body
      );

      const test = req.test;
      const question = await Question.findById(questionId);

      if (!question || !test.courseId.equals(question.course)) {
        return res.status(404).json({
          error: "Question not found or does not belong to this test.",
        });
      }

      const hiddenTestCases = question.hiddenTestCases;
      if (!hiddenTestCases || hiddenTestCases.length === 0) {
        return res
          .status(404)
          .json({ error: "No hidden test cases available for this question." });
      }

      const results = [];
      for (const testCase of hiddenTestCases) {
        const result = await executeCode(
          language,
          version,
          code,
          testCase.input
        );
        const output = result.run.stdout.trim();
        results.push({
          input: testCase.input,
          expected: testCase.output.trim(),
          output,
          Accepted: output === testCase.output.trim(),
        });
      }

      const allPassed = results.every((testResult) => testResult.Accepted);
      const partialPassed = results.filter(
        (testResult) => testResult.Accepted
      ).length;

      let codingScore = 0;
      if (allPassed) {
        codingScore = 10;
      } else if (partialPassed > 0) {
        codingScore = 5;
      } else {
        codingScore = 0;
      }

      const studentId = req.userId;
      const result = new Result({
        testId: test._id,
        studentId,
        codingScore,
        vivaScore: 0,
      });
      await result.save();

      res.status(200).json({
        results,
        allPassed,
        codingScore,
        vivaScore,
        message: allPassed ? "Accepted" : "Failed for hidden testcase",
      });
    } catch (error) {
      console.error("Error in submission", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/:testId/viva-questions",
  userMiddleWare,
  testMiddleWare,
  async (req, res) => {
    try {
      const { testId } = req.params;

      const test = await Test.findById(testId).populate("courseId");

      if (!test || !test.courseId) {
        return res
          .status(404)
          .json({ error: "Test or associated course not found." });
      }

      const courseId = test.courseId;

      const course = await Course.findById(courseId).populate("vivaQuestions");

      if (
        !course ||
        !course.vivaQuestions ||
        course.vivaQuestions.length === 0
      ) {
        return res
          .status(404)
          .json({ error: "No viva questions found in the course." });
      }

      const randomQuestions = [];
      const vivaQuestions = course.vivaQuestions;

      while (randomQuestions.length < 5 && vivaQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * vivaQuestions.length);
        const selectedQuestion = vivaQuestions.splice(randomIndex, 1)[0];

        randomQuestions.push(selectedQuestion);
      }

      if (randomQuestions.length === 0) {
        return res
          .status(404)
          .json({ error: "Not enough viva questions in the course." });
      }

      res.status(200).json({
        message: "Random viva questions fetched successfully.",
        questions: randomQuestions,
      });
    } catch (error) {
      console.error("Error fetching viva questions:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/:questionId", testMiddleWare, userMiddleWare, async (req, res) => {
  try {
    const { questionId } = req.params;

    const vivaQuestion = await Viva.findById(questionId);

    if (!vivaQuestion) {
      return res.status(404).json({ error: "Viva question not found." });
    }

    const optionsWithoutCorrect = vivaQuestion.options.map((option) => {
      const { isCorrect, ...optionWithoutCorrect } = option.toObject();
      return optionWithoutCorrect;
    });

    res.status(200).json({
      message: "Viva question fetched successfully.",
      question: vivaQuestion.question,
      options: optionsWithoutCorrect,
    });
  } catch (error) {
    console.error("Error fetching viva question:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/:testId/viva-submit",
  userMiddleWare,
  testMiddleWare,
  async (req, res) => {
    try {
      const { testId } = req.params;
      const { questionId, answer } = req.body;

      if (!questionId || !answer) {
        return res
          .status(400)
          .json({ error: "Question ID and answer are required." });
      }

      const test = await Test.findById(testId).populate("courseId");
      if (!test || !test.courseId) {
        return res
          .status(404)
          .json({ error: "Test or associated course not found." });
      }

      const vivaQuestion = await Viva.findById(questionId);
      if (!vivaQuestion) {
        return res.status(404).json({ error: "Viva question not found." });
      }

      const correctOption = vivaQuestion.options.find(
        (option) => option.isCorrect
      );
      if (!correctOption) {
        return res
          .status(404)
          .json({ error: "No correct answer found for this question." });
      }

      const isCorrect = answer === correctOption.text;

      const studentId = req.userId;
      let result = await Result.findOne({ testId, studentId });

      if (!result) {
        result = new Result({
          testId,
          studentId,
          vivaScore: 0,
        });
      }

      if (isCorrect) {
        result.vivaScore += 1;
      }

      await result.save();

      res.status(200).json({
        message: isCorrect
          ? "Correct answer, viva score updated."
          : "Incorrect answer.",
        isCorrect,
        vivaScore: result.vivaScore,
      });
    } catch (error) {
      console.error("Error submitting viva answer:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
