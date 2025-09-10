const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Ensure exports folder exists
const exportsDir = path.join(__dirname, "../exports");
if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

// Helper to launch browser
async function launchBrowser() {
    return puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
}

// Export PDF
async function exportPdf(url) {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Use real user-agent to avoid detection
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
    );

    try {
        console.log("Navigating to URL:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

        // Wait for report elements to render (adjust selector as needed)
        await page.waitForSelector(".visualContainer", { timeout: 60000 });

        const timestamp = Date.now();
        const pdfPath = path.join(exportsDir, `report-${timestamp}.pdf`);
        await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

        console.log("PDF exported:", pdfPath);
        return pdfPath;
    } catch (err) {
        console.error("PDF capture error:", err);
        throw err;
    } finally {
        await browser.close();
    }
}

// Export PNG
async function exportPng(url) {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
    );

    try {
        console.log("Navigating to URL:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

        await page.waitForSelector(".visualContainer", { timeout: 60000 });

        const timestamp = Date.now();
        const pngPath = path.join(exportsDir, `report-${timestamp}.png`);
        await page.screenshot({ path: pngPath, fullPage: true });

        console.log("PNG exported:", pngPath);
        return pngPath;
    } catch (err) {
        console.error("PNG capture error:", err);
        throw err;
    } finally {
        await browser.close();
    }
}

module.exports = { exportPdf, exportPng };
