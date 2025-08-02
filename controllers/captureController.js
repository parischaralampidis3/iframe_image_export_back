/**capture screenshot */

/**capture pdf */
//It connects route paths to controller functions, which handle the logic.s

const {exportPdf} = require("../utils/captureScreenShot");
const Capture = require("../middleware/validateInput");

async function capturePdfController(req,res){

    const result = Capture.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({message:"Validation Error",errors:result.error.issues});
}

   const url = result.data.url
try{
   const pdf = await exportPdf(url)
   return res.download(pdf)
}
catch(error){
    return res.status(500).json({error:"server error"});
}


}

async function capturePngController(req,res){
    
}
module.exports = {
    capturePdfController,
    capturePngController
}