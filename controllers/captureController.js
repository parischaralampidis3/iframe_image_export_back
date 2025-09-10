const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Ensure exports folder exists
const exportsDir = path.join(__dirname, "../exports");
if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir, { recursive: true });
}

// Helper function to launch browser
async function launchBrowser() {
    return puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
}

// Export PDF from public Power BI report URL
async function exportPdf(url) {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Set a real user-agent to avoid detection
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    try {
        console.log("Navigating to URL:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

        // Wait for charts and iframes to render
        await page.waitForTimeout(10000);

        const pdfPath = path.join(exportsDir, "report.pdf");
        await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

        console.log("PDF exported successfully:", pdfPath);
        return pdfPath;
    } catch (err) {
        console.error("PDF capture error:", err);
        throw err;
    } finally {
        await browser.close();
    }
}

// Export PNG from public Power BI report URL
async function exportPng(url) {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    // Set user-agent
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    try {
        console.log("Navigating to URL:", url);
        await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

        // Wait for charts and iframes to render
        await page.waitForTimeout(10000);

        const pngPath = path.join(exportsDir, "report.png");
        await page.screenshot({ path: pngPath, fullPage: true });

        console.log("PNG exported successfully:", pngPath);
        return pngPath;
    } catch (err) {
        console.error("PNG capture error:", err);
        throw err;
    } finally {
        await browser.close();
    }
}

module.exports = { exportPdf, exportPng };
