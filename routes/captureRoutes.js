const express = require("express");
const router = express.Router();
const { Capture } = require("../middleware/validateInput");
const { capturePdfController, capturePngController } = require("../controllers/captureController");

router.post("/pdf", capturePdfController);
router.post("/png", capturePngController);

router.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

// Optional route just to test validation
router.post("/capture", (req, res) => {
  const result = Capture.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation Error", errors: result.error.issues });
  }
  res.json({ message: "Success", data: result.data });
});

module.exports = router;
