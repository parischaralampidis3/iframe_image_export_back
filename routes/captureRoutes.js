const express = require("express");
const router = express.Router();
const {
  capturePdfController,
  capturePngController,
  parseIframeController,
  capturePdfFromQuery,
  capturePngFromQuery
} = require("../controllers/captureController");

// GET endpoints for PDF/PNG from query
router.get("/getPdf", capturePdfFromQuery);
router.get("/getPng", capturePngFromQuery);

// POST endpoints for PDF/PNG from request body
router.post("/pdf", capturePdfController);
router.post("/png", capturePngController);

// POST endpoint to parse iframe HTML
router.post("/parse", parseIframeController);

module.exports = router;