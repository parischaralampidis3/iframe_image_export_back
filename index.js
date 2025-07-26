const express = require("express")
const routes = require('./routes/captureRoutes')
const app = express()
const port = 3000

app.use(express.json());
app.use('/api',routes);

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})