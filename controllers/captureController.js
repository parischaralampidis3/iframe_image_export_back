const { exportPdf, exportPng } = require("../utils/captureScreenShot");
const { extractIframeSrc } = require("../utils/parseIframe");
const { Capture } = require("../middleware/validateInput");

// POST body-based PDF export
async function capturePdfController(req, res) {
  const result = Capture.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation Error", errors: result.error.issues });
  }

  const url = result.data.url;

  try {
    const pdfPath = await exportPdf(url);
    return res.download(pdfPath);
  } catch (error) {
    console.error("PDF capture error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

// POST body-based PNG export
async function capturePngController(req, res) {
  const result = Capture.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Validation Error", errors: result.error.issues });
  }

  const url = result.data.url;

  try {
    const pngPath = await exportPng(url);
    return res.download(pngPath);
  } catch (error) {
    console.error("PNG capture error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}

// POST iframe HTML, returns extracted src
async function parseIframeController(req, res) {
  const { iframe } = req.body;

  if (!iframe || typeof iframe !== "string") {
    return res.status(400).json({ error: "Invalid input iframe" });
  }

  const src = extractIframeSrc(iframe);
  if (!src) {
    return res.status(400).json({ error: "Could not extract src." });
  }
  return res.json({ url: src });
}

// GET url query-based PDF export
async function capturePdfFromQuery(req, res) {
  const url = req.query.url;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid url parameter" });
  }

  try {
    const pdfPath = await exportPdf(url);
    return res.download(pdfPath);
  } catch (err) {
    console.error("PDF capture error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}



// GET url query-based PNG export
async function capturePngFromQuery(req, res) {
  const url = req.query.url;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid url parameter" });
  }

  try {
    const pngPath = await exportPng(url);
    return res.download(pngPath);
  } catch (err) {
    console.error("PNG capture error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  capturePdfController,
  capturePngController,
  capturePdfFromQuery,
  capturePngFromQuery,
  parseIframeController
};
