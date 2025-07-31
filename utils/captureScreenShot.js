//require util
/*const {capturePdf} = require('node:util');

async function pdf (req,res) {
    return res.json({pdf:'pdf'});
}

const callBackFn = capturePdf(pdf);

callBackFn(err){
    err.log("error")
}*/
import puppeteer from "puppeteer";
const timestamp = Date.now();

async function  exportPdf(){
  const browser =  await puppeteer.launch();
  const page = await browser.newPage()
  await page.goto("http://localhost:3000");
//add logic 
  await page.waitForSelector('body')
    await page.pdf({
        path:`./downloads/report-${timestamp}.pdf`,
        format:"A4"
    }
    )

  await browser.close();
}

export{exportPdf};