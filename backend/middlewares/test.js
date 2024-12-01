const { Test } = require("../db/index.js");

const testMiddleWare = async (req, res, next) => {
  try {
    const { testId } = req.body;

    if (!testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    const now = new Date();
    const scheduledStart = new Date(test.scheduledOn);
    const scheduledEnd = new Date(
      scheduledStart.getTime() + 2 * 60 * 60 * 1000
    );

    if (now < scheduledStart) {
      return res.status(200).json({
        message: "Test is scheduled in the future.",
        scheduledStart,
      });
    }

    if (now > scheduledEnd) {
      return res.status(403).json({
        error:
          "This test can only be run or submitted during its scheduled time.",
      });
    }

    req.test = test;
    next();
  } catch (error) {
    console.error("Error in test middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = testMiddleWare;
