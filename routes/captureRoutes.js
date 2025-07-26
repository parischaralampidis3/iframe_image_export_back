const express = require('express');
const router = express.Router();
const { Capture } = require("../middleware/validateInput"); // ✅ Correct path

router.get("/status", (req, res) => {
  res.json({ status: 'ok' });
});

router.post("/capture", (req, res) => {
  const result = Capture.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Validation Error", errors: result.error.issues });
  }

  res.json({ message: "Success", data: result.data });
});

module.exports = router;