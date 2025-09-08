const express = require("express");
const router = express.Router();
const {
  capturePdfController,
  capturePngController,
  parseIframeController,
  capturePdfFromQuery,
  capturePngFromQuery,
  capturePdfRealTime,
  capturePngRealTime
} = require("../controllers/captureController");
const { Capture } = require("../middleware/validateInput");

// GET endpoints for embedding
router.get("/getPdf", capturePdfFromQuery);
router.get("/getPng", capturePngFromQuery);

// Optional health check
router.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

// POST endpoints for manual export
router.post("/pdf", capturePdfController);
router.post("/png", capturePngController);
router.post("/parse", parseIframeController);

router.post("/pdfRealTime", capturePdfRealTime);
router.post("/pngRealTime", capturePngRealTime);

// For testing validation schema
router.post("/capture", (req, res) => {
  const result = Capture.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation Error", errors: result.error.issues });
  }
  res.json({ message: "Success", data: result.data });
});

module.exports = router;
