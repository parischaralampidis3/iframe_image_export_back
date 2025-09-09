const puppeteer = require("puppeteer");
const path = require("path");

async function exportPdf(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  // Go to Power BI report
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Ensure iframe content is rendered
  await page.waitForTimeout(5000);

  const pdfPath = path.join(__dirname, "../exports/report.pdf");
  await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

  await browser.close();
  return pdfPath;
}

async function exportPng(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  // Go to Power BI report
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Give time for charts to render
  await page.waitForTimeout(5000);

  const pngPath = path.join(__dirname, "../exports/report.png");
  await page.screenshot({ path: pngPath, fullPage: true });

  await browser.close();
  return pngPath;
}

module.exports = { exportPdf, exportPng };