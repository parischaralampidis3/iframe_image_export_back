const { exportPdf, exportPng } = require("../utils/captureScreenShot");
const { Capture } = require("../middleware/validateInput");

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

module.exports = {
  capturePdfController,
  capturePngController,
};
