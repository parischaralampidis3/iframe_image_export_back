const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const downloadsDir = path.resolve(__dirname, "../downloads");

// Ensure downloads folder exists
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}

async function exportPdf(url) {
  const timestamp = Date.now();
  const filePath = path.join(downloadsDir, `report-${timestamp}.pdf`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('body');

  await page.pdf({
    path: filePath,
    format: "A4",
  });

  await browser.close();
  return filePath; // return path for res.download()
}

async function exportPng(url) {
  const timestamp = Date.now();
  const filePath = path.join(downloadsDir, `report-${timestamp}.png`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('body');

  await page.screenshot({
    path: filePath,
    fullPage: true,
  });

  await browser.close();
  return filePath; // return path for res.download()
}

module.exports = { exportPdf, exportPng };
