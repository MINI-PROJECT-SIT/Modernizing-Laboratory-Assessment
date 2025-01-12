const { Test } = require("../db/index.js");
const { DateTime } = require("luxon");

const testMiddleWare = async (req, res, next) => {
  try {
    const testId = req.params.testId || req.body.testId;

    if (!testId) {
      return res.status(400).json({ error: "Test ID is required" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    if (!test.scheduledOn) {
      return res
        .status(500)
        .json({ error: "Invalid scheduledOn format in database" });
    }

    const scheduledStart = DateTime.fromISO(test.scheduledOn, {
      zone: "Asia/Kolkata",
    });

    if (!scheduledStart.isValid) {
      return res
        .status(500)
        .json({ error: "Invalid scheduledOn format in database" });
    }

    req.scheduledStart = scheduledStart;

    const scheduledEnd = scheduledStart.plus({ hours: 2 });
    const now = DateTime.now().setZone("Asia/Kolkata");

    if (now < scheduledStart) {
      return res.status(200).json({
        message: "Test is scheduled in the future.",
        scheduledStart: scheduledStart.toISO(),
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
